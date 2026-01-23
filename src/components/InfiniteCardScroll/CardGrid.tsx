// CardGrid.tsx
import React, { memo, useRef, useState } from "react";
import { Card } from "./Card";
import { AgentDetail } from "./AgentDetail";
import type { CardInterface } from "../../types";
import RealEstateAgentVoice from "./RealEstateAgentVoice";
import {
  Plane,
  LogIn,
  Home,
  LogOut,
  Star,
  Briefcase,
  Sparkles
} from "lucide-react";
import "./CardGrid.css";

// Category configuration with colors, icons, and gradients
const categoryConfig: Record<string, {
  label: string;
  color: string;
  gradient: string;
  lightBg: string;
  icon: React.ElementType;
  description: string;
}> = {
  "pre-arrival": {
    label: "Pre-Arrival",
    color: "#FF6B35",
    gradient: "linear-gradient(135deg, #FF6B35 0%, #FF8E53 100%)",
    lightBg: "rgba(255, 107, 53, 0.08)",
    icon: Plane,
    description: "Prepare guests before they arrive"
  },
  "arrival": {
    label: "Arrival",
    color: "#00B894",
    gradient: "linear-gradient(135deg, #00B894 0%, #00D9A5 100%)",
    lightBg: "rgba(0, 184, 148, 0.08)",
    icon: LogIn,
    description: "Welcome & check-in experience"
  },
  "in-stay": {
    label: "In-Stay",
    color: "#0984E3",
    gradient: "linear-gradient(135deg, #0984E3 0%, #74B9FF 100%)",
    lightBg: "rgba(9, 132, 227, 0.08)",
    icon: Home,
    description: "Enhance the guest experience"
  },
  "pre-departure": {
    label: "Pre-Departure",
    color: "#A855F7",
    gradient: "linear-gradient(135deg, #A855F7 0%, #C084FC 100%)",
    lightBg: "rgba(168, 85, 247, 0.08)",
    icon: LogOut,
    description: "Smooth checkout process"
  },
  "post-stay": {
    label: "Post-Stay",
    color: "#F59E0B",
    gradient: "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)",
    lightBg: "rgba(245, 158, 11, 0.08)",
    icon: Star,
    description: "Build lasting relationships"
  },
  "back-office": {
    label: "Back Office",
    color: "#64748B",
    gradient: "linear-gradient(135deg, #64748B 0%, #94A3B8 100%)",
    lightBg: "rgba(100, 116, 139, 0.08)",
    icon: Briefcase,
    description: "Operational excellence"
  },
};

// Order of categories for display
const categoryOrder = [
  "pre-arrival",
  "arrival",
  "in-stay",
  "pre-departure",
  "post-stay",
  "back-office",
];

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
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    const openAgentDetail = (agent: CardInterface) => {
      setSelectedAgent(agent);
      setAgentName(agent.title);
      const cardElement = cardRefs.current[agent.id];
      cardElement?.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    const closeAgentDetail = () => {
      setSelectedAgent(null);
      setAgentName(null);
    };

    const getSelectedCardElement = (): HTMLElement | null => {
      if (!selectedAgent) return null;
      return cardRefs.current[selectedAgent.id] || null;
    };

    const hasCategories = cards && cards.length > 0 && cards.some((card) => card.category);

    const getGroupedCards = () => {
      if (!hasCategories) return {};
      return categoryOrder.reduce((acc, category) => {
        const categoryCards = cards.filter((card) => card.category === category);
        if (categoryCards.length > 0) {
          acc[category] = categoryCards;
        }
        return acc;
      }, {} as Record<string, CardInterface[]>);
    };

    const groupedCards = getGroupedCards();
    const totalAgents = cards.length;

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
        style={{ '--card-accent': categoryColor } as React.CSSProperties}
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
              anchorElement={getSelectedCardElement()}
            />
          )}
        </div>
      );
    }

    return (
      <div className={`card-grid-wrapper ${className}`}>
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-background">
            <div className="hero-gradient-orb orb-1"></div>
            <div className="hero-gradient-orb orb-2"></div>
            <div className="hero-gradient-orb orb-3"></div>
          </div>
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={16} />
              <span>AI-Powered Hospitality</span>
            </div>
            <h1 className="hero-title">
              Building a Team
              <span className="hero-title-highlight"> Across All Touch Points</span>
            </h1>
            <p className="hero-subtitle">
              Intelligent AI agents designed to enhance every moment of the guest journey
            </p>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-value">{totalAgents}</span>
                <span className="hero-stat-label">AI Agents</span>
              </div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat">
                <span className="hero-stat-value">6</span>
                <span className="hero-stat-label">Journey Stages</span>
              </div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat">
                <span className="hero-stat-value">24/7</span>
                <span className="hero-stat-label">Availability</span>
              </div>
            </div>
          </div>
        </div>

        {/* Voice bar if active */}
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
            {/* Category Navigation */}
            <div className="category-nav-wrapper">
              <nav className="category-nav">
                {categoryOrder.map((category) => {
                  const config = categoryConfig[category];
                  const categoryCards = groupedCards[category];
                  if (!categoryCards || categoryCards.length === 0) return null;
                  const IconComponent = config.icon;
                  const href = `#${category}`;

                  return (
                    <a
                      key={category}
                      href={href}
                      className={`category-nav-item ${activeCategory === category ? 'active' : ''}`}
                      style={{
                        '--nav-color': config.color,
                        '--nav-gradient': config.gradient,
                        '--nav-bg': config.lightBg
                      } as React.CSSProperties}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveCategory(category);
                        const el = document.getElementById(category);
                        el?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      <div className="nav-item-icon">
                        <IconComponent size={20} />
                      </div>
                      <div className="nav-item-content">
                        <span className="nav-item-label">{config.label}</span>
                        <span className="nav-item-count">{categoryCards.length} agents</span>
                      </div>
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Category Sections */}
            <div className="category-sections">
              {categoryOrder.map((category) => {
                const config = categoryConfig[category];
                const categoryCards = groupedCards[category];
                if (!categoryCards || categoryCards.length === 0) return null;
                const IconComponent = config.icon;

                return (
                  <section
                    key={category}
                    id={category}
                    className="category-section"
                    style={{
                      '--section-color': config.color,
                      '--section-gradient': config.gradient,
                      '--section-bg': config.lightBg
                    } as React.CSSProperties}
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
                          {categoryCards.length} {categoryCards.length === 1 ? 'Agent' : 'Agents'}
                        </span>
                      </div>
                    </div>

                    <div className="category-cards">
                      {categoryCards.map((card) => renderCard(card, config.color))}
                    </div>
                  </section>
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
  }
);

CardGrid.displayName = "CardGrid";