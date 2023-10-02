'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function Reset_Password() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [buttonDisabled, setButotnDisabled] = useState(false)
  const [token, setToken] = useState('')

  useEffect(() => {
    if (password.length > 0) {
      setButotnDisabled(false)
    } else {
      setButotnDisabled(true)
    }
  }, [password])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/users/resetpassword', {
        token,
        password,
      })
      if (data?.success) {
        toast.success(data?.message)
        router.push('/login')
      }
    } catch (error: any) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    setToken(window.location.search.split('=')[1] || '')
  }, [])

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center min-h-screen  bg-gray-100"
    >
      <h1 className="font-bold text-3xl text-indigo-700">Set new password</h1>
      <div className="flex flex-col my-6 shadow-md p-4 border-2 border-solid rounded bg-white">
        <label htmlFor="password">New password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="px-3 py-1 rounded-md my-2 border-[1px] outline-none focus:border-indigo-600 border-gray-400"
        />
        <button
          type="submit"
          className={`${
            buttonDisabled
              ? 'bg-indigo-300 cursor-not-allowed'
              : 'bg-indigo-700 cursor-pointer'
          } text-white py-1 rounded-md my-2 text-sm font-semibold`}
        >
          Reset
        </button>
      </div>
    </form>
  )
}
