import { 
  Globe, 
  Server, 
  Shield, 
  Mail,
  CheckCircle,
  AlertCircle,
  Calendar,
  RefreshCw
} from 'lucide-react'
import clsx from 'clsx'

const icons = { Globe, Server, Shield, Mail }

const statusConfig = {
  active: { color: 'text-green-500 bg-green-100 dark:bg-green-900/30', label: 'Active' },
  expiring: { color: 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30', label: 'Expiring' },
  expired: { color: 'text-red-500 bg-red-100 dark:bg-red-900/30', label: 'Expired' },
}

export function CategoryOverview({ category }) {
  const Icon = icons[category.icon]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
          <Icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{category.name}</h1>
          <p className="text-gray-500">{category.count} products</p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid gap-4">
        {category.items.map((item) => {
          const status = statusConfig[item.status]
          return (
            <div 
              key={item.id} 
              className="dash-card p-5 hover:border-blue-300 dark:hover:border-blue-600 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {item.name}
                    </h3>
                    <span className={clsx(
                      'px-2.5 py-0.5 rounded-full text-xs font-medium',
                      status.color
                    )}>
                      {status.label}
                    </span>
                  </div>
                  {item.domain && (
                    <p className="text-gray-500 mt-1">Domain: {item.domain}</p>
                  )}
                </div>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  ${item.price}
                  {item.billingCycle && <span className="text-sm font-normal text-gray-500">/{item.billingCycle}</span>}
                </p>
              </div>

              <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-100 dark:border-slate-700">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>Expires: {item.expiryDate}</span>
                </div>
                {item.autoRenew && (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <RefreshCw className="w-4 h-4" />
                    <span>Auto-Renew On</span>
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                  Manage
                </button>
                <button className="px-4 py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-slate-600">
                  Renew Now
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}