import { 
  Briefcase,
  Calendar,
  CreditCard,
  TrendingUp,
  PieChart,
  FileText,
  ExternalLink,
  CheckCircle,
  Clock,
  Copy,
  Download,
  MessageCircle
} from 'lucide-react'
import clsx from 'clsx'

const statusConfig = {
  active: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', label: 'Active' },
  pending: { icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50', label: 'Pending' },
}

export function VentureDetail({ venture }) {
  const status = statusConfig[venture.status]
  const StatusIcon = status.icon

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header Card */}
      <div className="gd-card overflow-hidden">
        {venture.status === 'pending' && (
          <div className="px-6 py-3 bg-blue-50 border-b border-blue-100 flex items-center gap-3">
            <Clock size={18} className="text-blue-600" />
            <span className="text-sm font-medium text-blue-800">
              Investment is being processed. Documents will be available soon.
            </span>
          </div>
        )}

        <div className="p-6">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-xl bg-gray-900 flex items-center justify-center flex-shrink-0">
              <img src={venture.logo} alt={venture.name} className="w-10 h-10 object-contain" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{venture.name}</h1>
                  <p className="text-gray-500 mt-1">{venture.description}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className={clsx(
                      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
                      status.bg, status.color
                    )}>
                      <StatusIcon size={12} />
                      {status.label}
                    </span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                      {venture.equity} Equity
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Investment</p>
                  <p className="text-2xl font-bold text-gray-900">{venture.investmentFormatted}</p>
                  {venture.returns !== 'Pending' && (
                    <p className="text-green-600 font-medium flex items-center justify-end gap-1 mt-1">
                      <TrendingUp size={14} />
                      {venture.returns}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-100">
            <button className="gd-btn-primary">
              <FileText size={16} />
              View Documents
            </button>
            <button className="gd-btn-secondary">
              <MessageCircle size={16} />
              Contact Founders
            </button>
            <button className="gd-btn-secondary">
              <Download size={16} />
              Download Report
            </button>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Investment Details */}
        <div className="gd-card p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Investment Details</h3>
          <div className="space-y-4">
            <InfoRow icon={Calendar} label="Investment Date" value={venture.investmentDate} />
            <InfoRow icon={CreditCard} label="Amount" value={venture.investmentFormatted} />
            <InfoRow icon={PieChart} label="Equity" value={venture.equity} />
            <InfoRow icon={CreditCard} label="Order ID" value={venture.orderId} copy />
          </div>
        </div>

        {/* Business Info */}
        <div className="gd-card p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Business Information</h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Industry</p>
              <p className="text-sm font-medium text-gray-900">{venture.industry}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Business Model</p>
              <p className="text-sm font-medium text-gray-900">{venture.model}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance */}
      {venture.status === 'active' && (
        <div className="gd-card p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Performance Overview</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-gray-900">{venture.investmentFormatted}</p>
              <p className="text-sm text-gray-500">Invested</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{venture.returns}</p>
              <p className="text-sm text-gray-500">Returns</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">{venture.equity}</p>
              <p className="text-sm text-gray-500">Equity Stake</p>
            </div>
          </div>
        </div>
      )}
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