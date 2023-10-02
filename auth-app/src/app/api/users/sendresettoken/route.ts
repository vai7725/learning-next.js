import { connect } from '@/config/config'
import { NextRequest, NextResponse } from 'next/server'
import User from '@/models/userModel'
import { sendEmail } from '@/helpers/mailer'

connect()

export async function POST(req: NextRequest) {
  const { email } = await req.json()
  try {
    const user: any = await User.findOne({ email })
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      )
    }

    await sendEmail({ email: user.email, emailType: 'RESET', userId: user._id })
    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    )
  }
}
