// CardGrid.tsx
import React, { memo, useRef, useState, useMemo, useEffect } from "react";
import { Card } from "./Card";
import { AgentDetail } from "./AgentDetail";
import type { CardInterface } from "../../types";
import RealEstateAgentVoice from "./RealEstateAgentVoice";
import { categoryConfig, categoryOrder } from "./CardGrid.constants";
import { HeroSection } from "./HeroSection";
import { CategoryNav } from "./CategoryNav";
import { CategorySection } from "./CategorySection";
import "./CardGrid.css";

interface CardGridProps {
  cards: CardInterface[];
  className?: string;
  handleStart: (agent_code: string) => void;
  handleEnd: () => void;
  showRealEstateAgentVoice?: boolean;
  sessionStatus?: string | undefined | null;
}

/**
 * Main component for rendering the agent grid with a tabbed interface.
 */
export const CardGrid: React.FC<CardGridProps> = memo(
  ({
    cards,
    className = "",
    handleStart,
    handleEnd,
    showRealEstateAgentVoice,
    sessionStatus,
  }) => {
    // State & Refs
    const [selectedAgent, setSelectedAgent] = useState<CardInterface | null>(
      null,
    );
    const [agentName, setAgentName] = useState<string | null>(null);
    const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    // Group cards by category
    const groupedCards = useMemo(() => {
      return categoryOrder.reduce(
        (acc, category) => {
          const categoryCards = cards.filter(
            (card) => card.category === category,
          );
          if (categoryCards.length > 0) acc[category] = categoryCards;
          return acc;
        },
        {} as Record<string, CardInterface[]>,
      );
    }, [cards]);

    // Determine available categories
    const availableCategories = useMemo(
      () => categoryOrder.filter((cat) => groupedCards[cat]?.length > 0),
      [groupedCards],
    );

    // Active Category State
    const [activeCategory, setActiveCategory] = useState<string | null>(
      availableCategories[0] || null,
    );

    // Ensure activeCategory stays valid if cards change
    useEffect(() => {
      if (
        availableCategories.length > 0 &&
        (!activeCategory || !availableCategories.includes(activeCategory))
      ) {
        setActiveCategory(availableCategories[0]);
      }
    }, [availableCategories, activeCategory]);

    // Helper Functions
    const openAgentDetail = (agent: CardInterface) => {
      setSelectedAgent(agent);
      setAgentName(agent.title);
    };

    const closeAgentDetail = () => {
      setSelectedAgent(null);
      setAgentName(null);
    };

    const hasCategories =
      cards?.length > 0 && cards.some((card) => card.category);

    const renderCard = (card: CardInterface, categoryColor: string) => (
      <div
        key={card.id}
        ref={(el) => (cardRefs.current[card.id] = el)}
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
        style={{ "--card-accent": categoryColor } as React.CSSProperties}
      >
        <Card
          card={card}
          isActive={false}
          handleStart={handleStart}
          handleEnd={handleEnd}
          getAgentName={setAgentName}
          onAgentSelect={() => { }}
        />
      </div>
    );

    // Detail View Rendering
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
              anchorElement={null}
            />
          )}
        </div>
      );
    }

    // Main Grid Rendering
    const activeColor = activeCategory
      ? categoryConfig[activeCategory]?.color
      : "#f8fafc";

    return (
      <div
        className={`card-grid-wrapper ${className}`}
        style={{ "--active-accent": activeColor } as React.CSSProperties}
      >
        <HeroSection totalAgents={cards.length} />

        {showRealEstateAgentVoice && !selectedAgent && (
          <RealEstateAgentVoice
            onClose={handleEnd}
            sessionStatus={sessionStatus}
            agentName={agentName ?? undefined}
            anchorElement={
              agentName
                ? cardRefs.current[
                cards.find((c) => c.title === agentName)?.id || ""
                ] || null
                : null
            }
          />
        )}

        {hasCategories ? (
          <div className="categories-container">
            {availableCategories.length > 1 && (
              <CategoryNav
                groupedCards={groupedCards}
                activeCategory={activeCategory}
                onCategoryClick={setActiveCategory}
              />
            )}

            {activeCategory && groupedCards[activeCategory] && (
              <CategorySection
                key={activeCategory}
                category={activeCategory}
                categoryCards={groupedCards[activeCategory]}
                sectionRef={() => { }} // No ref needed for single section rendering
                renderCard={renderCard}
              />
            )}
          </div>
        ) : (
          <div className="card-grid">
            {cards.map((card) => renderCard(card, "#FF5722"))}
          </div>
        )}
      </div>
    );
  },
);

CardGrid.displayName = "CardGrid";
