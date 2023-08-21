import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res }, { cookieOptions: {domain: "automatearmy.com", path: "/"} })
  await supabase.auth.getSession()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  console.log("User in middleware: ")
  console.dir(user) 

  if(!user) {
    return NextResponse.redirect(new URL('https://auth.automatearmy.com/?redirect_url=https://a.automatearmy.com'))
  }

}
