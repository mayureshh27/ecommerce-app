import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiService } from '@/services/api'
import { Pagination, ProductFilter } from '@/types'

// Products
export const useFeaturedProducts = (pagination: Pagination) => {
  return useQuery({
    queryKey: ['featured-products', pagination],
    queryFn: () => apiService.getFeaturedProducts(pagination),
  })
}

export const useProduct = (publicId: string) => {
  return useQuery({
    queryKey: ['product', publicId],
    queryFn: () => apiService.getProduct(publicId),
    enabled: !!publicId,
  })
}

export const useRelatedProducts = (publicId: string, pagination: Pagination) => {
  return useQuery({
    queryKey: ['related-products', publicId, pagination],
    queryFn: () => apiService.getRelatedProducts(publicId, pagination),
    enabled: !!publicId,
  })
}

export const useFilteredProducts = (pagination: Pagination, filter: ProductFilter) => {
  return useQuery({
    queryKey: ['filtered-products', pagination, filter],
    queryFn: () => apiService.filterProducts(pagination, filter),
  })
}

// Categories
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => apiService.getCategories(),
  })
}

// Cart
export const useCartDetails = (productIds: string[]) => {
  return useQuery({
    queryKey: ['cart-details', productIds],
    queryFn: () => apiService.getCartDetails(productIds),
    enabled: productIds.length > 0,
  })
}

export const useInitPayment = () => {
  return useMutation({
    mutationFn: apiService.initPayment,
  })
}

// Orders
export const useUserOrders = (pagination: Pagination) => {
  return useQuery({
    queryKey: ['user-orders', pagination],
    queryFn: () => apiService.getUserOrders(pagination),
  })
}

export const useAdminOrders = (pagination: Pagination) => {
  return useQuery({
    queryKey: ['admin-orders', pagination],
    queryFn: () => apiService.getAdminOrders(pagination),
  })
}

// Auth
export const useAuthenticatedUser = (forceResync = false) => {
  return useQuery({
    queryKey: ['authenticated-user', forceResync],
    queryFn: () => apiService.getAuthenticatedUser(forceResync),
  })
}