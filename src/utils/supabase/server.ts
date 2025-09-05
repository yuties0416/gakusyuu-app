import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // The `cookies()` may not be readable when using Next.js Edge Runtime.
            // No cookies can be set here.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            ( cookieStore).set({ name, value: '', ...options })
          } catch (error) {
            // The `cookies()` may not be readable when using Next.js Edge Runtime.
            // No cookies can be set here.
          }
        },
      },
    }
  )
}