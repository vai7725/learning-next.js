import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'
import { NextResponse } from 'next/server'

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10)

    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      })
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      })
    }

    const transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASS,
      },
    })

    const mailOptions = {
      from: 'vaibhav@gmail.com',
      to: email,
      subject:
        emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
      html: `
            <p> Click <a href="${process.env.DOMAIN}/${
        emailType === 'VERIFY' ? 'verifyemail' : 'reset-password'
      }?token=${hashedToken}">here</a> to ${
        emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password'
      } </p>
        `,
    }

    const mailResponse = await transporter.sendMail(mailOptions)
    return mailResponse
  } catch (error: any) {
    throw new Error(error.message)
  }
}
