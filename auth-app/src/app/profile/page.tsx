'use client'
import axios from 'axios'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function UserProfile({ params }: any) {
  const router = useRouter()
  const [user, setUser] = useState({})
  const logOut = async () => {
    try {
      const res = await axios.get('/api/users/logout')
      if (res?.data?.success) {
        toast.success(res?.data?.message)
        router.push('/login')
      }
    } catch (error: any) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const getUserDetails = async () => {
    const res = await axios.get('/api/users/me')
    setUser(res.data.user)
  }

  useEffect(() => {
    getUserDetails()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Profile</h1>
      <hr />
      <p className="text-xl">
        <span className="p-2 text-indigo-600">Username:</span>
        {user?.username}
      </p>
      <p className="text-xl">
        <span className="p-2 text-indigo-600">Email:</span>
        {user?.email}
      </p>

      <button
        onClick={logOut}
        className="bg-indigo-500 mt-4 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded"
      >
        Log out
      </button>
    </div>
  )
}
