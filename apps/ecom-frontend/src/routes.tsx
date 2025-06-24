import { RouteObject } from 'react-router'
import { Layout } from '@/components/layout/Layout'
import { Home } from '@/pages/Home'
import { Products } from '@/pages/Products'
import { ProductDetail } from '@/pages/ProductDetail'
import { Cart } from '@/pages/Cart'
import { CartSuccess } from '@/pages/CartSuccess'
import { UserOrders } from '@/pages/UserOrders'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'products',
        element: <Products />,
      },
      {
        path: 'product/:publicId',
        element: <ProductDetail />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'cart/success',
        element: <CartSuccess />,
      },
      {
        path: 'users/orders',
        element: <UserOrders />,
      },
    ],
  },
]