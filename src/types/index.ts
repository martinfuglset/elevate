// User types
export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

// Subscription types
export interface Subscription {
  id: string
  user_id: string
  stripe_customer_id?: string
  stripe_subscription_id?: string
  status: 'active' | 'canceled' | 'past_due' | 'unpaid'
  plan_type: 'free' | 'pro' | 'enterprise'
  created_at: string
  updated_at: string
}

// Navigation types
export interface NavigationItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
}

// API Response types
export interface ApiResponse<T> {
  data: T
  error?: string
  message?: string
}

// Form types
export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm {
  email: string
  password: string
  full_name: string
}

// Dashboard stats
export interface DashboardStats {
  totalUsers: number
  revenue: number
  activeUsers: number
  growth: number
} 