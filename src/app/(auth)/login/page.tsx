'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CircleDot } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { CustomButton } from '@/components/ui/custom-button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { signIn } from '@/lib/auth'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (!email || !password) {
        throw new Error('Please enter both email and password.')
      }

      // Use the mock authentication
      await signIn(email, password)
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="hidden bg-muted lg:flex lg:flex-col lg:justify-between p-8">
        <div className="flex items-center gap-2 text-lg">
          <CircleDot className="h-5 w-5" />
          Elevate
        </div>
        <blockquote className="text-lg">
          "This library has saved me countless hours of work and helped me
          deliver stunning designs to my clients faster than ever before."
          <footer className="text-base text-muted-foreground mt-4">
            - Sofia Davis
          </footer>
        </blockquote>
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-medium">Log in</h1>
            <p className="text-balance text-muted-foreground">
              Enter your credentials below to log in to your account
            </p>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="grid gap-2">
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <CustomButton type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </CustomButton>
          </form>
          <div className="mt-4 text-center text-sm">
            <p className="text-muted-foreground">
              Demo credentials: demo@example.com / any password
            </p>
          </div>
          <div className="mt-4 text-center text-sm">
            <p className="text-muted-foreground">
              By clicking continue, you agree to our{' '}
              <Link
                href="/terms-of-service"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href="/privacy-policy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 