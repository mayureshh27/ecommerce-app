import { Link } from 'react-router'
import { useFeaturedProducts } from '@/hooks/useApi'
import { ProductCard } from '@/components/product/ProductCard'

export function Home() {
  const { data: featuredProducts, isLoading, error } = useFeaturedProducts({
    page: 0,
    size: 20,
    sort: [],
  })

  return (
    <>
      <div 
        className="hero min-h-screen rounded-xl"
        style={{ 
          backgroundImage: 'url(/home/hero.webp)', 
          backgroundSize: 'cover' 
        }}
      >
        <div className="hero-overlay bg-opacity-20"></div>
        <div className="hero-content justify-start text-neutral-content w-full px-6 sm:px-8 lg:px-10">
          <div className="text-left">
            <h1 className="mb-5 text-3xl sm:text-5xl text-white font-bold">
              Ecommerce app
            </h1>
            <p className="mb-5 text-lg sm:text-2xl text-white">
              Check out our collection of products
            </p>
            <Link to="/products" className="btn btn-primary btn-lg">
              Shop collection
            </Link>
          </div>
        </div>
      </div>
      
      <div className="w-full my-10 md:my-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center my-8 sm:my-12">
          Featured products
        </h2>
        
        {isLoading && (
          <div className="flex w-full justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
        
        {error && (
          <div className="alert alert-error">
            <span>Error! Failed to load featured products, please try again.</span>
          </div>
        )}
        
        {featuredProducts && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
            {featuredProducts.content.map(product => (
              <ProductCard key={product.publicId} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}