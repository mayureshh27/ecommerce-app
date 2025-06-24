import { Link } from 'react-router'
import { useCartDetails, useInitPayment } from '@/hooks/useApi'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'
import { useToastStore } from '@/stores/toast'
import { formatCurrency } from '@/lib/utils'

export function Cart() {
  const { items, updateQuantity, removeItem } = useCartStore()
  const { isAuthenticated } = useAuthStore()
  const addToast = useToastStore(state => state.addToast)
  
  const productIds = items.map(item => item.publicId)
  const { data: cartDetails, isLoading } = useCartDetails(productIds)
  const initPaymentMutation = useInitPayment()

  const handleQuantityChange = (publicId: string, newQuantity: number) => {
    updateQuantity(publicId, newQuantity)
  }

  const handleRemoveItem = (publicId: string) => {
    removeItem(publicId)
  }

  const calculateTotal = () => {
    if (!cartDetails) return 0
    return cartDetails.products.reduce((total, product) => {
      const cartItem = items.find(item => item.publicId === product.publicId)
      return total + (product.price * (cartItem?.quantity || 0))
    }, 0)
  }

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      addToast('Please login to checkout', 'error')
      return
    }

    try {
      const result = await initPaymentMutation.mutateAsync(items)
      // Redirect to Stripe checkout
      window.location.href = `https://checkout.stripe.com/pay/${result.id}`
    } catch (error) {
      addToast('Failed to initialize payment', 'error')
    }
  }

  if (isLoading) {
    return (
      <div className="flex w-full justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-60">
        <div className="font-bold text-2xl">No items in cart</div>
        <div>Add some items to your cart</div>
      </div>
    )
  }

  return (
    <>
      <div className="text-2xl mb-2">Shopping cart</div>
      <div className="flex flex-col lg:flex-row">
        <div className="flex-grow me-5 w-full">
          {cartDetails?.products.map(product => {
            const cartItem = items.find(item => item.publicId === product.publicId)
            if (!cartItem) return null

            return (
              <div key={product.publicId}>
                <div className="border-t border-gray-200"></div>
                <div className="flex items-center justify-between">
                  <div className="p-4 flex">
                    <img 
                      src={`data:${product.picture.mimeType};base64,${product.picture.file}`}
                      alt={product.name} 
                      width="110px" 
                      className="max-w-full lg:max-w-none me-5" 
                    />
                    <div className="w-40">
                      <Link to={`/product/${product.publicId}`}>{product.name}</Link>
                      <div className="text-sm">{product.brand}</div>
                      <div className="font-bold">{formatCurrency(product.price)}</div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-32 flex justify-around items-center">
                      <button 
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleQuantityChange(product.publicId, cartItem.quantity - 1)}
                        disabled={cartItem.quantity <= 1}
                      >
                        -
                      </button>
                      <div>{cartItem.quantity}</div>
                      <button 
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleQuantityChange(product.publicId, cartItem.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <div 
                      className="ms-5 btn btn-error btn-outline"
                      onClick={() => handleRemoveItem(product.publicId)}
                    >
                      Remove
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        
        <div className="bg-gray-100 border-gray-400 p-5 w-full lg:w-96 h-72 mt-6 lg:mt-0 rounded-md">
          <div className="font-bold">Order Summary</div>
          <div className="border-t border-gray-300 my-5"></div>
          <div className="flex justify-between">
            <div>Delivery</div>
            <div>{formatCurrency(0)}</div>
          </div>
          <div className="border-t border-gray-300 my-5"></div>
          <div className="flex justify-between font-bold">
            <div>Total</div>
            <div>{formatCurrency(calculateTotal())}</div>
          </div>
          <div className="border-t border-gray-300 my-5"></div>
          <button 
            className="btn btn-primary w-full"
            disabled={items.length === 0 || initPaymentMutation.isPending}
            onClick={handleCheckout}
          >
            {initPaymentMutation.isPending ? (
              <span className="loading loading-spinner"></span>
            ) : isAuthenticated ? (
              'Checkout'
            ) : (
              'Login to checkout'
            )}
          </button>
        </div>
      </div>
    </>
  )
}