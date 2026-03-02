import { ProductDetail } from './ProductDetails'
import { CategoryOverview } from './CategoryOverview'
import { DashboardHome } from './DashboardHome'

export function RightContent({ selectedItem, selectedCategory, products, stats, orderHistory }) {
  // No selection - show dashboard home
  if (!selectedItem && !selectedCategory) {
    return <DashboardHome stats={stats} products={products} orderHistory={orderHistory} />
  }

  // Category selected but no specific item
  if (selectedCategory && !selectedItem) {
    return <CategoryOverview category={selectedCategory} />
  }

  // Specific item selected
  return <ProductDetail item={selectedItem} category={selectedCategory} orderHistory={orderHistory} />
}