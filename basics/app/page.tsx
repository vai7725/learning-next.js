import Link from 'next/link'
import ProductCard from './components/ProductCard'

export default function Home() {
  return (
    <main>
      <h1>Hello world</h1>
      <div>
        <Link href={'/'}>Home</Link>
        <Link href={'/users'}>Users</Link>
        <ProductCard />
      </div>
    </main>
  )
}
