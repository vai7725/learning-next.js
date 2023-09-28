'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function page() {
  const router = useRouter()
  const [token, setToken] = useState('')
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState(false)
  const verifyUserEmail = async () => {
    try {
      const res = await axios.post('/api/users/verifyemail', {
        token,
      })
      if (res?.data?.success) {
        setVerified(true)
      }
    } catch (error: any) {
      setError(true)
      console.log(error.response)
    }
  }

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail()
    }
  }, [token])

  useEffect(() => {
    const urlToken = window.location.search.split('=')[1]
    setToken(urlToken || '')
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify email</h1>
      <h2 className="p-2 bg-orange-500 text-black rounded">
        {token ? `${token}` : 'No token'}
      </h2>

      {verified && (
        <div>
          <h2 className="text-2xl">Email verified</h2>
          <Link href="/login" className="text-blue-500">
            Login
          </Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl bg-red-500 ">Error</h2>
        </div>
      )}
    </div>
  )
}
