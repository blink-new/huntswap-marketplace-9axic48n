export interface Listing {
  id: string
  userId: string
  title: string
  description?: string
  price: number
  category: string
  condition: 'New' | 'Like New' | 'Good' | 'Fair'
  location?: string
  images: string[]
  isSold: boolean
  createdAt: string
  updatedAt: string
}

export interface Message {
  id: string
  listingId: string
  senderId: string
  receiverId: string
  message: string
  createdAt: string
}

export interface UserProfile {
  id: string
  userId: string
  displayName?: string
  avatarUrl?: string
  location?: string
  bio?: string
  rating: number
  totalRatings: number
  createdAt: string
  updatedAt: string
}

export interface Favorite {
  id: string
  userId: string
  listingId: string
  createdAt: string
}

export const CATEGORIES = [
  'Rifles',
  'Shotguns',
  'Handguns',
  'Bows & Crossbows',
  'Optics & Scopes',
  'Ammunition',
  'Hunting Clothing',
  'Boots & Footwear',
  'Backpacks & Bags',
  'Knives & Tools',
  'Tree Stands',
  'Decoys & Calls',
  'Other'
] as const

export type Category = typeof CATEGORIES[number]