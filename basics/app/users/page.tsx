interface User {
  id: number
  name: string
}

export default async function UsersPage() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users', {
    next: { revalidate: 10 },
  })
  const users: User[] = await res.json()

  return (
    <>
      <h1>Users</h1>
      <p>{new Date().toLocaleTimeString()}</p>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </>
  )
}
