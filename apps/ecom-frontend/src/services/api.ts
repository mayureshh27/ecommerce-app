import { environment } from '@/environments/environment'
import { 
  Product, 
  ProductCategory, 
  ConnectedUser, 
  Cart, 
  CartItem, 
  UserOrderDetail, 
  AdminOrderDetail,
  Page,
  Pagination,
  ProductFilter
} from '@/types'

class ApiService {
  private baseUrl = environment.apiUrl

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  private createPaginationParams(pagination: Pagination): URLSearchParams {
    const params = new URLSearchParams()
    params.append('page', pagination.page.toString())
    params.append('size', pagination.size.toString())
    pagination.sort.forEach(sort => params.append('sort', sort))
    return params
  }

  // Products
  async getFeaturedProducts(pagination: Pagination): Promise<Page<Product>> {
    const params = this.createPaginationParams(pagination)
    return this.request(`/products-shop/featured?${params}`)
  }

  async getProduct(publicId: string): Promise<Product> {
    return this.request(`/products-shop/find-one?publicId=${publicId}`)
  }

  async getRelatedProducts(publicId: string, pagination: Pagination): Promise<Page<Product>> {
    const params = this.createPaginationParams(pagination)
    params.append('publicId', publicId)
    return this.request(`/products-shop/related?${params}`)
  }

  async filterProducts(pagination: Pagination, filter: ProductFilter): Promise<Page<Product>> {
    const params = this.createPaginationParams(pagination)
    if (filter.category) params.append('categoryId', filter.category)
    if (filter.size) params.append('productSizes', filter.size)
    return this.request(`/products-shop/filter?${params}`)
  }

  // Categories
  async getCategories(): Promise<Page<ProductCategory>> {
    return this.request('/categories')
  }

  // Cart
  async getCartDetails(productIds: string[]): Promise<Cart> {
    const params = productIds.join(',')
    return this.request(`/orders/get-cart-details?productIds=${params}`)
  }

  async initPayment(items: CartItem[]): Promise<{ id: string }> {
    return this.request('/orders/init-payment', {
      method: 'POST',
      body: JSON.stringify(items),
    })
  }

  // Orders
  async getUserOrders(pagination: Pagination): Promise<Page<UserOrderDetail>> {
    const params = this.createPaginationParams(pagination)
    return this.request(`/orders/user?${params}`)
  }

  async getAdminOrders(pagination: Pagination): Promise<Page<AdminOrderDetail>> {
    const params = this.createPaginationParams(pagination)
    return this.request(`/orders/admin?${params}`)
  }

  // Auth
  async getAuthenticatedUser(forceResync = false): Promise<ConnectedUser> {
    return this.request(`/users/authenticated?forceResync=${forceResync}`)
  }
}

export const apiService = new ApiService()