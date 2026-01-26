// CardGrid.tsx
import React, { memo, useRef, useState } from "react";
import { Card } from "./Card";
import { AgentDetail } from "./AgentDetail";
import type { CardInterface } from "../../types";
import RealEstateAgentVoice from "./RealEstateAgentVoice";
import { categoryOrder } from "./CardGrid.constants";
import { HeroSection } from "./HeroSection";
import { CategoryNav } from "./CategoryNav";
import { CategorySection } from "./CategorySection";
import { useActiveCategory } from "./useActiveCategory";
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
 * Main component for rendering the agent grid with categories and hero section.
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
    const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

    // Hooks
    const { activeCategory, setActiveCategory } = useActiveCategory({
      cards,
      sectionRefs,
    });

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

    const groupedCards = categoryOrder.reduce(
      (acc, category) => {
        const categoryCards = cards.filter(
          (card) => card.category === category,
        );
        if (categoryCards.length > 0) acc[category] = categoryCards;
        return acc;
      },
      {} as Record<string, CardInterface[]>,
    );

    const handleCategoryNavClick = (category: string) => {
      setActiveCategory(category);
      const el = sectionRefs.current[category];
      if (el) el.scrollIntoView({ behavior: "smooth" });
    };

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
          onAgentSelect={() => {}}
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
    return (
      <div className={`card-grid-wrapper ${className}`}>
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
            <CategoryNav
              groupedCards={groupedCards}
              activeCategory={activeCategory}
              onCategoryClick={handleCategoryNavClick}
            />

            <div className="category-sections">
              {categoryOrder.map((category) => {
                const categoryCards = groupedCards[category];
                if (!categoryCards || categoryCards.length === 0) return null;

                return (
                  <CategorySection
                    key={category}
                    category={category}
                    categoryCards={categoryCards}
                    sectionRef={(el) => (sectionRefs.current[category] = el)}
                    renderCard={renderCard}
                  />
                );
              })}
            </div>
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
