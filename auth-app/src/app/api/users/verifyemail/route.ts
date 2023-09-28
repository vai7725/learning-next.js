import { connect } from '@/config/config'
import { NextRequest, NextResponse } from 'next/server'
import User from '@/models/userModel'

connect()

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json()
    const { token } = reqBody
    console.log(token)

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    })

    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 })
    }
    user.isVerified = true
    user.verifyToken = undefined
    user.verifyTokenExpiry = undefined
    await user.save()
    console.log(user)
    return NextResponse.json(
      { message: 'Email verified successfully', success: true },
      { status: 200 }
    )
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
