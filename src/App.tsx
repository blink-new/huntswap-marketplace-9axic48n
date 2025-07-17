import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import { CategoryGrid } from '@/components/layout/CategoryGrid'
import { FilterSidebar } from '@/components/layout/FilterSidebar'
import { ListingGrid } from '@/components/listings/ListingGrid'
import { ListingDetails } from '@/components/listings/ListingDetails'
import { SellForm } from '@/components/listings/SellForm'
import { MessagesList } from '@/components/messages/MessagesList'
import { Listing, CATEGORIES } from '@/types'
import blink from '@/blink/client'

// Sample data for demonstration
const sampleListings: Listing[] = [
  {
    id: '1',
    userId: 'user1',
    title: 'Remington 700 .308 Bolt Action Rifle',
    description: 'Excellent condition hunting rifle with scope included. Perfect for deer hunting.',
    price: 850,
    category: 'Rifles',
    condition: 'Good',
    location: 'Austin, TX',
    images: ['https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400'],
    isSold: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    userId: 'user2',
    title: 'Mathews VXR 31.5 Compound Bow',
    description: 'Like new compound bow, barely used. Comes with arrows and case.',
    price: 1200,
    category: 'Bows & Crossbows',
    condition: 'Like New',
    location: 'Dallas, TX',
    images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'],
    isSold: false,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    userId: 'user3',
    title: 'Sitka Gear Hunting Jacket - Large',
    description: 'Waterproof hunting jacket in excellent condition. Size Large.',
    price: 180,
    category: 'Hunting Clothing',
    condition: 'Good',
    location: 'Houston, TX',
    images: ['https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400'],
    isSold: false,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    userId: 'user4',
    title: 'Leupold VX-3i 3.5-10x40 Rifle Scope',
    description: 'Crystal clear optics, perfect for long-range hunting.',
    price: 320,
    category: 'Optics & Scopes',
    condition: 'Like New',
    location: 'San Antonio, TX',
    images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'],
    isSold: false,
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '5',
    userId: 'user5',
    title: 'Mossberg 500 12 Gauge Shotgun',
    description: 'Reliable pump-action shotgun, great for waterfowl hunting.',
    price: 450,
    category: 'Shotguns',
    condition: 'Good',
    location: 'Fort Worth, TX',
    images: ['https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400'],
    isSold: true,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '6',
    userId: 'user6',
    title: 'Hunting Backpack - 40L Capacity',
    description: 'Durable hunting backpack with multiple compartments.',
    price: 95,
    category: 'Backpacks & Bags',
    condition: 'Good',
    location: 'Austin, TX',
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'],
    isSold: false,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '7',
    userId: 'user7',
    title: 'Winchester Model 70 .30-06',
    description: 'Classic bolt-action rifle in excellent condition. Perfect for big game hunting.',
    price: 750,
    category: 'Rifles',
    condition: 'Like New',
    location: 'Phoenix, AZ',
    images: ['https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400'],
    isSold: false,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '8',
    userId: 'user8',
    title: 'Cabela\'s Hunting Boots Size 10',
    description: 'Waterproof insulated hunting boots, barely worn.',
    price: 120,
    category: 'Boots & Footwear',
    condition: 'Like New',
    location: 'Denver, CO',
    images: ['https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400'],
    isSold: false,
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '9',
    userId: 'user9',
    title: 'Barnett Crossbow Package',
    description: 'Complete crossbow package with bolts and case. Ready to hunt.',
    price: 380,
    category: 'Bows & Crossbows',
    condition: 'Good',
    location: 'Nashville, TN',
    images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'],
    isSold: false,
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '10',
    userId: 'user10',
    title: 'Hunting Knife Set - Buck Knives',
    description: 'Professional hunting knife set with leather sheaths.',
    price: 85,
    category: 'Knives & Tools',
    condition: 'New',
    location: 'Atlanta, GA',
    images: ['https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400'],
    isSold: false,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '11',
    userId: 'user11',
    title: 'Tree Stand - Ladder Style',
    description: '20ft ladder tree stand, very stable and comfortable.',
    price: 220,
    category: 'Tree Stands',
    condition: 'Fair',
    location: 'Birmingham, AL',
    images: ['https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400'],
    isSold: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  }
]

