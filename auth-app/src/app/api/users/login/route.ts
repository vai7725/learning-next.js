import { connect } from '@/config/config'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const { email, password } = reqBody
    console.log(reqBody)

    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json(
        { message: 'User does not exist' },
        { status: 404 }
      )
    }

    const validPassword = await bcryptjs.compare(password, user.password)
    if (!validPassword) {
      return NextResponse.json(
        { message: 'Incorrect password' },
        { status: 400 }
      )
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    }

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: '1d',
    })

    const res = NextResponse.json({
      success: true,
      message: 'Login successfull',
    })
    res.cookies.set('token', token, {
      httpOnly: true,
    })
    return res
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
