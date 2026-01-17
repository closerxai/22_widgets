import React from 'react';
import { ArrowLeft, Mic, Star, Users, Clock, Award } from 'lucide-react';
import type { CardInterface } from '../../types';
import './AgentDetail.css';

interface AgentDetailProps {
  agent: CardInterface;
  onBack: () => void;
  handleStart: (agent_code: string) => void;
  handleEnd: () => void;
  getAgentName: (agentName: string) => void;
}

const agentDetails = {
  "Central Reservations": {
    fullDescription: "AI-powered central reservations agent handling booking inquiries, rate checks, availability searches, and reservation modifications across all channels in real time.",
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
      bookingsProcessed: "18,500+"
    }
  },
  "Front Office Operations": {
    fullDescription: "Streamlines pre-arrival communication, check-in coordination, guest profiling, and front desk task automation for seamless guest journeys.",
    features: [
      "Pre-arrival messaging",
      "Digital check-in/out",
      "Room assignment optimization",
      "Guest preference tracking",
      "VIP & special request handling"
    ],
    useCases: [
      "Send pre-arrival confirmation & upsell offers",
      "Coordinate early check-in/late check-out",
      "Assign rooms based on preferences",
      "Manage upgrades and special requests",
      "Handle walk-ins professionally"
    ],
    stats: {
      satisfaction: "95%",
      responseTime: "< 2 sec",
      checkInsHandled: "12,000+"
    }
  },
  "Concierge Desk": {
    fullDescription: "Your 24/7 virtual concierge providing local recommendations, activity bookings, restaurant suggestions, and personalized guest experiences.",
    features: [
      "Local attraction knowledge",
      "Restaurant reservation booking",
      "Ticket & tour arrangements",
      "Transportation coordination",
      "Personalized itinerary creation"
    ],
    useCases: [
      "Recommend hidden gems and experiences",
      "Book restaurants and activities",
      "Arrange airport transfers",
      "Create custom city guides",
      "Answer 'What's nearby?' questions"
    ],
    stats: {
      satisfaction: "97%",
      responseTime: "< 4 sec",
      recommendations: "9,800+"
    }
  },
  "Housekeeping Coordination": {
    fullDescription: "Real-time housekeeping coordination ensuring rooms are cleaned, inspected, and ready on time with smart status tracking and request handling.",
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
      roomsManaged: "45,000+"
    }
  },
  "Room Service Ordering": {
    fullDescription: "Delight guests with seamless in-room dining. Takes orders, confirms dietary needs, estimates delivery time, and processes payments.",
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
      ordersProcessed: "11,200+"
    }
  },
  "Restaurant & Dining Reservations": {
    fullDescription: "Manages table reservations, waitlists, special requests, and dining preferences across all hotel restaurants and outlets.",
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
      reservations: "15,300+"
    }
  },
  "Spa, Salon & Wellness Appointments": {
    fullDescription: "Full spa booking system handling treatments, therapist preferences, packages, and wellness program enrollments.",
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
      "Handle couple’s treatments",
      "Manage waiting lists",
      "Send pre-treatment guidelines"
    ],
    stats: {
      satisfaction: "98%",
      responseTime: "< 4 sec",
      appointments: "8,700+"
    }
  },
  "Banquet & Event Sales": {
    fullDescription: "Drives banquet inquiries, venue tours, menu customization, and contract generation for weddings, conferences, and private events.",
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
      eventsBooked: "1,900+"
    }
  },
  "Corporate & Group Sales": {
    fullDescription: "Specialized in corporate accounts, group blocks, meeting packages, and negotiated rates with dedicated account management.",
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
      contracts: "680+"
    }
  },
  "Loyalty Program Support": {
    fullDescription: "Manages member inquiries, point balances, reward redemptions, tier benefits, and personalized loyalty communications.",
    features: [
      "Member lookup & verification",
      "Points balance & history",
      "Reward redemption",
      "Tier status explanation",
      "Personalized offers"
    ],
    useCases: [
      "Check points and tier status",
      "Redeem free nights/upgrades",
      "Explain program benefits",
      "Resolve membership issues",
      "Send birthday/anniversary rewards"
    ],
    stats: {
      satisfaction: "97%",
      responseTime: "< 2 sec",
      membersServed: "22,000+"
    }
  },
  "Guest Feedback & Reputation Management": {
    fullDescription: "Collects in-stay and post-stay feedback, responds to reviews across platforms, and helps improve online reputation proactively.",
    features: [
      "In-stay feedback collection",
      "Review response automation",
      "Sentiment analysis",
      "TripAdvisor/Booking.com integration",
      "Management alerts"
    ],
    useCases: [
      "Send post-stay surveys",
      "Respond to online reviews",
      "Address complaints instantly",
      "Thank positive reviewers",
      "Track reputation score"
    ],
    stats: {
      satisfaction: "96%",
      responseTime: "< 1 min",
      reviewsManaged: "14,000+"
    }
  },
  "Billing & Accounts Follow-ups": {
    fullDescription: "Handles folio inquiries, payment disputes, invoice generation, group master billing, and accounts receivable follow-ups.",
    features: [
      "Folio review & explanation",
      "Charge disputes resolution",
      "Invoice generation",
      "Payment link sharing",
      "AR aging management"
    ],
    useCases: [
      "Explain charges on guest folio",
      "Resolve billing disputes",
      "Send invoices to companies",
      "Process credit card authorizations",
      "Follow up on unpaid balances"
    ],
    stats: {
      satisfaction: "93%",
      responseTime: "< 4 sec",
      disputesResolved: "4,200+"
    }
  },
  "Travel Desk & Transportation": {
    fullDescription: "Coordinates airport transfers, limousines, city tours, and all guest transportation needs with preferred vendors.",
    features: [
      "Airport transfer booking",
      "Limousine & private car",
      "Flight monitoring",
      "Meet & greet service",
      "Group shuttle coordination"
    ],
    useCases: [
      "Book airport pickup/drop-off",
      "Arrange VIP transfers",
      "Monitor flight delays",
      "Organize city tours",
      "Coordinate group shuttles"
    ],
    stats: {
      satisfaction: "95%",
      responseTime: "< 5 sec",
      transfers: "19,000+"
    }
  },
  "Engineering & Maintenance Requests": {
    fullDescription: "Logs, tracks, and follows up on all maintenance requests from guest rooms and public areas with priority routing.",
    features: [
      "Issue logging & categorization",
      "Priority assignment",
      "Technician dispatch",
      "Status updates to guest",
      "Preventive maintenance alerts"
    ],
    useCases: [
      "Report AC not working",
      "Request light bulb replacement",
      "Report leaking faucet",
      "Track repair progress",
      "Follow up on pending fixes"
    ],
    stats: {
      satisfaction: "94%",
      responseTime: "< 2 min",
      requestsResolved: "28,000+"
    }
  },
  "Upselling & In-stay Promotions": {
    fullDescription: "Proactively offers room upgrades, packages, dining credits, and experiences to maximize revenue during the guest stay.",
    features: [
      "Upgrade availability detection",
      "Personalized offer engine",
      "Late check-out offers",
      "Dining & spa credits",
      "Experience bundles"
    ],
    useCases: [
      "Offer suite upgrades",
      "Suggest dining packages",
      "Promote spa credits",
      "Offer late check-out",
      "Bundle activities"
    ],
    stats: {
      satisfaction: "96%",
      responseTime: "< 3 sec",
      revenueGenerated: "$2.4M+"
    }
  },
  "Marketing Outreach & Offers": {
    fullDescription: "Sends targeted pre-arrival, in-stay, and post-stay offers based on guest profile, stay history, and preferences.",
    features: [
      "Segmentation & targeting",
      "Personalized email/SMS",
      "Re-engagement campaigns",
      "Birthday & anniversary offers",
      "Last-minute deals"
    ],
    useCases: [
      "Welcome back returning guests",
      "Send birthday offers",
      "Promote shoulder season deals",
      "Win back lapsed guests",
      "Announce new facilities"
    ],
    stats: {
      satisfaction: "95%",
      responseTime: "< 2 sec",
      campaignsSent: "87,000+"
    }
  },
  "Guest Identity & Document Verification": {
    fullDescription: "Securely verifies guest identity and travel documents during check-in to ensure compliance and prevent fraud.",
    features: [
      "ID & passport scanning",
      "Facial recognition match",
      "Document authenticity check",
      "Blacklist screening",
      "Registration card auto-fill"
    ],
    useCases: [
      "Verify guest identity at check-in",
      "Detect fake IDs",
      "Auto-fill registration forms",
      "Comply with local laws",
      "Prevent fraud and chargebacks"
    ],
    stats: {
      satisfaction: "98%",
      responseTime: "< 8 sec",
      verifications: "31,000+"
    }
  },
  "No-Show Handling & Arrival Confirmations": {
    fullDescription: "Sends arrival confirmations, manages guaranteed reservations, and handles no-shows and cancellations professionally.",
    features: [
      "Pre-arrival confirmation",
      "No-show charge processing",
      "Cancellation policy enforcement",
      "Waitlist activation",
      "Overbooking management"
    ],
    useCases: [
      "Confirm arrival details",
      "Charge no-show fees",
      "Release rooms from waitlist",
      "Handle last-minute cancellations",
      "Manage overbooking gracefully"
    ],
    stats: {
      satisfaction: "94%",
      responseTime: "< 3 sec",
      confirmations: "29,000+"
    }
  },
  "Travel Agent / OTA Partner Relations": {
    fullDescription: "Dedicated support for travel agents, OTAs, and wholesalers handling commissions, allocations, and special requests.",
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
      partnersSupported: "1,100+"
    }
  },
  "Human Resources": {
    fullDescription: "Screens candidates, schedules interviews, conducts initial assessments, and supports hotel staffing needs efficiently.",
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
      candidatesScreened: "5,600+"
    }
    
  },
  "Vendor & Supplier Coordination": {
    fullDescription: "Manages vendor communications, purchase orders, delivery tracking, and supplier performance for smooth operations.",
    features: [
      "PO creation & tracking",
      "Delivery coordination",
      "Quality issue reporting",
      "Contract compliance",
      "Supplier performance scoring"
    ],
    useCases: [
      "Coordinate linen delivery",
      "Order F&B supplies",
      "Report quality issues",
      "Track incoming shipments",
      "Negotiate with vendors"
    ],
    stats: {
      satisfaction: "91%",
      responseTime: "< 7 sec",
      ordersProcessed: "9,300+"
    }
  },
  "Security & Emergency Communication": {
    fullDescription: "Critical emergency response system connecting guests and staff to security, medical, and management teams instantly.",
    features: [
      "Emergency keyword detection",
      "Security team alerting",
      "Location triangulation",
      "Protocol guidance",
      "Incident logging"
    ],
    useCases: [
      "Guest reports suspicious activity",
      "Medical emergency in room",
      "Fire or safety concern",
      "Lost child reporting",
      "Silent alarm activation"
    ],
    stats: {
      satisfaction: "99%",
      responseTime: "< 10 sec",
      incidentsHandled: "890+"
    }
  },
  "gourav": {
    fullDescription: "Critical emergency response system connecting guests and staff to security, medical, and management teams instantly.",
    features: [
      "Emergency keyword detection",
      "Security team alerting",
      "Location triangulation",
      "Protocol guidance",
      "Incident logging"
    ],
    useCases: [
      "Guest reports suspicious activity",
      "Medical emergency in room",
      "Fire or safety concern",
      "Lost child reporting",
      "Silent alarm activation"
    ],
    stats: {
      satisfaction: "99%",
      responseTime: "< 10 sec",
      incidentsHandled: "890+"
    }
  },
};

export const AgentDetail: React.FC<AgentDetailProps> = ({
  agent,
  onBack,
  handleStart,
  handleEnd,
  getAgentName
}) => {
  const Icon = agent.icon;
  const details = agentDetails[agent.title as keyof typeof agentDetails];

  const handleTryDemo = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleStart(agent.agent_code);
    getAgentName(agent.title);
  };

  // Fallback if agent not in details (shouldn't happen with current list)
  if (!details) {
    return <div>Agent details coming soon...</div>;
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
          <div 
            className="agent-hero-icon"
            style={{ backgroundColor: agent.imageUrl }}
          >
            <Icon size={48} className="text-white" />
          </div>
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
              <div className="stat-value">{Object.values(details.stats)[2]}</div>
              <div className="stat-label">Total Interactions</div>
            </div>
          </div>
        </div>

        <div className="agent-details-grid">
          <div className="detail-section">
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