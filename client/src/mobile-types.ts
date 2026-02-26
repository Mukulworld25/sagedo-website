
export interface User {
  name: string;
  email: string;
  plan: 'Free' | 'Pro' | 'Enterprise';
  walletBalance: number;
  stats: {
    documents: number;
    streak: number;
    words: number;
  };
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'order' | 'promo' | 'system';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  image?: string; 
  timestamp: Date;
  isError?: boolean;
  groundingMetadata?: any;
}

export enum AppRoute {
  ONBOARDING = 'onboarding',
  HOME = 'home',
  SERVICES = 'services',
  PLACE_ORDER = 'place_order',
  TRACK = 'track',
  PROFILE = 'profile',
  CHAT = 'chat',
  TOOL_ASSIGNMENT = 'tool_assignment',
  TOOL_IMAGE_EDITOR = 'tool_image_editor',
  NOTIFICATIONS = 'notifications'
}

export interface AssignmentParams {
  topic: string;
  subject: string;
  level: string;
  words: number;
  tone: string;
  instructions: string;
}

export type ChatMode = 'standard' | 'thinking' | 'search' | 'maps';
