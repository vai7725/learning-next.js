import { connect } from '@/config/config'
import { NextRequest, NextResponse } from 'next/server'
import User from '@/models/userModel'
import bcrypt from 'bcryptjs'

connect()

export async function POST(req: NextRequest) {
  const { token, password } = await req.json()
  if (!password) {
    return NextResponse.json(
      {
        success: false,
        message: 'Please provide password',
      },
      {
        status: 400,
      }
    )
  }
  try {
    const user: any = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    })

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'Token is invalid or expired',
        },
        {
          status: 404,
        }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    user.password = hashedPassword
    user.forgotPasswordTokenExpiry = undefined
    user.forgotPasswordToken = undefined
    await user.save()
    return NextResponse.json(
      {
        success: true,
        message: 'Password changed successfully',
      },
      {
        status: 200,
      }
    )
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
