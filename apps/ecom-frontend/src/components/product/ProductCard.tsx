import { Link } from 'react-router'
import { Product } from '@/types'
import { formatCurrency } from '@/lib/utils'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link 
      to={`/product/${product.publicId}`}
      className="flex justify-start cursor-pointer"
    >
      <div className="flex flex-col justify-center rounded-xl w-full min-h-[400px] h-full shadow-xl">
        <figure className="flex justify-center items-center h-full">
          <img 
            src={`data:${product.pictures[0].mimeType};base64,${product.pictures[0].file}`}
            alt={product.name} 
            width="250px"
          />
        </figure>
        <div className="p-5 justify-end">
          <div className="text-sm">{product.brand}</div>
          <h2 className="card-title w-full truncate">
            <div className="truncate">{product.name} - {product.size}</div>
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <div>
            <span className="line-through me-2">{formatCurrency(product.price + 200)}</span>
            <span className="me-2">{formatCurrency(product.price)}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}