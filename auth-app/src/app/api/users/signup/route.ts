import { connect } from '@/config/config'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/helpers/mailer'

connect()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const { username, email, password } = reqBody

    const userExists = await User.findOne({ email })
    if (userExists) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    })
    const savedUser = await user.save()

    await sendEmail({ email, emailType: 'VERIFY', userId: user._id })

    return NextResponse.json({
      message: 'User created successfully',
      success: true,
      savedUser,
    })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
