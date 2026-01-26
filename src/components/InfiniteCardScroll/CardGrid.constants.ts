import { Plane, LogIn, Home, LogOut, Star, Briefcase } from "lucide-react";
import React from "react";

export interface CategoryConfig {
  label: string;
  color: string;
  gradient: string;
  lightBg: string;
  icon: React.ElementType;
  description: string;
}

export const categoryConfig: Record<string, CategoryConfig> = {
  "pre-arrival": {
    label: "Pre-Arrival",
    color: "#FF6B35",
    gradient: "linear-gradient(135deg, #FF6B35 0%, #FF8E53 100%)",
    lightBg: "rgba(255, 107, 53, 0.08)",
    icon: Plane,
    description: "Prepare guests before they arrive",
  },
  arrival: {
    label: "Arrival",
    color: "#00B894",
    gradient: "linear-gradient(135deg, #00B894 0%, #00D9A5 100%)",
    lightBg: "rgba(0, 184, 148, 0.08)",
    icon: LogIn,
    description: "Welcome & check-in experience",
  },
  "in-stay": {
    label: "In-Stay",
    color: "#0984E3",
    gradient: "linear-gradient(135deg, #0984E3 0%, #74B9FF 100%)",
    lightBg: "rgba(9, 132, 227, 0.08)",
    icon: Home,
    description: "Enhance the guest experience",
  },
  "pre-departure": {
    label: "Pre-Departure",
    color: "#A855F7",
    gradient: "linear-gradient(135deg, #A855F7 0%, #C084FC 100%)",
    lightBg: "rgba(168, 85, 247, 0.08)",
    icon: LogOut,
    description: "Smooth checkout process",
  },
  "post-stay": {
    label: "Post-Stay",
    color: "#F59E0B",
    gradient: "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)",
    lightBg: "rgba(245, 158, 11, 0.08)",
    icon: Star,
    description: "Build lasting relationships",
  },
  "back-office": {
    label: "Back Office",
    color: "#64748B",
    gradient: "linear-gradient(135deg, #64748B 0%, #94A3B8 100%)",
    lightBg: "rgba(100, 116, 139, 0.08)",
    icon: Briefcase,
    description: "Operational excellence",
  },
};

export const categoryOrder = [
  "pre-arrival",
  "arrival",
  "in-stay",
  "pre-departure",
  "post-stay",
  "back-office",
];
