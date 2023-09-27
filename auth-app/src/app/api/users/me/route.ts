import { getTokenData } from '@/helpers/getTokenData'

import { NextRequest, NextResponse } from 'next/server'
import User from '@/models/userModel'
import { connect } from '@/config/config'

connect()

export async function GET(req: NextRequest) {
  try {
    const userId = await getTokenData(req)
    const user = await User.findById(userId).select('-password')
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      )
    }
    return NextResponse.json({ success: true, user }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
