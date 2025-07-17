import { useState } from 'react'
import { Search, Plus, MessageCircle, Heart, User, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

interface HeaderProps {
  onSearch: (query: string) => void
  onSellClick: () => void
  onMessagesClick: () => void
  onFavoritesClick: () => void
  onProfileClick: () => void
}

export function Header({ 
  onSearch, 
  onSellClick, 
  onMessagesClick, 
  onFavoritesClick, 
  onProfileClick 
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  const NavItems = () => (
    <>
      <Button 
        onClick={onSellClick}
        className="hunting-gradient text-white hover:opacity-90"
      >
        <Plus className="w-4 h-4 mr-2" />
        Sell
      </Button>
      <Button variant="ghost" size="icon" onClick={onMessagesClick}>
        <MessageCircle className="w-5 h-5" />
      </Button>
      <Button variant="ghost" size="icon" onClick={onFavoritesClick}>
        <Heart className="w-5 h-5" />
      </Button>
      <Button variant="ghost" size="icon" onClick={onProfileClick}>
        <User className="w-5 h-5" />
      </Button>
    </>
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 hunting-gradient rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">HS</span>
          </div>
          <span className="font-bold text-xl text-primary">HuntSwap</span>
        </div>

        {/* Search Bar - Hidden on mobile */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search hunting gear..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4"
            />
          </div>
        </form>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          <NavItems />
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={() => onSearch('')}>
            <Search className="w-5 h-5" />
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-8">
                <form onSubmit={handleSearch} className="w-full">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Search hunting gear..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4"
                    />
                  </div>
                </form>
                <div className="flex flex-col space-y-2">
                  <NavItems />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}