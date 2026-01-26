import React from "react";
import { categoryConfig, categoryOrder } from "./CardGrid.constants";
import { CardInterface } from "../../types";

interface CategoryNavProps {
  groupedCards: Record<string, CardInterface[]>;
  activeCategory: string | null;
  onCategoryClick: (category: string) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  groupedCards,
  activeCategory,
  onCategoryClick,
}) => {
  return (
    <nav className="category-nav-wrapper">
      <div className="category-nav">
        {categoryOrder.map((category) => {
          const config = categoryConfig[category];
          const categoryCards = groupedCards[category];
          if (!categoryCards || categoryCards.length === 0) return null;
          const IconComponent = config.icon;
          return (
            <button
              key={category}
              className={`category-nav-item ${activeCategory === category ? "active" : ""}`}
              style={
                {
                  "--nav-color": config.color,
                  "--nav-gradient": config.gradient,
                  "--nav-bg": config.lightBg,
                } as React.CSSProperties
              }
              onClick={() => onCategoryClick(category)}
            >
              <div className="nav-item-icon">
                <IconComponent size={20} />
              </div>
              <div className="nav-item-content">
                <span className="nav-item-label">{config.label}</span>
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
