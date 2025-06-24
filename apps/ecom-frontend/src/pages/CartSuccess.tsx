import { useEffect } from 'react'
import { useSearchParams } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import { useCartStore } from '@/stores/cart'

export function CartSuccess() {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const clearCart = useCartStore(state => state.clearCart)

  useEffect(() => {
    // Verify session and clear cart
    const storedSessionId = localStorage.getItem('stripe-session-id')
    if (sessionId && sessionId === storedSessionId) {
      clearCart()
      localStorage.removeItem('stripe-session-id')
    }
  }, [sessionId, clearCart])

  const isValidAccess = sessionId && localStorage.getItem('stripe-session-id') === sessionId

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      {isValidAccess ? (
        <>
          <FontAwesomeIcon className="text-green-600" icon={faCircleCheck} size="5x" />
          <div className="font-bold text-2xl">Thanks for your order</div>
          <div>You will receive a confirmation email shortly</div>
        </>
      ) : (
        <>
          <div className="font-bold text-2xl">Invalid cart session</div>
          <div>Please try again</div>
        </>
      )}
    </div>
  )
}