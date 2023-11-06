export default async function getUserPosts(userId: string) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?users=${userId}`
  )

  if (!res.ok) {
    return undefined
  }

  return res.json()
}
