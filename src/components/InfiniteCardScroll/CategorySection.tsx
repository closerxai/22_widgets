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
      <div className="category-cards">
        {categoryCards.map((card) => renderCard(card, config.color))}
      </div>
    </section>
  );
};
