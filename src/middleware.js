import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(req) {

  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res }, { cookieOptions: {domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN, path: "/"} })
  await supabase.auth.getSession()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if(!user) {
    return NextResponse.redirect(new URL(process.env.NEXT_PUBLIC_AUTH_DOMAIN+'?redirect_url='+process.env.NEXT_PUBLIC_REDIRECT_DOMAIN+'/home'))
  }

  if(user) {
    return res
  }

}

export const config = {
  matcher: ['/'],
}
