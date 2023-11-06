export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <nav>About navbar</nav>
      <main>{children}</main>
    </>
  )
}
