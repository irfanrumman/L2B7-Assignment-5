

import Link from 'next/link'
import LoginForm from '../_components/LoginForm'
import { Suspense } from 'react'


export default function LoginPage() {

  

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md rounded-lg border border-border bg-card p-8 shadow-sm">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
          <p className="text-muted-foreground">Log in to your RentNest account</p>
        </div>
        
         <Suspense fallback={<div className="text-center text-muted-foreground">Loading...</div>}>
          <LoginForm />
        </Suspense>
        {/* Form
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          {/* <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-semibold text-foreground">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
            />
          </div> */}

          {/* Password */}
          {/* <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="font-semibold text-foreground">
                Password
              </label> */}
              {/* <Link href="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link> */}
            {/* </div>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div> */}

          {/* Submit Button */}
          {/* <button
            type="submit"
            className="w-full rounded-lg bg-primary px-4 py-3 font-semibold text-primary-foreground hover:opacity-90 transition"
          >
            Login
          </button>
        </form> */} 

        {/* Sign Up Link */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-semibold text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
