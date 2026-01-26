import React from "react";
import { Sparkles } from "lucide-react";

interface HeroSectionProps {
  totalAgents: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ totalAgents }) => {
  return (
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
          Intelligent AI agents designed to enhance every moment of the guest
          journey
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
  );
};
