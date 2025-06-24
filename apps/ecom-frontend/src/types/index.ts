import { z } from 'zod'

// Product types
export const ProductSizeSchema = z.enum(['XS', 'S', 'M', 'L', 'XL', 'XXL'])
export type ProductSize = z.infer<typeof ProductSizeSchema>

export const ProductCategorySchema = z.object({
  publicId: z.string().optional(),
  name: z.string().optional(),
})
export type ProductCategory = z.infer<typeof ProductCategorySchema>

export const ProductPictureSchema = z.object({
  file: z.string(),
  mimeType: z.string(),
})
export type ProductPicture = z.infer<typeof ProductPictureSchema>

export const ProductSchema = z.object({
  publicId: z.string(),
  brand: z.string(),
  color: z.string(),
  description: z.string(),
  name: z.string(),
  price: z.number(),
  size: ProductSizeSchema,
  category: ProductCategorySchema,
  featured: z.boolean(),
  pictures: z.array(ProductPictureSchema),
  nbInStock: z.number(),
})
export type Product = z.infer<typeof ProductSchema>

// User types
export const ConnectedUserSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
  imageUrl: z.string().optional(),
  publicId: z.string().optional(),
  authorities: z.array(z.string()).optional(),
})
export type ConnectedUser = z.infer<typeof ConnectedUserSchema>

// Cart types
export const CartItemSchema = z.object({
  publicId: z.string(),
  quantity: z.number(),
})
export type CartItem = z.infer<typeof CartItemSchema>

export const CartItemDetailSchema = z.object({
  name: z.string(),
  price: z.number(),
  brand: z.string(),
  picture: ProductPictureSchema,
  quantity: z.number(),
  publicId: z.string(),
})
export type CartItemDetail = z.infer<typeof CartItemDetailSchema>

export const CartSchema = z.object({
  products: z.array(CartItemDetailSchema),
})
export type Cart = z.infer<typeof CartSchema>

// Order types
export const OrderStatusSchema = z.enum(['PENDING', 'PAID'])
export type OrderStatus = z.infer<typeof OrderStatusSchema>

export const OrderedItemSchema = z.object({
  name: z.string(),
  quantity: z.number(),
  price: z.number(),
})
export type OrderedItem = z.infer<typeof OrderedItemSchema>

export const UserOrderDetailSchema = z.object({
  publicId: z.string(),
  status: OrderStatusSchema,
  orderedItems: z.array(OrderedItemSchema),
})
export type UserOrderDetail = z.infer<typeof UserOrderDetailSchema>

export const AdminOrderDetailSchema = z.object({
  publicId: z.string(),
  status: OrderStatusSchema,
  email: z.string(),
  address: z.string(),
  orderedItems: z.array(OrderedItemSchema),
})
export type AdminOrderDetail = z.infer<typeof AdminOrderDetailSchema>

// API Response types
export const PageSchema = <T extends z.ZodTypeAny>(itemSchema: T) => z.object({
  content: z.array(itemSchema),
  totalElements: z.number(),
  totalPages: z.number(),
  size: z.number(),
  number: z.number(),
  numberOfElements: z.number(),
  first: z.boolean(),
  last: z.boolean(),
  empty: z.boolean(),
})

export type Page<T> = {
  content: T[]
  totalElements: number
  totalPages: number
  size: number
  number: number
  numberOfElements: number
  first: boolean
  last: boolean
  empty: boolean
}

export interface Pagination {
  page: number
  size: number
  sort: string[]
}

export interface ProductFilter {
  size?: string
  category?: string | null
  sort: string[]
}