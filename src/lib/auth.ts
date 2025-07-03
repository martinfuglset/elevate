// Mock authentication system for the template
// Replace this with your preferred authentication solution when building a real app

import { getSupabase } from './db'

export interface AuthUser {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

// Mock user storage (in a real app, this would be in a database)
const mockUsers = [
  {
    id: '1',
    email: 'demo@example.com',
    full_name: 'Demo User',
    avatar_url: undefined,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
]

let currentUser: AuthUser | null = null

export async function signUp(email: string, password: string, fullName: string) {
  // If Supabase is configured, use it
  const supabase = await getSupabase()
  if (supabase) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })

      if (error) {
        throw new Error(error.message)
      }

      return { user: data.user, session: data.session }
    } catch (error) {
      throw new Error('Authentication service not available')
    }
  }

  // Mock implementation
  const newUser: AuthUser = {
    id: Date.now().toString(),
    email,
    full_name: fullName,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
  
  currentUser = newUser
  return { user: newUser, session: { user: newUser } }
}

export async function signIn(email: string, password: string) {
  // If Supabase is configured, use it
  const supabase = await getSupabase()
  if (supabase) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw new Error(error.message)
      }

      return { user: data.user, session: data.session }
    } catch (error) {
      throw new Error('Authentication service not available')
    }
  }

  // Mock implementation - allow demo user or any email with any password
  const mockUser = mockUsers.find(user => user.email === email) || {
    id: Date.now().toString(),
    email,
    full_name: email.split('@')[0],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
  
  currentUser = mockUser
  return { user: mockUser, session: { user: mockUser } }
}

export async function signOut() {
  // If Supabase is configured, use it
  const supabase = await getSupabase()
  if (supabase) {
    try {
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        throw new Error(error.message)
      }
    } catch (error) {
      throw new Error('Authentication service not available')
    }
  }

  // Mock implementation
  currentUser = null
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  // If Supabase is configured, use it
  const supabase = await getSupabase()
  if (supabase) {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      return user ? convertUser(user) : null
    } catch (error) {
      return currentUser
    }
  }

  // Mock implementation
  return currentUser
}

export async function updateProfile(updates: { full_name?: string; avatar_url?: string }) {
  // If Supabase is configured, use it
  const supabase = await getSupabase()
  if (supabase) {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: updates,
      })

      if (error) {
        throw new Error(error.message)
      }

      return { user: data.user }
    } catch (error) {
      throw new Error('Authentication service not available')
    }
  }

  // Mock implementation
  if (currentUser) {
    currentUser = { ...currentUser, ...updates, updated_at: new Date().toISOString() }
    return { user: currentUser }
  }
  
  throw new Error('No user logged in')
}

export async function resetPassword(email: string) {
  // If Supabase is configured, use it
  const supabase = await getSupabase()
  if (supabase) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) {
        throw new Error(error.message)
      }
    } catch (error) {
      throw new Error('Authentication service not available')
    }
  }

  // Mock implementation - just return success
  console.log(`Password reset email would be sent to ${email}`)
}

// Helper function to convert Supabase User to AuthUser
export function convertUser(user: any): AuthUser | null {
  if (!user) return null

  return {
    id: user.id,
    email: user.email || '',
    full_name: user.user_metadata?.full_name,
    avatar_url: user.user_metadata?.avatar_url,
    created_at: user.created_at,
    updated_at: user.updated_at || user.created_at,
  }
} 