'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function LoginPage() {
  const [user, setUser] = useState({
    email: '',
    password: '',
    username: '',
  })

  const onLogin = async () => {}

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <h1 className="text-3xl font-semibold text-indigo-700">Log in</h1>
      <form className="flex flex-col px-4 py-8 rounded-md my-2 bg-white shadow-md">
        <div className="flex flex-col">
          <label htmlFor="username" className="text-sm text-gray-600">
            Username
          </label>
          <input
            name="username"
            type="text"
            id="username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            className="px-3 py-1 rounded-md my-2 border-[1px] outline-none focus:border-indigo-600 border-gray-400"
          />
        </div>
        {/* <div className="flex flex-col">
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
        </div> */}
        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm text-gray-600">
            Password
          </label>
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
          className="bg-indigo-700 text-white py-1 rounded-md my-2 text-sm font-semibold"
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
