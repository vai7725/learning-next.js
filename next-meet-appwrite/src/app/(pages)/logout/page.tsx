'use client'

import React, { useEffect } from 'react'
import useAuth from '@/context/useAuth'
import { useRouter } from 'next/navigation'
import Login from '@/components/Login'
import appwriteService from '@/appwrite/config'

const page = () => {
  const router = useRouter()
  const { setAuthStatus } = useAuth()

  useEffect(() => {
    appwriteService.logout().then(() => {
      setAuthStatus(false)
      router.replace('/')
    })
  }, [])

  return <></>
}

export default page
