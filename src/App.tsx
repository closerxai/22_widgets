import React, { useEffect, useRef, useState } from "react";
import { InfiniteCardScroll } from "./components/InfiniteCardScroll/InfiniteCardScroll";
import { mockCards } from "./data/mockCards";
import { UltravoxSession } from "ultravox-client";
import axios from "axios";
import { CardGrid } from "./components/InfiniteCardScroll/CardGrid";
import { NavigationProvider } from "./contexts/NavigationContext";
import { Navbar } from "./components/Navbar";
import type { CardInterface } from "./types"; // Ensure this import exists

function App() {
  const [isListening, setIsListening] = useState(false);
  const [callId, setCallId] = useState<string | null>(null);
  const [sessionStatus, setSessionStatus] = useState<string | null>(null);
  console.log("sessionStatus", sessionStatus);
  const [callSessionId, setCallSessionId] = useState<string | null>(null);
  const [stopScrolls, setStopScrolls] = useState(false);
  const [resumeScrolls, setResumeScrolls] = useState(false);
  const [showRealEstateAgentVoice, setShowRealEstateAgentVoice] = useState(false);

  const sessionref = useRef<UltravoxSession | null>();

  if (!sessionref.current) {
    sessionref.current = new UltravoxSession();
  }

  sessionref.current?.addEventListener("status", (event) => {
    console.log("Session status changed: ", event);
    setSessionStatus(sessionref.current?.status ?? null);
  });

  const handleStart = async (card: CardInterface) => {
    // Prevent double-clicking while a request is pending
    if (!isListening && sessionStatus !== "disconnected") {
      handleEnd();
    }

    // Check if we are already connecting or connected
    if (sessionStatus === "connecting" || sessionStatus === "connected") {
      console.warn("Already connecting or connected. Please wait.");
      return; 
    }

    try {
      if (!isListening) {
        let response: any;
        let wsUrl: string | undefined;
        let token: string | undefined;
        let callId: string | undefined;

        // Route by provider
        if (card.provider === 'ravan') {
          // --- RAVAN API CALL ---
          
          // Optional: Add a small delay to avoid immediate burst if clicked rapidly
          await new Promise(r => setTimeout(r, 500)); 

          response = await axios.post(
            'https://api.ravan.ai/api/v1/calling/create-call',
            {
              type: "web_call",
              agent_id: card.agent_id,
              from_phone_number: card.from_phone_number || "",
              to_phone_number: card.to_phone_number || "",
              metadata: card.metadata || {},
              prompt_dynamic_variables: card.prompt_dynamic_variables || {}
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': 'ak_6ea7ada5d09c5a6d75cd73f1ca7ed0b2a74f592a3ca4a2faa441f80fa8b16c29'
              }
            }
          );

          // Extract Ravan response fields (Adjust based on actual API response structure)
          wsUrl = response.data?.data?.url || response.data?.url;
          token = response.data?.data?.access_token || response.data?.access_token; // Ravan usually returns access_token
          callId = response.data?.data?.call_id || response.data?.call_id;

        } else {
          // --- SNOWIE API (Default Fallback) ---
          response = await axios.post(
            `https://app.snowie.ai/api/start-thunder/`,
            {
              agent_code: card.agent_code,
              schema_name: card.schema_name || "09483b13-47ac-47b2-95cf-4ca89b3debfa",
            },
          );
        
  // ✅ FIX: Extract from correct response structure
  if (response.data?.success && response.data?.response) {
    wsUrl = response.data.response.url; // Not joinUrl
    token = response.data.response.token; // Not direct token
    callId = response.data.response.call_id || response.data.response.id;
    
    console.log("Snowie Response Structure:", JSON.stringify(response.data, null, 2));
  } else {
    // Fallback: try older structure
    wsUrl = response.data?.joinUrl || response.data?.url;
    token = response.data?.token || response.data?.access_token;
    callId = response.data?.callId || response.data?.call_id;
    
    console.warn("Using fallback response structure");
  }
        }

        // Handle Success State Updates
        setStopScrolls(true);
        setShowRealEstateAgentVoice(true);
        setCallId(callId || null);

        if (wsUrl && token) {
          console.log("Connecting to:", wsUrl);
          
          // Ensure LiveKit client is loaded via UMD script in index.html
          if (typeof window !== 'undefined' && (window as any).LivekitClient) {
            const LivekitClient = (window as any).LivekitClient;
            const room = new LivekitClient.Room({
              adaptiveStream: true,
              dynacast: true,
            });

            // Handle remote tracks (agent video/audio)
            room.on(LivekitClient.RoomEvent.TrackSubscribed, (track, publication, participant) => {
              console.log('Track subscribed:', track.kind, track.source);
              
              if (track.kind === 'video') {
                // Attach video to an element if you have one, otherwise ignore for voice-only
                // track.attach(videoElement); 
                // If you don't have a video element, you can skip this or log it
              }
              
              if (track.kind === 'audio') {
                const audioEl = track.attach();
                // Explicitly un-mute and play
                audioEl.muted = false;
                audioEl.autoplay = true;
                audioEl.play().catch(e => console.warn("Audio play failed:", e));
                
                // Append to body so it renders
                document.body.appendChild(audioEl);
                
                // Initialize visualizer if you have one
                // initAudioVisualizer(track); 
              }
            });

            room.on(LivekitClient.RoomEvent.TrackUnsubscribed, (track) => {
              track.detach().forEach((el: HTMLElement) => el.remove());
            });

            room.on(LivekitClient.RoomEvent.Disconnected, () => {
              console.log("Disconnected from room");
              // Cleanup happens in handleEnd, but good to log
            });

            // Connect to room
            await room.connect(wsUrl, token);
            
            // Enable microphone (User gesture required)
            try {
              await room.localParticipant.setMicrophoneEnabled(true);
              console.log("Microphone enabled");
            } catch (micErr) {
              console.warn("Microphone access denied:", micErr);
            }
            
            // Store room reference for cleanup
            (sessionref.current as any).room = room;
            
            console.log("Connected successfully!");
          } else {
            console.error("LivekitClient not found. Ensure the script is loaded in index.html");
          }
        } else {
          console.error("WebSocket URL or Token not found in response");
        }

      } else {
        // End Call Logic
        await sessionref.current?.leaveCall();
        setShowRealEstateAgentVoice(false);
        
        // Optional: Call Ravan end-call endpoint if needed
        if (card.provider === 'ravan' && callId) {
          await axios.post(
            `https://api.ravan.ai/api/v1/calling/end-call`,
            { call_id: callId },
            { headers: { 'X-Api-Key': 'ak_6ea7ada5d09c5a6d75cd73f1ca7ed0b2a74f592a3ca4a2faa441f80fa8b16c29' } }
          );
        }
      }
    } catch (error: any) {
      if (error.response?.status === 429) {
        console.error("❌ Rate Limit Hit! Please wait 60 seconds before trying again.");
        alert("Too many requests. Please wait a moment and try again.");
      } else {
        console.error("Error in handleStart:", error);
      }
    }
  };

  useEffect(() => {
    if (sessionStatus === "disconnected") {
      handleEnd();
      setShowRealEstateAgentVoice(false);
    }
  }, [sessionStatus]);

  const handleEnd = async () => {
    await sessionref.current?.leaveCall();
    setStopScrolls(false);
    setShowRealEstateAgentVoice(false);
    // Clean up audio elements
    document.querySelectorAll('body > audio').forEach(el => el.remove());
  };

  return (
    <NavigationProvider>
      <div className="bg-background">
        {/* <Navbar /> */}
        <main className="">
          <div className="mx-auto max-w-10xl">
            <CardGrid
              cards={mockCards}
              handleStart={handleStart}
              handleEnd={handleEnd}
              showRealEstateAgentVoice={showRealEstateAgentVoice}
              sessionStatus={sessionStatus}
            />
          </div>
        </main>
      </div>
    </NavigationProvider>
  );
}

export default App;