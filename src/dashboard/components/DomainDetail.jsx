import { 
  Globe,
  Calendar,
  CreditCard,
  RefreshCw,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  Copy,
  Tag
} from 'lucide-react'
import clsx from 'clsx'

const statusConfig = {
  active: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', label: 'Active' },
  expiring: { icon: AlertTriangle, color: 'text-yellow-600', bg: 'bg-yellow-50', label: 'Expiring Soon' },
}

export function DomainDetail({ domain }) {
  const status = statusConfig[domain.status]
  const StatusIcon = status.icon

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header Card */}
      <div className="gd-card overflow-hidden">
        {/* Alert Banner */}
        {domain.status === 'expiring' && (
          <div className="px-6 py-3 bg-yellow-50 border-b border-yellow-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle size={18} className="text-yellow-600" />
              <span className="text-sm font-medium text-yellow-800">
                Expires on {domain.expiryDate}. Renew now to keep your domain.
              </span>
            </div>
            <button className="gd-btn-primary text-xs py-1.5 px-3">Renew</button>
          </div>
        )}

        {/* Main Content */}
        <div className="p-6">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-xl bg-gray-900 flex items-center justify-center flex-shrink-0">
              <img src={domain.logo} alt={domain.title} className="w-10 h-10 object-contain" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{domain.name}</h1>
                  <p className="text-gray-500 mt-1">{domain.description}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className={clsx(
                      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
                      status.bg, status.color
                    )}>
                      <StatusIcon size={12} />
                      {status.label}
                    </span>
                    {domain.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Value</p>
                  <p className="text-2xl font-bold text-gray-900">{domain.priceFormatted}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-100">
            <button className="gd-btn-primary">
              <RefreshCw size={16} />
              Renew Domain
            </button>
            <button className="gd-btn-secondary">
              <ExternalLink size={16} />
              Visit Site
            </button>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Registration */}
        <div className="gd-card p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Registration Details</h3>
          <div className="space-y-4">
            <InfoRow icon={Calendar} label="Purchase Date" value={domain.purchaseDate} />
            <InfoRow icon={Calendar} label="Expiry Date" value={domain.expiryDate} />
            <InfoRow icon={CreditCard} label="Order ID" value={domain.orderId} copy />
          </div>
        </div>

        {/* Auto Renew */}
        <div className="gd-card p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Auto-Renewal</h3>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <RefreshCw size={20} className={domain.autoRenew ? 'text-green-500' : 'text-gray-400'} />
              <div>
                <p className="font-medium text-gray-900">
                  {domain.autoRenew ? 'Auto-Renew On' : 'Auto-Renew Off'}
                </p>
                <p className="text-sm text-gray-500">
                  {domain.autoRenew ? `Renews on ${domain.expiryDate}` : 'Manual renewal required'}
                </p>
              </div>
            </div>
            <button className={clsx(
              'relative w-11 h-6 rounded-full transition-colors',
              domain.autoRenew ? 'bg-green-500' : 'bg-gray-300'
            )}>
              <span className={clsx(
                'absolute top-1 w-4 h-4 bg-white rounded-full transition-transform',
                domain.autoRenew ? 'left-6' : 'left-1'
              )} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoRow({ icon: Icon, label, value, copy }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
        <Icon size={16} className="text-gray-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-500">{label}</p>
        <div className="flex items-center gap-2">
          <p className="font-medium text-gray-900 text-sm">{value}</p>
          {copy && (
            <button className="p-1 hover:bg-gray-100 rounded">
              <Copy size={12} className="text-gray-400" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}