type AppView = 'home' | 'listing-details' | 'sell' | 'messages' | 'favorites' | 'profile'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentView, setCurrentView] = useState<AppView>('home')
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null)
  const [listings, setListings] = useState<Listing[]>(sampleListings)
  const [filteredListings, setFilteredListings] = useState<Listing[]>(sampleListings)
  const [favoritedListings, setFavoritedListings] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState<{ min: number; max: number } | null>(null)
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'price-low' | 'price-high'>('newest')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Auth state management
  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  // Filter listings based on search, category, price, condition, and sort
  useEffect(() => {
    let filtered = listings

    if (searchQuery) {
      filtered = filtered.filter(listing =>
        listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter(listing => listing.category === selectedCategory)
    }

    if (priceRange) {
      filtered = filtered.filter(listing => 
        listing.price >= priceRange.min && listing.price <= priceRange.max
      )
    }

    if (selectedCondition) {
      filtered = filtered.filter(listing => listing.condition === selectedCondition)
    }

    // Sort listings
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        default:
          return 0
      }
    })

    setFilteredListings(filtered)
  }, [listings, searchQuery, selectedCategory, priceRange, selectedCondition, sortBy])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setSelectedCategory(null) // Clear category filter when searching
  }

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    setSearchQuery('') // Clear search when selecting category
  }

  const handleClearFilters = () => {
    setSelectedCategory(null)
    setSelectedCondition(null)
    setPriceRange(null)
    setSearchQuery('')
    setSortBy('newest')
  }

  const handleFavorite = (listingId: string) => {
    setFavoritedListings(prev => {
      const newSet = new Set(prev)
      if (newSet.has(listingId)) {
        newSet.delete(listingId)
      } else {
        newSet.add(listingId)
      }
      return newSet
    })
  }

  const handleListingClick = (listing: Listing) => {
    setSelectedListing(listing)
    setCurrentView('listing-details')
  }

  const handleSellClick = () => {
    setCurrentView('sell')
  }

  const handleMessagesClick = () => {
    setCurrentView('messages')
  }

  const handleFavoritesClick = () => {
    setCurrentView('favorites')
  }

  const handleProfileClick = () => {
    setCurrentView('profile')
  }

  const handleBackToHome = () => {
    setCurrentView('home')
    setSelectedListing(null)
  }

  const handleCreateListing = async (listingData: Omit<Listing, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newListing: Listing = {
        ...listingData,
        id: Date.now().toString(),
        userId: user?.id || 'current-user',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      setListings(prev => [newListing, ...prev])
      setCurrentView('home')
    } catch (error) {
      console.error('Error creating listing:', error)
    }
  }

  const handleSendMessage = (listingId: string, message: string) => {
    // For now, show a success message - in production this would send to database
    alert('Message sent! The seller will be notified.')
    console.log('Send message:', { listingId, message })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center animate-fade-in">
          <div className="w-16 h-16 hunting-gradient rounded-xl flex items-center justify-center mx-auto mb-6 animate-pulse">
            <span className="text-white font-bold text-xl">HS</span>
          </div>
          <div className="text-xl font-semibold text-foreground mb-2">Loading HuntSwap...</div>
          <div className="text-sm text-muted-foreground">Preparing your hunting marketplace</div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 hunting-gradient rounded-xl flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-xl">HS</span>
          </div>
          <h1 className="text-3xl font-bold text-primary mb-4">Welcome to HuntSwap</h1>
          <p className="text-muted-foreground mb-8">
            The marketplace for hunters to buy and sell used hunting equipment, clothing, and gear.
          </p>
          <button 
            onClick={() => blink.auth.login()}
            className="w-full hunting-gradient text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Sign In to Continue
          </button>
        </div>
      </div>
    )
  }

  // Render different views based on currentView
  if (currentView === 'listing-details' && selectedListing) {
    return (
      <ListingDetails
        listing={selectedListing}
        onBack={handleBackToHome}
        onFavorite={handleFavorite}
        onMessage={handleSendMessage}
        isFavorited={favoritedListings.has(selectedListing.id)}
        currentUserId={user?.id}
      />
    )
  }

  if (currentView === 'sell') {
    return (
      <SellForm
        onBack={handleBackToHome}
        onSubmit={handleCreateListing}
      />
    )
  }

  if (currentView === 'messages') {
    return (
      <MessagesList
        onBack={handleBackToHome}
        currentUserId={user?.id || 'current-user'}
      />
    )
  }

  if (currentView === 'favorites') {
    const favoriteListings = listings.filter(listing => favoritedListings.has(listing.id))
    
    return (
      <div className="min-h-screen bg-background">
        <Header
          onSearch={handleSearch}
          onSellClick={handleSellClick}
          onMessagesClick={handleMessagesClick}
          onFavoritesClick={handleFavoritesClick}
          onProfileClick={handleProfileClick}
        />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-semibold mb-6">Your Favorites</h1>
          <ListingGrid
            listings={favoriteListings}
            onFavorite={handleFavorite}
            onListingClick={handleListingClick}
            favoritedListings={favoritedListings}
          />
        </div>
      </div>
    )
  }

  if (currentView === 'profile') {
    return (
      <div className="min-h-screen bg-background">
        <Header
          onSearch={handleSearch}
          onSellClick={handleSellClick}
          onMessagesClick={handleMessagesClick}
          onFavoritesClick={handleFavoritesClick}
          onProfileClick={handleProfileClick}
        />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-semibold mb-6">Profile</h1>
          <div className="text-center py-12">
            <div className="text-muted-foreground">Profile page coming soon...</div>
          </div>
        </div>
      </div>
    )
  }

  // Default home view
  return (
    <div className="min-h-screen bg-background">
      <Header
        onSearch={handleSearch}
        onSellClick={handleSellClick}
        onMessagesClick={handleMessagesClick}
        onFavoritesClick={handleFavoritesClick}
        onProfileClick={handleProfileClick}
      />

      <main>
        {/* Hero Section */}
        <section className="py-16 hunting-gradient hero-pattern relative overflow-hidden">
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Buy & Sell Hunting Gear
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
                Find the best deals on used hunting equipment from fellow hunters in your area
              </p>
            </div>
            <div className="max-w-lg mx-auto animate-slide-up">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for hunting gear..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full px-6 py-4 rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-4 focus:ring-white/20 shadow-lg text-lg"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-8 h-8 hunting-gradient rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="animate-fade-in">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {listings.length}
                </div>
                <div className="text-sm text-muted-foreground">Active Listings</div>
              </div>
              <div className="animate-fade-in">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {CATEGORIES.length}
                </div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
              <div className="animate-fade-in">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {listings.filter(l => l.isSold).length}
                </div>
                <div className="text-sm text-muted-foreground">Items Sold</div>
              </div>
              <div className="animate-fade-in">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {new Set(listings.map(l => l.location?.split(',')[1]?.trim())).size}
                </div>
                <div className="text-sm text-muted-foreground">States</div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Grid */}
        <CategoryGrid onCategorySelect={handleCategorySelect} />

        {/* Listings Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold">
                  {selectedCategory ? `${selectedCategory}` : searchQuery ? `Search Results` : 'Recent Listings'}
                </h2>
                <p className="text-muted-foreground">
                  {filteredListings.length} item{filteredListings.length !== 1 ? 's' : ''} found
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {(selectedCategory || searchQuery || selectedCondition || priceRange) && (
                  <button
                    onClick={handleClearFilters}
                    className="text-primary hover:underline text-sm"
                  >
                    Clear all filters
                  </button>
                )}
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="flex items-center space-x-2 px-3 py-2 border rounded-lg hover:bg-muted transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                  </svg>
                  <span className="text-sm">Filters</span>
                </button>
              </div>
            </div>

            <div className="lg:grid lg:grid-cols-4 lg:gap-6">
              {/* Filter Sidebar - Desktop */}
              <div className="hidden lg:block">
                <FilterSidebar
                  selectedCategory={selectedCategory}
                  selectedCondition={selectedCondition}
                  priceRange={priceRange}
                  sortBy={sortBy}
                  onCategoryChange={setSelectedCategory}
                  onConditionChange={setSelectedCondition}
                  onPriceRangeChange={setPriceRange}
                  onSortChange={setSortBy}
                  onClearFilters={handleClearFilters}
                  isOpen={true}
                  onClose={() => {}}
                />
              </div>

              {/* Listings Grid */}
              <div className="lg:col-span-3">
                <ListingGrid
                  listings={filteredListings}
                  onFavorite={handleFavorite}
                  onListingClick={handleListingClick}
                  favoritedListings={favoritedListings}
                />
              </div>
            </div>

            {/* Mobile Filter Sidebar */}
            <FilterSidebar
              selectedCategory={selectedCategory}
              selectedCondition={selectedCondition}
              priceRange={priceRange}
              sortBy={sortBy}
              onCategoryChange={setSelectedCategory}
              onConditionChange={setSelectedCondition}
              onPriceRangeChange={setPriceRange}
              onSortChange={setSortBy}
              onClearFilters={handleClearFilters}
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">HS</span>
                </div>
                <span className="font-bold text-xl text-white">HuntSwap</span>
              </div>
              <p className="text-primary-foreground/80 text-sm">
                The trusted marketplace for hunters to buy and sell used hunting equipment, clothing, and gear.
              </p>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-semibold text-white mb-4">Popular Categories</h3>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li><a href="#" className="hover:text-white transition-colors">Rifles</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Bows & Crossbows</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Optics & Scopes</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Hunting Clothing</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Safety Tips</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Report Item</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community Guidelines</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Prohibited Items</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
            <p className="text-primary-foreground/60 text-sm">
              © 2024 HuntSwap. All rights reserved. Built with ❤️ for the hunting community.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App