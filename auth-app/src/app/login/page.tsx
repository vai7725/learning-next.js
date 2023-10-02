'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const router = useRouter()
  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const [buttonDisabled, setButotnDisabled] = useState(false)
  const [loading, setLoading] = useState(false)

  const onLogin = async (e: any) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await axios.post('/api/users/login', user)
      if (res.data.success) {
        toast.success(res?.data?.message)
        router.push('/profile')
      }
    } catch (error: any) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user.password.length > 0 && user.email.length > 0) {
      setButotnDisabled(false)
    } else {
      setButotnDisabled(true)
    }
  }, [user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <h1 className="text-3xl font-semibold text-indigo-700">
        {loading ? 'Processing' : 'Log in'}
      </h1>
      <form
        className="flex flex-col px-4 py-8 rounded-md my-2 bg-white shadow-md"
        onSubmit={onLogin}
      >
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm text-gray-600">
            Email
          </label>
          <input
            name="email"
            type="email"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="px-3 py-1 rounded-md my-2 border-[1px] outline-none focus:border-indigo-600 border-gray-400"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <label htmlFor="password" className="text-sm text-gray-600">
              Password
            </label>
            <Link
              href={'/resetpassword'}
              className="text-sm text-indigo-700 font-semibold "
            >
              Forgot password?
            </Link>
          </div>
          <input
            name="password"
            type="password"
            id="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="px-3 py-1 rounded-md my-2 border-[1px] outline-none focus:border-indigo-600 border-gray-400"
          />
        </div>
        <button
          type="submit"
          className={`${
            buttonDisabled
              ? 'bg-indigo-300 cursor-not-allowed'
              : 'bg-indigo-700 cursor-pointer'
          } text-white py-1 rounded-md my-2 text-sm font-semibold`}
        >
          Log in
        </button>
        <p className="text-sm text-center">
          Do not have an account?{' '}
          <Link href="/signup" className="text-indigo-600">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  )
}
