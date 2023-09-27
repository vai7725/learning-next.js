import { connect } from '@/config/config'
import { NextResponse } from 'next/server'

connect()

export async function GET() {
  try {
    const res = NextResponse.json({
      message: 'Log out successfully',
      success: true,
    })
    res.cookies.set('token', '', {
      httpOnly: true,
      expires: new Date(0),
    })

    return res
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
