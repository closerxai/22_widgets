// CardGrid.tsx
import React, { memo, useState } from "react";
import { Card } from "./Card";
import { AgentDetail } from "./AgentDetail";
import type { CardInterface } from "../../types";
import RealEstateAgentVoice from "./RealEstateAgentVoice";
import "./CardGrid.css";

interface CardGridProps {
  cards: CardInterface[];
  className?: string;
  handleStart: (agent_code: string) => void;
  handleEnd: () => void;
  showRealEstateAgentVoice?: boolean;
  sessionStatus?: string | undefined | null;
}

export const CardGrid: React.FC<CardGridProps> = memo(
  ({
    cards,
    className = "",
    handleStart,
    handleEnd,
    showRealEstateAgentVoice,
    sessionStatus,
  }) => {
    const [selectedAgent, setSelectedAgent] = useState<CardInterface | null>(null);
    const [agentName, setAgentName] = useState<string | null>(null);

    const openAgentDetail = (agent: CardInterface) => {
      setSelectedAgent(agent);
      setAgentName(agent.title);
      // Optional: scroll to top when opening detail
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const closeAgentDetail = () => {
      setSelectedAgent(null);
      setAgentName(null);
    };

    // Show detail view if an agent is selected
    if (selectedAgent) {
      return (
        <div className="agent-detail-wrapper">
          <AgentDetail
            agent={selectedAgent}
            onBack={closeAgentDetail}
            handleStart={handleStart}
            handleEnd={handleEnd}
            getAgentName={setAgentName}
          />
          {showRealEstateAgentVoice && (
            <RealEstateAgentVoice
              onClose={handleEnd}
              sessionStatus={sessionStatus}
              agentName={agentName ?? undefined}
            />
          )}
        </div>
      );
    }

    // Grid view (default)
    return (
      <div className={`card-grid-wrapper relative ${className}`}>
        {showRealEstateAgentVoice && (
          <RealEstateAgentVoice
            onClose={handleEnd}
            sessionStatus={sessionStatus}
            agentName={agentName ?? undefined}
          />
        )}

        <div className="card-grid">
          {cards.map((card) => (
            <div
              key={card.id}
              className="card-grid-item"
              role="button"
              tabIndex={0}
              onClick={() => openAgentDetail(card)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openAgentDetail(card);
                }
              }}
            >
              <Card
                card={card}
                isActive={false}
                handleStart={handleStart}
                handleEnd={handleEnd}
                getAgentName={setAgentName}
                onAgentSelect={() => {}} // not used here
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
);

CardGrid.displayName = "CardGrid";