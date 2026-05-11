import { DivideIcon as LucideIcon } from 'lucide-react';

export type Category =
  | "reservation-agent"
  | "pre-arrival"
  | "arrival"
  | "in-stay"
  | "departure"
  | "post-stay"
  | "back-office";

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
  schema_name?: string;
  voice_provider?: "snowie" | "ravan";
  category?: Category;
  imageAlt?: string;
}
