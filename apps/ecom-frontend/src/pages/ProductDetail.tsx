import { useParams } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faCheck } from '@fortawesome/free-solid-svg-icons'
import { useProduct, useRelatedProducts } from '@/hooks/useApi'
import { useCartStore } from '@/stores/cart'
import { useToastStore } from '@/stores/toast'
import { ProductCard } from '@/components/product/ProductCard'
import { formatCurrency } from '@/lib/utils'
import { useState, useEffect } from 'react'

export function ProductDetail() {
  const { publicId } = useParams<{ publicId: string }>()
  const [isAdded, setIsAdded] = useState(false)
  
  const { data: product, isLoading, error } = useProduct(publicId!)
  const { data: relatedProducts } = useRelatedProducts(publicId!, {
    page: 0,
    size: 20,
    sort: [],
  })
  
  const addItem = useCartStore(state => state.addItem)
  const addToast = useToastStore(state => state.addToast)

  const handleAddToCart = () => {
    if (product) {
      addItem(product.publicId)
      setIsAdded(true)
      addToast('Product added to cart', 'success')
      
      setTimeout(() => {
        setIsAdded(false)
      }, 3000)
    }
  }

  if (isLoading) {
    return (
      <div className="flex w-full justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="alert alert-error">
        <span>Error! Failed to load product.</span>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center items-center w-full">
        <div className="lg:me-5">
          <img
            src={`data:${product.pictures[0].mimeType};base64,${product.pictures[0].file}`}
            alt={product.name}
            className="max-w-full lg:max-w-none"
            width="500px"
          />
        </div>
        <div className="w-full lg:w-auto">
          <h1 className="text-3xl font-bold">{product.name} - {product.size}</h1>
          {product.nbInStock > 0 ? (
            <div className="text-green-500 text-lg">In stock</div>
          ) : (
            <div className="text-red-500 text-lg">Out of stock</div>
          )}
          {product.featured && (
            <div className="rounded-md border w-32 p-2 text-center border-black my-5">
              Best seller
            </div>
          )}
          <div className="text-2xl my-5">
            <span className="line-through me-2">{formatCurrency(product.price + 200)}</span>
            <span className="me-2">{formatCurrency(product.price)}</span>
          </div>
          <div>Brand: <span className="font-bold">{product.brand}</span></div>
          <div className="flex items-center mt-1">
            <div className="me-1">Color:</div>
            <div 
              className="w-5 h-5 rounded-full" 
              style={{ backgroundColor: product.color }}
            ></div>
          </div>
          <div>Size: <span className="font-bold">{product.size}</span></div>
          <div className="my-5 w-96">
            <h2 className="text-xl font-bold">Description</h2>
            {product.description}
          </div>
          <button 
            className="btn btn-primary mt-5 w-full lg:w-64"
            disabled={product.nbInStock <= 0}
            onClick={handleAddToCart}
          >
            <FontAwesomeIcon 
              className="me-1" 
              icon={isAdded ? faCheck : faShoppingCart} 
            />
            {isAdded ? 'Added to cart' : 'Add to cart'}
          </button>
        </div>
      </div>
      
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-7 ms-4 sm:ms-0">Related products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 sm:gap-5">
          {relatedProducts?.content.map(product => (
            <ProductCard key={product.publicId} product={product} />
          ))}
        </div>
      </div>
    </>
  )
}