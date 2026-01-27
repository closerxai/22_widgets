```typescript
import { DivideIcon as LucideIcon } from 'lucide-react';

export type Category = 
  // Timeline Categories (Legacy/Backup)
  | "pre-arrival"
  | "arrival"
  | "in-stay"
  | "departure"
  | "post-stay"
  | "back-office"
  // Departmental Categories (New)
  | "reservation-agent"
  | "food-beverage"
  | "travel-agent"
  | "guest-services"
  | "outbound-ai";

export interface CardInterface {
  id: string | number;
  title: string;
  description: string;
  imageUrl: string;
  icon: typeof LucideIcon;
  route: string;
  tags?: string[];
  link?: string;
  agent_code: string;
  category?: Category;
}