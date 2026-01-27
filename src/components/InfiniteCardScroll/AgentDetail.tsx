import React from 'react';
import { ArrowLeft, Mic, Star, Users, Clock, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import type { CardInterface } from '../../types';
import './AgentDetail.css';

interface AgentDetailProps {
  agent: CardInterface;
  onBack: () => void;
  handleStart: (agent_code: string, schema_name?: string) => void;
  handleEnd: () => void;
  getAgentName: (agentName: string) => void;
}

// Complete agent details for all agents
const agentDetails: Record<string, {
  fullDescription: string;
  features: string[];
  useCases: string[];
  stats: {
    satisfaction: string;
    responseTime: string;
    metric: string;
  };
}> = {
  // ============================================
  // PRE-ARRIVAL AGENTS
  // ============================================
  "central-reservations": {
    fullDescription: "AI-powered central reservations agent handling booking inquiries, rate checks, availability searches, and reservation modifications across all channels in real time. Seamlessly integrates with your PMS to provide instant, accurate responses.",
    features: [
      "Multi-channel booking sync",
      "Dynamic pricing & rate checks",
      "Group booking handling",
      "Waitlist & cancellation management",
      "Upsell room categories"
    ],
    useCases: [
      "Handle direct phone/email booking requests",
      "Check rates and availability instantly",
      "Modify or cancel existing reservations",
      "Manage group and corporate bookings",
      "Offer best available rate guarantees"
    ],
    stats: {
      satisfaction: "96%",
      responseTime: "< 3 sec",
      metric: "18,500+ Bookings"
    }
  },
  "upselling": {
    fullDescription: "Intelligent upselling agent that identifies opportunities to enhance guest stays with room upgrades, breakfast packages, transfers, and special add-ons. Uses guest history and preferences to make personalized recommendations.",
    features: [
      "Smart upgrade recommendations",
      "Package bundling optimization",
      "Personalized offer timing",
      "Revenue opportunity scoring",
      "A/B testing for promotions"
    ],
    useCases: [
      "Offer room upgrades at optimal times",
      "Bundle breakfast with accommodations",
      "Promote spa packages to relevant guests",
      "Suggest airport transfer add-ons",
      "Create personalized welcome packages"
    ],
    stats: {
      satisfaction: "94%",
      responseTime: "< 2 sec",
      metric: "32% Conversion Rate"
    }
  },
  "concierge": {
    fullDescription: "Your 24/7 virtual concierge providing local recommendations, activity bookings, restaurant suggestions, and personalized guest experiences before arrival. Helps guests plan their perfect stay.",
    features: [
      "Local attraction knowledge",
      "Restaurant reservation booking",
      "Ticket & tour arrangements",
      "Transportation coordination",
      "Personalized itinerary creation"
    ],
    useCases: [
      "Recommend hidden gems and experiences",
      "Book restaurants and activities in advance",
      "Arrange airport transfers",
      "Create custom city guides",
      "Answer 'What should I do?' questions"
    ],
    stats: {
      satisfaction: "97%",
      responseTime: "< 4 sec",
      metric: "9,800+ Recommendations"
    }
  },
  "verification": {
    fullDescription: "Streamlines guest identity verification and document collection before arrival. Handles KYC requirements, ID uploads, and registration form pre-filling for a smooth check-in experience.",
    features: [
      "ID document scanning & OCR",
      "Facial recognition matching",
      "Digital signature collection",
      "Compliance requirement checks",
      "Secure document storage"
    ],
    useCases: [
      "Collect passport/ID before arrival",
      "Verify guest identity remotely",
      "Auto-fill registration forms",
      "Comply with local regulations",
      "Prevent fraud and chargebacks"
    ],
    stats: {
      satisfaction: "98%",
      responseTime: "< 8 sec",
      metric: "31,000+ Verifications"
    }
  },

  // ============================================
  // ARRIVAL AGENTS
  // ============================================
  "front-office": {
    fullDescription: "Streamlines the check-in process with digital coordination, room assignment optimization, and instant guest profiling. Reduces wait times and ensures a warm, efficient welcome.",
    features: [
      "Digital check-in/out",
      "Room assignment optimization",
      "Guest preference tracking",
      "VIP & special request handling",
      "Key card encoding integration"
    ],
    useCases: [
      "Process express check-ins",
      "Coordinate early check-in/late check-out",
      "Assign rooms based on preferences",
      "Manage upgrades and special requests",
      "Handle walk-ins professionally"
    ],
    stats: {
      satisfaction: "95%",
      responseTime: "< 2 sec",
      metric: "12,000+ Check-ins"
    }
  },
  "queue": {
    fullDescription: "Intelligent queue management system that reduces front desk waiting times through express check-in options, self-service kiosks coordination, and smart guest flow optimization.",
    features: [
      "Real-time queue monitoring",
      "Express lane assignment",
      "Self-service kiosk integration",
      "Wait time estimation",
      "Staff allocation optimization"
    ],
    useCases: [
      "Direct guests to shortest queues",
      "Enable mobile check-in bypass",
      "Manage peak arrival periods",
      "Coordinate group arrivals",
      "Send wait time notifications"
    ],
    stats: {
      satisfaction: "93%",
      responseTime: "< 1 sec",
      metric: "67% Wait Reduction"
    }
  },
  "info": {
    fullDescription: "Provides immediate answers to common guest questions about WiFi, amenities, hotel facilities, and services. Available 24/7 to ensure guests have all the information they need.",
    features: [
      "WiFi credentials delivery",
      "Facility hours & locations",
      "Amenity information",
      "Emergency contacts",
      "Hotel policy explanations"
    ],
    useCases: [
      "Share WiFi password instantly",
      "Explain gym/pool hours",
      "Provide parking information",
      "Answer 'Where is...?' questions",
      "Share checkout procedures"
    ],
    stats: {
      satisfaction: "96%",
      responseTime: "< 1 sec",
      metric: "45,000+ Queries"
    }
  },

  // ============================================
  // IN-STAY AGENTS
  // ============================================
  "housekeeping": {
    fullDescription: "Real-time housekeeping coordination ensuring rooms are cleaned, inspected, and ready on time. Handles guest requests for extra amenities, turn-down service, and maintenance flagging.",
    features: [
      "Room status updates (Dirty/Clean/Inspected)",
      "Turn-down service scheduling",
      "Lost & found management",
      "Maintenance flagging",
      "Housekeeping staff coordination"
    ],
    useCases: [
      "Report room ready status instantly",
      "Request extra towels/linen",
      "Schedule turndown service",
      "Report maintenance issues",
      "Track room cleaning progress"
    ],
    stats: {
      satisfaction: "94%",
      responseTime: "< 2 sec",
      metric: "45,000+ Rooms"
    }
  },
  "bellboy": {
    fullDescription: "Coordinates luggage assistance, storage, and delivery services. Manages bellboy dispatching and ensures guests' belongings are handled with care and efficiency.",
    features: [
      "Luggage pickup requests",
      "Storage coordination",
      "Bellboy dispatching",
      "Delivery tracking",
      "Special handling instructions"
    ],
    useCases: [
      "Request luggage pickup from room",
      "Store bags for early arrivals",
      "Coordinate airport luggage delivery",
      "Track luggage location",
      "Handle fragile item requests"
    ],
    stats: {
      satisfaction: "95%",
      responseTime: "< 3 sec",
      metric: "8,500+ Requests"
    }
  },
  "room-service": {
    fullDescription: "Delight guests with seamless in-room dining. Takes orders, confirms dietary needs, estimates delivery time, and processes payments for a complete room service experience.",
    features: [
      "Full menu navigation",
      "Dietary & allergy handling",
      "Order customization",
      "Delivery time estimation",
      "Payment integration"
    ],
    useCases: [
      "Take complete room service orders",
      "Suggest pairings and specials",
      "Handle special dietary requests",
      "Confirm delivery time",
      "Process in-room charges"
    ],
    stats: {
      satisfaction: "93%",
      responseTime: "< 5 sec",
      metric: "11,200+ Orders"
    }
  },
  "travel-desk": {
    fullDescription: "Your guests' personal travel advisor providing local recommendations, tour bookings, attraction tickets, and insider tips to make their stay memorable.",
    features: [
      "Local attraction recommendations",
      "Tour & activity booking",
      "Ticket reservations",
      "Transportation arrangements",
      "Custom itinerary creation"
    ],
    useCases: [
      "Book city tours and excursions",
      "Reserve attraction tickets",
      "Arrange car rentals",
      "Provide local dining recommendations",
      "Create personalized day plans"
    ],
    stats: {
      satisfaction: "97%",
      responseTime: "< 4 sec",
      metric: "6,800+ Bookings"
    }
  },
  "complaints": {
    fullDescription: "Professional complaint resolution system that addresses guest concerns promptly, escalates issues appropriately, and ensures service recovery to maintain guest satisfaction.",
    features: [
      "Issue categorization",
      "Automatic escalation rules",
      "Service recovery suggestions",
      "Compensation guidelines",
      "Follow-up automation"
    ],
    useCases: [
      "Address noise complaints",
      "Handle room condition issues",
      "Resolve billing disputes",
      "Manage service failures",
      "Process refund requests"
    ],
    stats: {
      satisfaction: "89%",
      responseTime: "< 5 sec",
      metric: "92% Resolution Rate"
    }
  },
  "spa-wellness": {
    fullDescription: "Full spa booking system handling treatments, therapist preferences, packages, and wellness program enrollments. Creates relaxing experiences for your guests.",
    features: [
      "Treatment menu navigation",
      "Therapist gender preference",
      "Package & couple treatments",
      "Availability syncing",
      "Pre-treatment consultation"
    ],
    useCases: [
      "Book massages and facials",
      "Create spa day packages",
      "Handle couple's treatments",
      "Manage waiting lists",
      "Send pre-treatment guidelines"
    ],
    stats: {
      satisfaction: "98%",
      responseTime: "< 4 sec",
      metric: "8,700+ Appointments"
    }
  },
  "dining-reservations": {
    fullDescription: "Manages table reservations, waitlists, special requests, and dining preferences across all hotel restaurants and outlets for seamless dining experiences.",
    features: [
      "Table availability lookup",
      "Waitlist & seating optimization",
      "Special occasion handling",
      "Dietary preference storage",
      "Multi-outlet coordination"
    ],
    useCases: [
      "Book dinner reservations",
      "Manage Valentine's/Birthday requests",
      "Handle large party bookings",
      "Offer best table suggestions",
      "Coordinate with kitchen on allergies"
    ],
    stats: {
      satisfaction: "96%",
      responseTime: "< 3 sec",
      metric: "15,300+ Reservations"
    }
  },

  // ============================================
  // DEPARTURE AGENTS
  // ============================================
  "checkout": {
    fullDescription: "Streamlines the checkout process with express options, folio review, billing clarification, and payment processing. Ensures guests leave with a positive final impression.",
    features: [
      "Express checkout options",
      "Folio review & explanation",
      "Payment processing",
      "Invoice generation",
      "Late checkout coordination"
    ],
    useCases: [
      "Process express checkouts",
      "Explain billing charges",
      "Handle payment issues",
      "Arrange late checkouts",
      "Send digital receipts"
    ],
    stats: {
      satisfaction: "95%",
      responseTime: "< 3 sec",
      metric: "14,200+ Checkouts"
    }
  },
  "transportation": {
    fullDescription: "Coordinates airport transfers, taxi bookings, car rentals, and local transportation for departing guests. Ensures smooth transitions from hotel to destination.",
    features: [
      "Airport transfer scheduling",
      "Taxi/ride-share booking",
      "Car rental coordination",
      "Flight status monitoring",
      "Multi-stop arrangements"
    ],
    useCases: [
      "Book airport transfers",
      "Arrange taxi pickups",
      "Coordinate car rentals",
      "Monitor flight changes",
      "Handle group transportation"
    ],
    stats: {
      satisfaction: "94%",
      responseTime: "< 4 sec",
      metric: "7,600+ Transfers"
    }
  },

  // ============================================
  // POST-STAY AGENTS
  // ============================================
  "reviews": {
    fullDescription: "Proactively collects guest reviews and testimonials after checkout. Encourages satisfied guests to share their experiences on major review platforms.",
    features: [
      "Automated review requests",
      "Multi-platform integration",
      "Sentiment pre-screening",
      "Incentive management",
      "Response rate tracking"
    ],
    useCases: [
      "Send post-stay review requests",
      "Direct to TripAdvisor/Google",
      "Collect video testimonials",
      "Manage review incentives",
      "Track review metrics"
    ],
    stats: {
      satisfaction: "91%",
      responseTime: "< 2 sec",
      metric: "4,200+ Reviews"
    }
  },
  "feedback": {
    fullDescription: "Comprehensive feedback collection and analysis system. Sends surveys, tracks satisfaction scores, and provides insights for service improvement.",
    features: [
      "Survey design & delivery",
      "NPS/CSAT tracking",
      "Sentiment analysis",
      "Trend identification",
      "Action item generation"
    ],
    useCases: [
      "Send post-stay surveys",
      "Track satisfaction trends",
      "Identify service gaps",
      "Generate improvement reports",
      "Benchmark against competitors"
    ],
    stats: {
      satisfaction: "93%",
      responseTime: "< 2 sec",
      metric: "38% Response Rate"
    }
  },
  "loyalty": {
    fullDescription: "Manages loyalty program support, member benefits, and re-engagement campaigns. Brings guests back with personalized offers and reward redemptions.",
    features: [
      "Member lookup & verification",
      "Points balance management",
      "Reward redemption",
      "Re-engagement campaigns",
      "Personalized offers"
    ],
    useCases: [
      "Check points and tier status",
      "Redeem free nights/upgrades",
      "Send win-back offers",
      "Celebrate member milestones",
      "Promote return bookings"
    ],
    stats: {
      satisfaction: "97%",
      responseTime: "< 2 sec",
      metric: "22,000+ Members"
    }
  },

  // ============================================
  // BACK OFFICE AGENTS
  // ============================================
  "banquet-events": {
    fullDescription: "Drives banquet inquiries, venue tours, menu customization, and contract generation for weddings, conferences, and private events. Your event sales assistant.",
    features: [
      "Venue capacity & layout info",
      "Menu & beverage package builder",
      "Virtual venue tours",
      "Proposal generation",
      "Follow-up automation"
    ],
    useCases: [
      "Handle wedding inquiries",
      "Quote conference packages",
      "Customize banquet menus",
      "Send proposals and contracts",
      "Coordinate site inspections"
    ],
    stats: {
      satisfaction: "95%",
      responseTime: "< 6 sec",
      metric: "1,900+ Events"
    }
  },
  "corporate-group": {
    fullDescription: "Specialized in corporate accounts, group blocks, meeting packages, and negotiated rates. Provides dedicated account management for your top clients.",
    features: [
      "Corporate rate negotiation",
      "Group block management",
      "Meeting room allocation",
      "BEO creation support",
      "Dedicated account handling"
    ],
    useCases: [
      "Set up corporate travel accounts",
      "Manage group room blocks",
      "Negotiate annual contracts",
      "Handle meeting inquiries",
      "Track production and history"
    ],
    stats: {
      satisfaction: "94%",
      responseTime: "< 5 sec",
      metric: "680+ Contracts"
    }
  },
  "ota-relations": {
    fullDescription: "Dedicated support for travel agents, OTAs, and wholesalers. Handles commissions, allocations, rate loading, and partner inquiries professionally.",
    features: [
      "Agent portal support",
      "Commission reconciliation",
      "Allocation management",
      "Special rate loading",
      "Contract compliance"
    ],
    useCases: [
      "Assist travel agents with bookings",
      "Resolve commission disputes",
      "Load confidential rates",
      "Manage allotment releases",
      "Handle agent inquiries"
    ],
    stats: {
      satisfaction: "93%",
      responseTime: "< 6 sec",
      metric: "1,100+ Partners"
    }
  },
  "hr": {
    fullDescription: "Screens candidates, schedules interviews, conducts initial assessments, and supports hotel staffing needs. Streamlines your recruitment process.",
    features: [
      "Resume parsing & scoring",
      "Interview scheduling",
      "Skills assessment",
      "Background check coordination",
      "Onboarding document prep"
    ],
    useCases: [
      "Screen housekeeper applicants",
      "Schedule F&B interviews",
      "Assess language skills",
      "Coordinate reference checks",
      "Speed up hiring process"
    ],
    stats: {
      satisfaction: "92%",
      responseTime: "< 5 sec",
      metric: "5,600+ Candidates"
    }
  },
  "maintenance": {
    fullDescription: "Manages maintenance requests, work orders, preventive maintenance schedules, and vendor coordination for smooth hotel operations.",
    features: [
      "Work order management",
      "Preventive maintenance scheduling",
      "Vendor coordination",
      "Asset tracking",
      "Priority escalation"
    ],
    useCases: [
      "Log maintenance requests",
      "Schedule preventive checks",
      "Track repair status",
      "Coordinate with contractors",
      "Manage equipment inventory"
    ],
    stats: {
      satisfaction: "91%",
      responseTime: "< 4 sec",
      metric: "12,400+ Work Orders"
    }
  }
};

export const AgentDetail: React.FC<AgentDetailProps> = ({
  agent,
  onBack,
  handleStart,
  handleEnd,
  getAgentName
}) => {
  const Icon = agent.icon;
  const details = agentDetails[agent.route];

  const handleTryDemo = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleStart(agent.agent_code, agent.schema_name);
    getAgentName(agent.title);
  };

  // Fallback if agent not in details
  if (!details) {
    return (
      <div className="agent-detail-container">
        <div className="agent-detail-header">
          <button
            className="back-button"
            onClick={onBack}
            aria-label="Back to agents"
          >
            <ArrowLeft size={20} />
            <span>Back to Agents</span>
          </button>
        </div>
        <div className="agent-detail-content">
          <div className="agent-hero">
            <motion.div
              layoutId={`card-icon-${agent.id}`}
              className="agent-hero-icon"
              style={{ backgroundColor: agent.imageUrl }}
            >
              <Icon size={48} className="text-white" />
            </motion.div>
            <div className="agent-hero-info">
              <h1 className="agent-title">{agent.title}</h1>
              <p className="agent-subtitle">Hospitality AI Agent</p>
              <p className="agent-description">{agent.description}</p>
            </div>
            <button
              className="try-demo-hero-button"
              onClick={handleTryDemo}
            >
              <Mic size={20} />
              Try Demo Now
            </button>
          </div>
          <div className="coming-soon-message">
            <h2>Detailed Information Coming Soon</h2>
            <p>We're preparing comprehensive details for this agent. In the meantime, try the interactive demo!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="agent-detail-container">
      <div className="agent-detail-header">
        <button
          className="back-button"
          onClick={onBack}
          aria-label="Back to agents"
        >
          <ArrowLeft size={20} />
          <span>Back to Agents</span>
        </button>
      </div>

      <div className="agent-detail-content">
        <div className="agent-hero">
          <motion.div
            layoutId={`card-icon-${agent.id}`}
            className="agent-hero-icon"
            style={{ backgroundColor: agent.imageUrl }}
          >
            <Icon size={48} className="text-white" />
          </motion.div>
          <div className="agent-hero-info">
            <h1 className="agent-title">{agent.title}</h1>
            <p className="agent-subtitle">Hospitality AI Agent</p>
            <p className="agent-description">{agent.description}</p>
          </div>
          <button
            className="try-demo-hero-button"
            onClick={handleTryDemo}
          >
            <Mic size={20} />
            Try Demo Now
          </button>
        </div>

        <div className="agent-stats">
          <div className="stat-card">
            <Star className="stat-icon" />
            <div className="stat-content">
              <div className="stat-value">{details.stats.satisfaction}</div>
              <div className="stat-label">Satisfaction Rate</div>
            </div>
          </div>
          <div className="stat-card">
            <Clock className="stat-icon" />
            <div className="stat-content">
              <div className="stat-value">{details.stats.responseTime}</div>
              <div className="stat-label">Avg. Response Time</div>
            </div>
          </div>
          <div className="stat-card">
            <Users className="stat-icon" />
            <div className="stat-content">
              <div className="stat-value">{details.stats.metric}</div>
              <div className="stat-label">Total Interactions</div>
            </div>
          </div>
        </div>

        <div className="agent-details-grid">
          <div className="detail-section about-section">
            <h2 className="section-title">
              <Award size={24} />
              About This Agent
            </h2>
            <p className="section-description">{details.fullDescription}</p>
          </div>

          <div className="detail-section">
            <h2 className="section-title">Key Features</h2>
            <ul className="feature-list">
              {details.features.map((feature, index) => (
                <li key={index} className="feature-item">
                  <div className="feature-bullet"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="detail-section">
            <h2 className="section-title">Common Use Cases</h2>
            <ul className="use-case-list">
              {details.useCases.map((useCase, index) => (
                <li key={index} className="use-case-item">
                  <div className="use-case-number">{index + 1}</div>
                  {useCase}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="cta-section">
          <h2>Ready to Transform Your Guest Experience?</h2>
          <p>Start an interactive demo and see how this AI agent works in real hotel scenarios.</p>
          <button
            className="cta-button"
            onClick={handleTryDemo}
          >
            <Mic size={20} />
            Start Interactive Demo
          </button>
        </div>
      </div>
    </div>
  );
};