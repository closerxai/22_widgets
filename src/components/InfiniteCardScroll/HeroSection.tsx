import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { categoryConfig } from "./CardGrid.constants";

interface HeroSectionProps {
  totalAgents: number;
  activeCategory?: string | null;
  activeColor?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  totalAgents,
  activeCategory,
  activeColor,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Get current category theme
  const theme = activeCategory
    ? categoryConfig[activeCategory as keyof typeof categoryConfig]
    : null;

  const badgeStyle = theme
    ? {
      background: theme.gradient,
      boxShadow: `0 8px 25px ${theme.color}33`,
    }
    : {};

  return (
    <div className="hero-section">
      <div className="hero-background">
        <div className="hero-gradient-orb orb-1"></div>
        <div className="hero-gradient-orb orb-2"></div>
        <div className="hero-gradient-orb orb-3"></div>
      </div>
      <motion.div
        layout
        className="hero-content"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <AnimatePresence>
          {isHovered && (
            <motion.div
              layout
              key="badge"
              initial={{ opacity: 0, y: 20, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto", marginBottom: "1rem" }}
              exit={{ opacity: 0, y: 20, height: 0, marginBottom: 0 }}
              transition={{
                duration: 0.5,
                ease: [0.23, 1, 0.32, 1],
                opacity: { duration: 0.3 }
              }}
              style={{ zIndex: 1, overflow: "hidden" }}
            >
              <div className="hero-badge" style={badgeStyle}>
                <Sparkles size={16} />
                <span>AI-Powered Hospitality</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.h1
          layout
          className="hero-title"
          style={{ position: "relative", zIndex: 2, margin: 0 }}
        >
          Building a Team
          <span className="hero-title-highlight"> Across All Touch Points</span>
        </motion.h1>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              layout
              key="details"
              initial={{ height: 0, opacity: 0, y: -20 }}
              animate={{ height: "auto", opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -20 }}
              transition={{
                duration: 0.5,
                ease: [0.23, 1, 0.32, 1],
                opacity: { duration: 0.3 }
              }}
              style={{ overflow: "hidden" }}
            >
              <p className="hero-subtitle">
                Intelligent AI agents designed to enhance every moment of the
                guest journey
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
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
