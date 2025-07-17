import { Listing } from '@/types'
import { ListingCard } from './ListingCard'

interface ListingGridProps {
  listings: Listing[]
  onFavorite: (listingId: string) => void
  onListingClick: (listing: Listing) => void
  favoritedListings?: Set<string>
}

export function ListingGrid({ 
  listings, 
  onFavorite, 
  onListingClick, 
  favoritedListings = new Set() 
}: ListingGridProps) {
  if (listings.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div className="text-muted-foreground text-xl mb-2 font-medium">No items found</div>
        <div className="text-sm text-muted-foreground max-w-md mx-auto">
          Try adjusting your search terms or filters to find what you're looking for
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {listings.map((listing) => (
        <ListingCard
          key={listing.id}
          listing={listing}
          onFavorite={onFavorite}
          onClick={onListingClick}
          isFavorited={favoritedListings.has(listing.id)}
        />
      ))}
    </div>
  )
}