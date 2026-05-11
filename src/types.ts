import { DivideIcon as LucideIcon } from 'lucide-react';

export type Category =
  | "pre-arrival"
  | "arrival"
  | "in-stay"
  | "departure"
  | "post-stay"
  | "back-office";

export type Provider = 'snowie' | 'ravan';


export interface CardInterface {
  id: string | number;
  title: string;
  description: string;
  imageUrl: string;
  icon: typeof LucideIcon;
  route: string;
  tags?: string[];
  link?: string;
  category?: Category;

  
  // Snowie provider fields (existing)
  agent_code?: string;
  schema_name?: string;
  
  // === Ravan provider fields ===
  agent_id?: string;
  from_phone_number?: string;
  to_phone_number?: string;
  prompt_dynamic_variables?: Record<string, any>;
  metadata?: Record<string, any>;
    
  // Provider selector (defaults to 'snowie' for backward compatibility)
  provider?: 'snowie' | 'ravan';
}