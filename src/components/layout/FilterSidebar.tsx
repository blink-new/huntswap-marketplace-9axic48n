import { useState } from 'react'
import { X, Filter, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { CATEGORIES } from '@/types'

interface FilterSidebarProps {
  selectedCategory: string | null
  selectedCondition: string | null
  priceRange: { min: number; max: number } | null
  sortBy: 'newest' | 'oldest' | 'price-low' | 'price-high'
  onCategoryChange: (category: string | null) => void
  onConditionChange: (condition: string | null) => void
  onPriceRangeChange: (range: { min: number; max: number } | null) => void
  onSortChange: (sort: 'newest' | 'oldest' | 'price-low' | 'price-high') => void
  onClearFilters: () => void
  isOpen: boolean
  onClose: () => void
}

export function FilterSidebar({
  selectedCategory,
  selectedCondition,
  priceRange,
  sortBy,
  onCategoryChange,
  onConditionChange,
  onPriceRangeChange,
  onSortChange,
  onClearFilters,
  isOpen,
  onClose
}: FilterSidebarProps) {
  const [minPrice, setMinPrice] = useState(priceRange?.min?.toString() || '')
  const [maxPrice, setMaxPrice] = useState(priceRange?.max?.toString() || '')
  const [isPriceOpen, setIsPriceOpen] = useState(true)
  const [isCategoryOpen, setIsCategoryOpen] = useState(true)
  const [isConditionOpen, setIsConditionOpen] = useState(true)

  const handlePriceChange = () => {
    const min = minPrice ? parseInt(minPrice) : 0
    const max = maxPrice ? parseInt(maxPrice) : 10000
    
    if (min >= 0 && max >= min) {
      onPriceRangeChange({ min, max })
    } else if (!minPrice && !maxPrice) {
      onPriceRangeChange(null)
    }
  }

  const clearPriceFilter = () => {
    setMinPrice('')
    setMaxPrice('')
    onPriceRangeChange(null)
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (selectedCategory) count++
    if (selectedCondition) count++
    if (priceRange) count++
    return count
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:relative lg:inset-auto">
      {/* Mobile Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 lg:hidden" 
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-80 bg-background border-l lg:relative lg:w-full lg:border-l-0 lg:border-r overflow-y-auto">
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Filters</h2>
              {getActiveFiltersCount() > 0 && (
                <Badge variant="secondary">
                  {getActiveFiltersCount()}
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {getActiveFiltersCount() > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onClearFilters}
                  className="text-primary"
                >
                  Clear all
                </Button>
              )}
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onClose}
                className="lg:hidden"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {/* Sort */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Sort by</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <Select value={sortBy} onValueChange={onSortChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest first</SelectItem>
                    <SelectItem value="oldest">Oldest first</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Category Filter */}
            <Card>
              <Collapsible open={isCategoryOpen} onOpenChange={setIsCategoryOpen}>
                <CollapsibleTrigger asChild>
                  <CardHeader className="pb-3 cursor-pointer hover:bg-muted/50">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">Category</CardTitle>
                      {isCategoryOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      <Button
                        variant={selectedCategory === null ? "default" : "ghost"}
                        size="sm"
                        onClick={() => onCategoryChange(null)}
                        className="w-full justify-start"
                      >
                        All Categories
                      </Button>
                      {CATEGORIES.map((category) => (
                        <Button
                          key={category}
                          variant={selectedCategory === category ? "default" : "ghost"}
                          size="sm"
                          onClick={() => onCategoryChange(category)}
                          className="w-full justify-start text-xs"
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>

            {/* Price Range Filter */}
            <Card>
              <Collapsible open={isPriceOpen} onOpenChange={setIsPriceOpen}>
                <CollapsibleTrigger asChild>
                  <CardHeader className="pb-3 cursor-pointer hover:bg-muted/50">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">Price Range</CardTitle>
                      {isPriceOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor="min-price" className="text-xs">Min</Label>
                          <Input
                            id="min-price"
                            type="number"
                            placeholder="$0"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            onBlur={handlePriceChange}
                            className="text-sm"
                          />
                        </div>
                        <div>
                          <Label htmlFor="max-price" className="text-xs">Max</Label>
                          <Input
                            id="max-price"
                            type="number"
                            placeholder="Any"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            onBlur={handlePriceChange}
                            className="text-sm"
                          />
                        </div>
                      </div>
                      {priceRange && (
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            ${priceRange.min} - ${priceRange.max}
                          </span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={clearPriceFilter}
                            className="text-xs h-6 px-2"
                          >
                            Clear
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>

            {/* Condition Filter */}
            <Card>
              <Collapsible open={isConditionOpen} onOpenChange={setIsConditionOpen}>
                <CollapsibleTrigger asChild>
                  <CardHeader className="pb-3 cursor-pointer hover:bg-muted/50">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">Condition</CardTitle>
                      {isConditionOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      <Button
                        variant={selectedCondition === null ? "default" : "ghost"}
                        size="sm"
                        onClick={() => onConditionChange(null)}
                        className="w-full justify-start"
                      >
                        All Conditions
                      </Button>
                      {['New', 'Like New', 'Good', 'Fair'].map((condition) => (
                        <Button
                          key={condition}
                          variant={selectedCondition === condition ? "default" : "ghost"}
                          size="sm"
                          onClick={() => onConditionChange(condition)}
                          className="w-full justify-start"
                        >
                          {condition}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}