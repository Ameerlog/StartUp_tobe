import { DashboardHome } from './DashboardHome'
import { DomainDetail } from './DomainDetail'
import { VentureDetail } from './VentureDetails'
import { CoworkingDetail } from './CoworkingDetail'
import { Link } from 'react-router-dom'

export function UserDashboard({
  activeNav,
  selectedItem,
  activeCategory,
  user,
  stats,
  domains,
  ventures,
  coworking,
  sales,
  onSelectItem,
  onCategoryChange,
}) {
  // When a detail item is selected, show it
  if (selectedItem && activeCategory) {
    if (activeCategory === 'domain') return <DomainDetail domain={selectedItem} />
    if (activeCategory === 'venture') return <VentureDetail venture={selectedItem} />
    if (activeCategory === 'coworking') return <CoworkingDetail profile={selectedItem} />
  }

  // Nav-based views
  if (activeNav === 'dashboard' || activeNav === 'purchases') {
    return (
      <DashboardHome
        user={user}
        stats={stats}
        domains={domains}
        ventures={ventures}
        coworking={coworking}
        sales={sales}
        onSelectItem={onSelectItem}
        onCategoryChange={onCategoryChange}
      />
    )
  }

  if (activeNav === 'domains') {
    return (
      <div className="max-w-4xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">Domains</h1>
        <p className="text-gray-500">Your owned domains</p>
        <div className="gd-card divide-y divide-gray-100">
          {domains.length ? (
            domains.map((d) => (
              <button
                key={d.id}
                onClick={() => { onSelectItem(d); onCategoryChange('domain') }}
                className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center">
                  <img src={d.logo} alt="" className="w-6 h-6 object-contain" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{d.name}</p>
                  <p className="text-sm text-gray-500">Expires: {d.expiryDate}</p>
                </div>
                <span className="text-sm font-semibold text-gray-900">{d.priceFormatted}</span>
              </button>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              No domains. <Link to="/marketplace" className="text-blue-600">Browse marketplace</Link>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (activeNav === 'ventures') {
    return (
      <div className="max-w-4xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">Ventures</h1>
        <p className="text-gray-500">Your venture investments</p>
        <div className="gd-card divide-y divide-gray-100">
          {ventures.length ? (
            ventures.map((v) => (
              <button
                key={v.id}
                onClick={() => { onSelectItem(v); onCategoryChange('venture') }}
                className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center">
                  <img src={v.logo} alt="" className="w-6 h-6 object-contain" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{v.name}</p>
                  <p className="text-sm text-gray-500">{v.industry}</p>
                </div>
                <span className="text-sm font-semibold text-gray-900">{v.investmentFormatted}</span>
              </button>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              No ventures. <Link to="/venture" className="text-blue-600">Explore ventures</Link>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (activeNav === 'community') {
    return (
      <div className="max-w-4xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">Community</h1>
        <p className="text-gray-500">Coworking and community</p>
        <div className="gd-card p-8 text-center">
          {coworking ? (
            <button
              onClick={() => { onSelectItem(coworking); onCategoryChange('coworking') }}
              className="gd-btn-primary"
            >
              View Profile
            </button>
          ) : (
            <Link to="/coworker-form" className="gd-btn-primary">
              Join Coworking Network
            </Link>
          )}
        </div>
      </div>
    )
  }

  if (activeNav === 'settings') {
    return (
      <div className="max-w-4xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500">Account preferences</p>
        <div className="gd-card p-8 text-center text-gray-500">
          Settings coming soon
        </div>
      </div>
    )
  }

  return (
    <DashboardHome
      user={user}
      stats={stats}
      domains={domains}
      ventures={ventures}
      coworking={coworking}
      sales={sales}
      onSelectItem={onSelectItem}
      onCategoryChange={onCategoryChange}
    />
  )
}
