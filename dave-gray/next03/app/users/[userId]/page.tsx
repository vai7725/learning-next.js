import getUser from '@/lib/getUser'
import { Suspense } from 'react'
import UserPosts from './components/UserPosts'
import getUserPosts from '@/lib/getUserPosts'
import { Metadata } from 'next'
import getAllUsers from '@/lib/getAllUsers'
import { notFound } from 'next/navigation'

type Params = {
  params: {
    userId: string
  }
}

export async function generateMetadata({
  params: { userId },
}: Params): Promise<Metadata> {
  const userData: Promise<User> = getUser(userId)
  const user: User = await userData
  return {
    title: user?.name,
    description: `This is the page of ${user?.name}`,
  }
}

export default async function UserPage({ params: { userId } }: Params) {
  const userData: Promise<User> = getUser(userId)
  const userPostsData: Promise<Post[]> = getUserPosts(userId)

  // const [user, userPosts] = await Promise.all([userData,userPostsData])

  const user = await userData

  if (!user) return notFound()

  return (
    <>
      <h1>{user.name}</h1>
      <br />
      <Suspense fallback={<h2>Loading...</h2>}>
        <UserPosts promise={userPostsData} />
      </Suspense>
    </>
  )
}

// working for SSG pages
export async function generateStaticParams() {
  const usersData: Promise<User[]> = getAllUsers()
  const users = await usersData
  return users.map((user) => ({
    userId: user.id.toString(),
  }))
}
