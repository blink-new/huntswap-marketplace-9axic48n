import { useState } from 'react'
import { ArrowLeft, Heart, MapPin, Clock, User, MessageCircle, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Listing } from '@/types'

interface ListingDetailsProps {
  listing: Listing
  onBack: () => void
  onFavorite: (listingId: string) => void
  onMessage: (listingId: string, message: string) => void
  isFavorited?: boolean
  currentUserId?: string
}

export function ListingDetails({ 
  listing, 
  onBack, 
  onFavorite, 
  onMessage,
  isFavorited = false,
  currentUserId 
}: ListingDetailsProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [messageText, setMessageText] = useState('')
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false)

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

  const handleSendMessage = () => {
    if (messageText.trim()) {
      onMessage(listing.id, messageText.trim())
      setMessageText('')
      setIsMessageDialogOpen(false)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: listing.title,
          text: `Check out this ${listing.category.toLowerCase()} on HuntSwap`,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const isOwnListing = currentUserId === listing.userId

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Button variant="ghost" onClick={onBack} className="flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={handleShare}>
              <Share2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onFavorite(listing.id)}
            >
              <Heart 
                className={`w-4 h-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
              />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              {listing.images && listing.images.length > 0 ? (
                <img 
                  src={listing.images[selectedImageIndex]} 
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  No image available
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {listing.images && listing.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {listing.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${
                      selectedImageIndex === index ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${listing.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Listing Details */}
          <div className="space-y-6">
            {/* Price and Status */}
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-primary">
                {formatPrice(listing.price)}
              </div>
              {listing.isSold && (
                <Badge className="bg-red-500 text-white">SOLD</Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl font-semibold text-foreground">
              {listing.title}
            </h1>

            {/* Category and Condition */}
            <div className="flex items-center space-x-3">
              <Badge variant="outline">{listing.category}</Badge>
              <Badge variant="secondary" className={getConditionColor(listing.condition)}>
                {listing.condition}
              </Badge>
            </div>

            {/* Location and Time */}
            <div className="flex items-center space-x-4 text-muted-foreground">
              {listing.location && (
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{listing.location}</span>
                </div>
              )}
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>Listed {formatTimeAgo(listing.createdAt)}</span>
              </div>
            </div>

            <Separator />

            {/* Description */}
            {listing.description && (
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground whitespace-pre-wrap">
                  {listing.description}
                </p>
              </div>
            )}

            <Separator />

            {/* Seller Info */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Seller</div>
                    <div className="text-sm text-muted-foreground">
                      Member since {new Date(listing.createdAt).getFullYear()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            {!isOwnListing && !listing.isSold && (
              <div className="space-y-3">
                <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full hunting-gradient text-white" size="lg">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message Seller
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Send Message</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="text-sm text-muted-foreground">
                        Send a message about: <span className="font-medium">{listing.title}</span>
                      </div>
                      <Textarea
                        placeholder="Hi! I'm interested in this item..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        rows={4}
                      />
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="outline" 
                          onClick={() => setIsMessageDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button 
                          onClick={handleSendMessage}
                          disabled={!messageText.trim()}
                          className="hunting-gradient text-white"
                        >
                          Send Message
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            )}

            {isOwnListing && (
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="text-sm text-muted-foreground text-center">
                  This is your listing
                </div>
              </div>
            )}

            {listing.isSold && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="text-sm text-red-800 text-center font-medium">
                  This item has been sold
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}