import { useState } from 'react'
import { 
  Globe, 
  Briefcase,
  Users,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  ArrowRight,
  Plus,
  CheckCircle,
  Clock,
  User as UserIcon,
  Settings as SettingsIcon,
  Bell,
  Shield,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

export function DashboardHome({ user, stats, domains, ventures, coworking, sales, onSelectItem, onCategoryChange }) {
  const [activePurchaseTab, setActivePurchaseTab] = useState('domains') // 'domains' | 'ventures' | 'community'
  const expiringDomains = domains.filter(d => d.status === 'expiring')
  const pendingVentures = ventures.filter(v => v.status === 'pending')
  const soldDomains = sales?.soldDomains ?? []
  const jvDeals = sales?.jvDeals ?? []

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value)
  }

  const handleItemClick = (item, category) => {
    onSelectItem(item)
    onCategoryChange(category)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Profile, purchases, sales and settings in one place</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard icon={Globe} label="Domains" value={stats.totalDomains} color="blue" />
        <StatCard icon={Briefcase} label="Ventures" value={stats.totalVentures} color="purple" />
        <StatCard icon={Users} label="Coworking" value={stats.totalCoworking ?? 0} color="amber" />
        <StatCard icon={DollarSign} label="Invested" value={formatCurrency(stats.totalInvested)} color="green" />
        <StatCard icon={TrendingUp} label="Portfolio" value={formatCurrency(stats.portfolioValue)} color="teal" />
      </div>

      {/* Alerts */}
      {expiringDomains.length > 0 && (
        <div className="gd-card p-4 border-l-4 border-l-yellow-500 bg-yellow-50">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <div className="flex-1">
              <p className="font-medium text-yellow-800">
                {expiringDomains.length} domain(s) expiring soon
              </p>
              <p className="text-sm text-yellow-700">Renew to avoid losing your domains</p>
            </div>
            <button className="gd-btn-primary text-xs py-1.5">Renew All</button>
          </div>
        </div>
      )}

      {pendingVentures.length > 0 && (
        <div className="gd-card p-4 border-l-4 border-l-blue-500 bg-blue-50">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-blue-600" />
            <div className="flex-1">
              <p className="font-medium text-blue-800">
                {pendingVentures.length} venture investment(s) processing
              </p>
              <p className="text-sm text-blue-700">Documents will be available soon</p>
            </div>
          </div>
        </div>
      )}

      {/* Profile */}
      <div className="gd-card">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UserIcon size={20} className="text-gray-700" />
            <h2 className="font-semibold text-gray-900">Profile</h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
              <Users size={14} /> Coworking
            </span>
          </div>
        </div>
        <div className="p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center text-white text-lg font-semibold">
            {(coworking?.fullName || user?.name || 'U')
              .split(' ')
              .map(n => n[0])
              .join('')
              .slice(0, 2)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 truncate">
              {coworking?.fullName || user?.name}
            </p>
            <p className="text-sm text-gray-500 truncate">
              {coworking?.primaryRole || user?.role} • Member since {user?.memberSince}
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <Link
              to="/coworker-form"
              className="gd-btn-secondary px-3 py-1.5 justify-center"
            >
              <SettingsIcon size={14} />
              Edit Profile
            </Link>
            <Link
              to="/community"
              className="text-xs text-blue-600 font-medium flex items-center gap-1 justify-end"
            >
              View Community <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>

      {/* Purchases with tabs: Domains / Ventures / Community */}
      <div className="gd-card">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Briefcase size={20} className="text-purple-600" />
            <h2 className="font-semibold text-gray-900">Purchases</h2>
          </div>
          <span className="text-xs text-gray-500">
            Manage all your purchased assets
          </span>
        </div>

        {/* Tabs */}
        <div className="px-4 pt-3 flex flex-wrap gap-2 border-b border-gray-100">
          <button
            className={clsx(
              'px-3 py-1.5 text-xs rounded-full border transition-colors',
              activePurchaseTab === 'domains'
                ? 'bg-blue-50 text-blue-700 border-blue-200'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            )}
            onClick={() => setActivePurchaseTab('domains')}
          >
            Domains ({domains.length})
          </button>
          <button
            className={clsx(
              'px-3 py-1.5 text-xs rounded-full border transition-colors',
              activePurchaseTab === 'ventures'
                ? 'bg-purple-50 text-purple-700 border-purple-200'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            )}
            onClick={() => setActivePurchaseTab('ventures')}
          >
            Ventures ({ventures.length})
          </button>
          <button
            className={clsx(
              'px-3 py-1.5 text-xs rounded-full border transition-colors',
              activePurchaseTab === 'community'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            )}
            onClick={() => setActivePurchaseTab('community')}
          >
            Community (0)
          </button>
        </div>

        <div className="divide-y divide-gray-100">
          {activePurchaseTab === 'domains' &&
            (domains.length ? (
              domains.map(domain => (
                <PurchaseRow
                  key={domain.id}
                  item={domain}
                  type="domain"
                  onManage={() => handleItemClick(domain, 'domain')}
                />
              ))
            ) : (
              <EmptyPurchaseState
                label="No domains yet"
                ctaLabel="Browse Domains"
                to="/marketplace"
              />
            ))}

          {activePurchaseTab === 'ventures' &&
            (ventures.length ? (
              ventures.map(venture => (
                <PurchaseRow
                  key={venture.id}
                  item={venture}
                  type="venture"
                  onManage={() => handleItemClick(venture, 'venture')}
                />
              ))
            ) : (
              <EmptyPurchaseState
                label="No venture investments yet"
                ctaLabel="Explore Ventures"
                to="/venture"
              />
            ))}

          {activePurchaseTab === 'community' && (
            <EmptyPurchaseState
              label="No community memberships yet"
              ctaLabel="Explore Community"
              to="/community"
            />
          )}
        </div>
      </div>

      {/* Sales section: sold domains & JV deals */}
      <div className="gd-card">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrendingUp size={20} className="text-green-600" />
            <h2 className="font-semibold text-gray-900">Sales</h2>
          </div>
          <span className="text-xs text-gray-500">
            Track sold domains and JV deals
          </span>
        </div>
        <div className="p-4 grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              Sold Domains
            </h3>
            {soldDomains.length ? (
              <div className="space-y-3">
                {soldDomains.map(sale => (
                  <SalesRow
                    key={sale.id}
                    icon={Globe}
                    name={sale.name}
                    meta={`Buyer: ${sale.buyer}`}
                    dateLabel="Sold on"
                    date={sale.soldOn}
                    value={sale.salePriceFormatted}
                    status={sale.status}
                  />
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-500">
                No domains sold yet.
              </p>
            )}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              JV Deals
            </h3>
            {jvDeals.length ? (
              <div className="space-y-3">
                {jvDeals.map(deal => (
                  <SalesRow
                    key={deal.id}
                    icon={Briefcase}
                    name={deal.name}
                    meta={`Partner: ${deal.partner}`}
                    dateLabel="Signed on"
                    date={deal.signedOn}
                    value={deal.stake}
                    status={deal.status}
                  />
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-500">
                No JV deals yet.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="gd-card">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SettingsIcon size={20} className="text-gray-700" />
            <h2 className="font-semibold text-gray-900">Settings</h2>
          </div>
          <span className="text-xs text-gray-500">
            Control how your account works
          </span>
        </div>
        <div className="divide-y divide-gray-100">
          <SettingRow
            icon={UserIcon}
            label="Profile & account"
            description="Name, contact, coworking profile"
          />
          <SettingRow
            icon={Bell}
            label="Notifications"
            description="Email and dashboard alerts"
          />
          <SettingRow
            icon={Shield}
            label="Security"
            description="Login & access preferences"
          />
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, color }) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    green: 'bg-green-50 text-green-600',
    teal: 'bg-teal-50 text-teal-600',
    amber: 'bg-amber-50 text-amber-600',
  }

  return (
    <div className="gd-card p-4">
      <div className="flex items-center gap-3">
        <div className={clsx('w-10 h-10 rounded-lg flex items-center justify-center', colors[color])}>
          <Icon size={20} />
        </div>
        <div>
          <p className="text-xs text-gray-500">{label}</p>
          <p className="text-lg font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  )
}

function ItemRow({ item, type, onClick }) {
  const statusColors = {
    active: 'text-green-600 bg-green-50',
    expiring: 'text-yellow-600 bg-yellow-50',
    pending: 'text-blue-600 bg-blue-50',
  }

  return (
    <button onClick={onClick} className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 text-left">
      <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center flex-shrink-0">
        <img src={item.logo} alt={item.name} className="w-6 h-6 object-contain" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 truncate">{item.name}</p>
        <p className="text-sm text-gray-500 truncate">
          {type === 'domain' ? `Expires: ${item.expiryDate}` : item.industry}
        </p>
      </div>
      <div className="text-right">
        <p className="font-semibold text-gray-900 text-sm">
          {type === 'domain' ? item.priceFormatted : item.investmentFormatted}
        </p>
        <span className={clsx(
          'inline-block px-2 py-0.5 rounded-full text-xs font-medium capitalize',
          statusColors[item.status]
        )}>
          {item.status}
        </span>
      </div>
    </button>
  )
}

function PurchaseRow({ item, type, onManage }) {
  const statusColors = {
    active: 'text-green-600 bg-green-50',
    expiring: 'text-yellow-600 bg-yellow-50',
    pending: 'text-blue-600 bg-blue-50',
  }

  return (
    <div className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 text-left">
      <button
        onClick={onManage}
        className="flex items-center gap-4 flex-1 min-w-0 text-left"
      >
        <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center flex-shrink-0">
          <img src={item.logo} alt={item.name} className="w-6 h-6 object-contain" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-900 truncate">{item.name}</p>
          <p className="text-sm text-gray-500 truncate">
            {type === 'domain' ? `Expires: ${item.expiryDate}` : item.industry}
          </p>
        </div>
        <div className="text-right hidden sm:block">
          <p className="font-semibold text-gray-900 text-sm">
            {type === 'domain' ? item.priceFormatted : item.investmentFormatted}
          </p>
          <span className={clsx(
            'inline-block px-2 py-0.5 rounded-full text-xs font-medium capitalize',
            statusColors[item.status]
          )}>
            {item.status}
          </span>
        </div>
      </button>
      <button
        onClick={onManage}
        className="gd-btn-secondary text-xs px-3 py-1.5 whitespace-nowrap"
      >
        Manage
      </button>
    </div>
  )
}

function EmptyPurchaseState({ label, ctaLabel, to }) {
  return (
    <div className="p-4 flex items-center justify-between gap-3">
      <div>
        <p className="text-sm font-medium text-gray-800">{label}</p>
        <p className="text-xs text-gray-500">
          You haven't added anything here yet.
        </p>
      </div>
      <Link
        to={to}
        className="gd-btn-primary text-xs px-3 py-1.5 whitespace-nowrap"
      >
        {ctaLabel}
      </Link>
    </div>
  )
}

function SalesRow({ icon: Icon, name, meta, dateLabel, date, value, status }) {
  const statusColors = {
    completed: 'text-green-700 bg-green-50',
    active: 'text-blue-700 bg-blue-50',
    processing: 'text-amber-700 bg-amber-50',
  }

  return (
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
        <Icon size={16} className="text-gray-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
        <p className="text-xs text-gray-500 truncate">{meta}</p>
        <div className="mt-1 flex items-center justify-between gap-2 text-xs">
          <span className="text-gray-500">
            {dateLabel}: <span className="text-gray-700">{date}</span>
          </span>
          <span className="font-semibold text-gray-900">{value}</span>
        </div>
      </div>
      <span
        className={clsx(
          'text-[10px] px-2 py-0.5 rounded-full font-medium capitalize',
          statusColors[status] || 'text-gray-700 bg-gray-100'
        )}
      >
        {status}
      </span>
    </div>
  )
}

function SettingRow({ icon: Icon, label, description }) {
  return (
    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left">
      <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
        <Icon size={16} className="text-gray-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{label}</p>
        <p className="text-xs text-gray-500 truncate">{description}</p>
      </div>
      <SettingsIcon size={14} className="text-gray-400" />
    </button>
  )
}