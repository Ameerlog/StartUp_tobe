import { Link } from 'react-router-dom'
import {
  LayoutDashboard,
  ShoppingBag,
  Globe,
  Briefcase,
  Users,
  Settings,
  Shield,
  FileText,
  BarChart3,
} from 'lucide-react'
import clsx from 'clsx'

const userNavItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'purchases', label: 'Purchases', icon: ShoppingBag },
  { id: 'domains', label: 'Domains', icon: Globe },
  { id: 'ventures', label: 'Ventures', icon: Briefcase },
  { id: 'community', label: 'Community', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings },
]

const adminNavItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'listings', label: 'Listings', icon: FileText },
  { id: 'domains', label: 'Domains', icon: Globe },
  { id: 'ventures', label: 'Ventures', icon: Briefcase },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export function LeftPanel({ user, menuOpen, onCloseMenu, activeNav, onNavChange }) {
  const isAdmin = user?.role === 'admin'
  const navItems = isAdmin ? adminNavItems : userNavItems

  return (
    <>
      {menuOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={onCloseMenu} />
      )}

      <aside
        className={clsx(
          'fixed left-0 top-[60px] bottom-0 w-[240px] bg-white border-r border-gray-200 z-40 flex flex-col transition-transform duration-300',
          menuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Profile */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white text-sm font-semibold">
              {user?.avatar || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate text-sm">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600">
                {isAdmin ? 'Admin' : 'User'}
              </span>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-3">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeNav === item.id
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavChange(item.id)
                  if (window.innerWidth < 1024) onCloseMenu()
                }}
                className={clsx(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm transition-colors',
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                <Icon size={18} className={clsx(isActive ? 'text-blue-600' : 'text-gray-400')} />
                {item.label}
              </button>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-gray-100">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
          >
            <Shield size={18} className="text-gray-400" />
            Back to Site
          </Link>
        </div>
      </aside>
    </>
  )
}
