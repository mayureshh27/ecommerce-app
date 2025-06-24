import { useUserOrders } from '@/hooks/useApi'
import { OrderedItem } from '@/types'
import { formatCurrency } from '@/lib/utils'

export function UserOrders() {
  const { data: orders, isLoading, error } = useUserOrders({
    page: 0,
    size: 20,
    sort: [],
  })

  const computeItemsName = (items: OrderedItem[]) => {
    return items.map(item => item.name).join(', ')
  }

  const computeItemsQuantity = (items: OrderedItem[]) => {
    return items.reduce((acc, item) => acc + item.quantity, 0)
  }

  const computeTotal = (items: OrderedItem[]) => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  }

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
        <span>Error! Failed to load orders!</span>
      </div>
    )
  }

  return (
    <>
      <div className="w-full flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Your orders</h1>
          <div>Here's the list of your orders</div>
        </div>
      </div>
      <div className="border-t w-full border-solid border-gray-300 mt-2 mb-5"></div>
      
      {orders && orders.numberOfElements !== 0 ? (
        <div className="overflow-x-auto border border-gray-300 rounded-md">
          <table className="table table-lg table-zebra">
            <thead className="border-gray-300">
              <tr className="border-gray-300">
                <th></th>
                <th>Products</th>
                <th>Status</th>
                <th>Nb of items</th>
                <th>Total amount</th>
              </tr>
            </thead>
            <tbody className="border-0">
              {orders.content.map((order, index) => (
                <tr key={order.publicId} className="border-t-1 border-gray-300">
                  <th>{index}</th>
                  <td>{computeItemsName(order.orderedItems)}</td>
                  <td>{order.status}</td>
                  <td>{computeItemsQuantity(order.orderedItems)}</td>
                  <td>{formatCurrency(computeTotal(order.orderedItems))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-info">
          <span>No order created yet.</span>
        </div>
      )}
    </>
  )
}