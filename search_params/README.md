version - 1 

'use client'

import { useSearchParams } from "next/navigation"


export default function ProductPage() {
    const searchParams = useSearchParams()
    const search = searchParams.get('search')
    const category = searchParams.get('category')
    const page = searchParams.get('page')
    const sort = searchParams.get('sort')

  return (
    <div>
        <h1>product</h1>
        <p>Search - {search}</p>
        <p>Category - {category}</p>
        <p>Page - {page}</p>
        <p>Sort - {sort}</p>
    </div>
  )
}


-------------------------------------=-----------------------------------=-----------------------------=------------------