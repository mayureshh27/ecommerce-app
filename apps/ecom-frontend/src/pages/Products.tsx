import { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import { useFilteredProducts } from '@/hooks/useApi'
import { ProductCard } from '@/components/product/ProductCard'
import { ProductFilter } from '@/types'

export function Products() {
  const location = useLocation()
  const [filter, setFilter] = useState<ProductFilter>({
    category: location.state?.category || null,
    size: '',
    sort: ['createdDate,desc'],
  })

  const { data: products, isLoading, error } = useFilteredProducts(
    { page: 0, size: 20, sort: filter.sort },
    filter
  )

  if (isLoading) {
    return (
      <div className="flex w-full justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <span>Error! Failed to load products, please try again</span>
      </div>
    )
  }

  if (products?.content.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="font-bold text-2xl">No results found</div>
        <div>Try to change your filters</div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products?.content.map(product => (
        <ProductCard key={product.publicId} product={product} />
      ))}
    </div>
  )
}