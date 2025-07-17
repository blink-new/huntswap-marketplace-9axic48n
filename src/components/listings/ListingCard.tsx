import { Heart, MapPin, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Listing } from '@/types'

interface ListingCardProps {
  listing: Listing
  onFavorite: (listingId: string) => void
  onClick: (listing: Listing) => void
  isFavorited?: boolean
}

export function ListingCard({ listing, onFavorite, onClick, isFavorited = false }: ListingCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    return date.toLocaleDateString()
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'New': return 'bg-green-100 text-green-800'
      case 'Like New': return 'bg-blue-100 text-blue-800'
      case 'Good': return 'bg-yellow-100 text-yellow-800'
      case 'Fair': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Card className="cursor-pointer item-card-hover overflow-hidden">
      <div className="relative">
        {/* Image */}
        <div 
          className="aspect-square bg-muted flex items-center justify-center"
          onClick={() => onClick(listing)}
        >
          {listing.images && listing.images.length > 0 ? (
            <img 
              src={listing.images[0]} 
              alt={listing.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-muted-foreground text-sm">No image</div>
          )}
        </div>
        
        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
          onClick={(e) => {
            e.stopPropagation()
            onFavorite(listing.id)
          }}
        >
          <Heart 
            className={`w-4 h-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
          />
        </Button>

        {/* Sold Badge */}
        {listing.isSold && (
          <Badge className="absolute top-2 left-2 bg-red-500 text-white">
            SOLD
          </Badge>
        )}
      </div>

      <CardContent className="p-4" onClick={() => onClick(listing)}>
        <div className="space-y-2">
          {/* Price */}
          <div className="text-xl font-bold text-primary">
            {formatPrice(listing.price)}
          </div>
          
          {/* Title */}
          <h3 className="font-medium text-foreground line-clamp-2 leading-tight">
            {listing.title}
          </h3>
          
          {/* Condition */}
          <Badge variant="secondary" className={getConditionColor(listing.condition)}>
            {listing.condition}
          </Badge>
          
          {/* Location and Time */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            {listing.location && (
              <div className="flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                <span className="truncate">{listing.location}</span>
              </div>
            )}
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              <span>{formatTimeAgo(listing.createdAt)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}