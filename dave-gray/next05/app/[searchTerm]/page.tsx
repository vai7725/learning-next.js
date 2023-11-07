import getWikiResults from '@/lib/getWikiResults'
import { Suspense } from 'react'
import Item from './components/Item'

type Props = {
  params: {
    searchTerm: string
  }
}

export async function generateMetadata({ params: { searchTerm } }: Props) {
  const wikiData: Promise<SearchResult> = getWikiResults(searchTerm)
  const data = await wikiData
  const displayTerm = searchTerm.replaceAll('%20', ' ')

  if (!data?.query?.pages) {
    return {
      title: `${displayTerm} Not fount`,
    }
  }

  return {
    title: displayTerm,
    description: `Search result for ${displayTerm}`,
  }
}

export default async function SearchResults({ params: { searchTerm } }: Props) {
  const wikiData: Promise<SearchResult> = getWikiResults(searchTerm)
  const data = await wikiData
  const result: Result[] | undefined = data?.query?.pages

  return (
    <main className="bg-slate-200 mx-auto max-w-lg py-1 min-h-screen">
      {result ? (
        Object.values(result).map((result) => (
          <Item key={result.pageid} result={result} />
        ))
      ) : (
        <h2 className="p-2 text-xl">{`"${searchTerm.replaceAll(
          '%20',
          ' '
        )}" - Not found`}</h2>
      )}
    </main>
  )
}
