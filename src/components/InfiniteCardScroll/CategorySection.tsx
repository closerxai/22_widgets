import React from "react";
import { categoryConfig } from "./CardGrid.constants";
import { CardInterface } from "../../types";

interface CategorySectionProps {
  category: string;
  categoryCards: CardInterface[];
  sectionRef: (el: HTMLElement | null) => void;
  renderCard: (card: CardInterface, categoryColor: string) => React.ReactNode;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  category,
  categoryCards,
  sectionRef,
  renderCard,
}) => {
  const config = categoryConfig[category];
  if (!config) return null;
  const IconComponent = config.icon;

  return (
    <section
      id={category}
      ref={sectionRef}
      className="category-section"
      style={
        {
          "--section-color": config.color,
          "--section-gradient": config.gradient,
          "--section-bg": config.lightBg,
        } as React.CSSProperties
      }
    >
      <div className="section-header">
        <div className="section-header-left">
          <div className="section-icon-wrapper">
            <IconComponent size={28} />
          </div>
          <div className="section-title-group">
            <h2 className="section-title">{config.label}</h2>
            <p className="section-description">{config.description}</p>
          </div>
        </div>
        <div className="section-header-right">
          <span className="section-agent-count">
            {categoryCards.length}{" "}
            {categoryCards.length === 1 ? "Agent" : "Agents"}
          </span>
        </div>
      </div>

      <div className="category-cards">
        {categoryCards.map((card) => renderCard(card, config.color))}
      </div>
    </section>
  );
};
