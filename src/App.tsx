import React, { useEffect, useRef, useState } from "react";
import { InfiniteCardScroll } from "./components/InfiniteCardScroll/InfiniteCardScroll";
import { mockCards } from "./data/mockCards";
import { UltravoxSession } from "ultravox-client";
import axios from "axios";
import { CardGrid } from "./components/InfiniteCardScroll/CardGrid";
import { NavigationProvider } from "./contexts/NavigationContext";
import { Navbar } from "./components/Navbar";
import type { CardInterface } from "./types";

declare global {
  interface Window {
    LivekitClient?: any;
  }
}

const RAVAN_API_KEY =
  "ak_6ea7ada5d09c5a6d75cd73f1ca7ed0b2a74f592a3ca4a2faa441f80fa8b16c29";
const LIVEKIT_CLIENT_SRC =
  "https://cdn.jsdelivr.net/npm/livekit-client/dist/livekit-client.umd.min.js";

const loadLiveKitClient = async () => {
  if (window.LivekitClient) return window.LivekitClient;

  await new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${LIVEKIT_CLIENT_SRC}"]`,
    );

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener("error", () => reject(), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = LIVEKIT_CLIENT_SRC;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Unable to load LiveKit client"));
    document.head.appendChild(script);
  });

  return window.LivekitClient;
};

function App() {
  const [isListening, setIsListening] = useState(false);
  const [callId, setCallId] = useState<string | null>(null);
  const [sessionStatus, setSessionStatus] = useState<string | null>(null);
  console.log("sessionStatus", sessionStatus);
  const [callSessionId, setCallSessionId] = useState<string | null>(null);
  const [stopScrolls, setStopScrolls] = useState(false);
  const [resumeScrolls, setResumeScrolls] = useState(false);
  const [showRealEstateAgentVoice, setShowRealEstateAgentVoice] =
    useState(false);
  const sessionref = useRef<UltravoxSession | null>();
  const ravanRoomRef = useRef<any>(null);

  if (!sessionref.current) {
    sessionref.current = new UltravoxSession();
  }

  sessionref.current?.addEventListener("status", (event) => {
    console.log("Session status changed: ", event);
    setSessionStatus(sessionref.current?.status ?? null);
  });

  const handleStart = async (
    agent_code: string,
    schema_name?: string,
    voice_provider: CardInterface["voice_provider"] = "snowie",
  ) => {
    if (sessionStatus !== "disconnected") {
      handleEnd();
    }

    try {
      if (voice_provider === "ravan") {
        const LivekitClient = await loadLiveKitClient();

        const response = await fetch(
          "https://api.ravan.ai/api/v1/calling/create-call",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Api-Key": RAVAN_API_KEY,
            },
            body: JSON.stringify({
              type: "web_call",
              agent_id: agent_code,
              metadata: {},
              prompt_dynamic_variables: {},
            }),
          },
        );

        const result = await response.json();
        const token = result.data.access_token;
        const wsUrl = result.data.url;

        const room = new LivekitClient.Room();
        ravanRoomRef.current = room;

        room.on(LivekitClient.RoomEvent.TrackSubscribed, (track: any) => {
          if (track.kind === "audio") {
            const audio = track.attach();
            audio.autoplay = true;
            audio.dataset.ravanAudio = "true";
            document.body.appendChild(audio);
          }
        });

        await room.connect(wsUrl, token);
        await room.localParticipant.setMicrophoneEnabled(true);

        setStopScrolls(true);
        setShowRealEstateAgentVoice(true);
        return;
      }

      if (!isListening) {
        const response = await axios.post(
          `https://app.snowie.ai/api/start-thunder/`,
          {
            agent_code: agent_code,
            schema_name: schema_name || "09483b13-47ac-47b2-95cf-4ca89b3debfa",
          },
        );
        setStopScrolls(true);
        setShowRealEstateAgentVoice(true);
        const wssUrl = response.data.joinUrl;
        setCallId(response.data.callId);
        setCallSessionId(response.data.call_session_id);
        // console.log("Mic button clicked!", wssUrl);

        if (wssUrl) {
          console.log("wssUrl", wssUrl);
          sessionref.current?.joinCall(`${wssUrl}`);
        } else {
          // console.error("WebSocket URL is not set");
        }
        // toggleVoice(true);
      } else {
        await sessionref.current?.leaveCall();
        setShowRealEstateAgentVoice(false);
        const response = await axios.post(
          `https://app.snowie.ai/api/end-call-session-thunder/`,
          {
            call_session_id: callSessionId,
            call_id: callId,
            schema_name: schema_name || "09483b13-47ac-47b2-95cf-4ca89b3debfa",
          },
        );
      }
    } catch (error) {
      // console.error("Error in handleMicClick:", error);
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
    ravanRoomRef.current?.disconnect();
    ravanRoomRef.current = null;
    document
      .querySelectorAll<HTMLAudioElement>('audio[data-ravan-audio="true"]')
      .forEach((audio) => audio.remove());
    setStopScrolls(false);
    setShowRealEstateAgentVoice(false);
    // resumeScroll();
  };

  return (
    <NavigationProvider>
      <div className="bg-background">
        {/* <Navbar /> */}
        <main className="">
          <div className="max-w-10xl mx-auto">
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
