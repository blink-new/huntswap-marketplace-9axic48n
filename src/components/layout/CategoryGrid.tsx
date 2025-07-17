import { CATEGORIES } from '@/types'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Zap, 
  Target, 
  Crosshair, 
  Binoculars, 
  Shirt, 
  ShoppingBag,
  Scissors,
  TreePine,
  Volume2,
  MoreHorizontal
} from 'lucide-react'

interface CategoryGridProps {
  onCategorySelect: (category: string) => void
}

const categoryIcons: Record<string, React.ReactNode> = {
  'Rifles': <Zap className="w-6 h-6" />,
  'Shotguns': <Target className="w-6 h-6" />,
  'Handguns': <Crosshair className="w-6 h-6" />,
  'Bows & Crossbows': <Target className="w-6 h-6" />,
  'Optics & Scopes': <Binoculars className="w-6 h-6" />,
  'Ammunition': <Target className="w-6 h-6" />,
  'Hunting Clothing': <Shirt className="w-6 h-6" />,
  'Boots & Footwear': <Target className="w-6 h-6" />,
  'Backpacks & Bags': <ShoppingBag className="w-6 h-6" />,
  'Knives & Tools': <Scissors className="w-6 h-6" />,
  'Tree Stands': <TreePine className="w-6 h-6" />,
  'Decoys & Calls': <Volume2 className="w-6 h-6" />,
  'Other': <MoreHorizontal className="w-6 h-6" />
}

export function CategoryGrid({ onCategorySelect }: CategoryGridProps) {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6 text-center">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((category) => (
            <Card 
              key={category}
              className="cursor-pointer item-card-hover border-2 hover:border-primary/20"
              onClick={() => onCategorySelect(category)}
            >
              <CardContent className="p-4 flex flex-col items-center text-center space-y-2">
                <div className="text-primary">
                  {categoryIcons[category]}
                </div>
                <span className="text-sm font-medium text-foreground leading-tight">
                  {category}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}