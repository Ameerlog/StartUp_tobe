import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Search, 
  Bell, 
  HelpCircle, 
  ChevronDown, 
  User, 
  Settings, 
  LogOut,
  Menu,
  X,
  Globe,
  Briefcase
} from 'lucide-react'

export function TopNav({ user, onMenuToggle, menuOpen }) {
  const [showProfile, setShowProfile] = useState(false)
  const [showNotif, setShowNotif] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 h-[60px] bg-white border-b border-gray-200 z-50">
      <div className="h-full px-4 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuToggle}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 lg:hidden"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Globe size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900 hidden sm:block">My Portfolio</span>
          </Link>
        </div>

        {/* Center - Search */}
        <div className="hidden md:block flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search domains & ventures..."
              className="w-full h-10 pl-10 pr-4 bg-gray-100 border-0 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-1">
          <Link 
            to="/marketplace"
            className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg"
          >
            <Briefcase size={18} />
            <span>Marketplace</span>
          </Link>

          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100">
            <HelpCircle size={20} className="text-gray-500" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => { setShowNotif(!showNotif); setShowProfile(false) }}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 relative"
            >
              <Bell size={20} className="text-gray-500" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {showNotif && (
              <>
                <div className="fixed inset-0" onClick={() => setShowNotif(false)} />
                <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
                  <div className="p-4 border-b border-gray-100 font-semibold">Notifications</div>
                  <div className="max-h-64 overflow-y-auto">
                    <NotifItem 
                      title="Domain Expiring" 
                      message="cosister.com expires in 30 days" 
                      time="2h ago" 
                      type="warning"
                    />
                    <NotifItem 
                      title="Venture Update" 
                      message="Batteryfy quarterly report available" 
                      time="1d ago" 
                      type="info"
                    />
                    <NotifItem 
                      title="Investment Confirmed" 
                      message="GotWellSoon investment processing" 
                      time="3d ago" 
                      type="success"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Profile */}
          <div className="relative ml-2">
            <button 
              onClick={() => { setShowProfile(!showProfile); setShowNotif(false) }}
              className="flex items-center gap-2 h-10 pl-1 pr-3 rounded-full hover:bg-gray-100"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                {user.avatar}
              </div>
              <ChevronDown size={16} className="text-gray-400 hidden sm:block" />
            </button>

            {showProfile && (
              <>
                <div className="fixed inset-0" onClick={() => setShowProfile(false)} />
                <div className="absolute right-0 top-12 w-64 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
                  <div className="p-4 border-b border-gray-100 bg-gray-50">
                    <p className="font-semibold text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <div className="p-2">
                    <ProfileItem icon={User} label="Account Settings" />
                    <ProfileItem icon={Globe} label="My Domains" />
                    <ProfileItem icon={Briefcase} label="My Ventures" />
                    <ProfileItem icon={Settings} label="Preferences" />
                  </div>
                  <div className="p-2 border-t border-gray-100">
                    <Link to="/" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                      <LogOut size={18} className="text-gray-400" />
                      <span className="text-sm">Back to Home</span>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

function NotifItem({ title, message, time, type }) {
  const colors = {
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
    success: 'bg-green-500',
  }
  return (
    <div className="px-4 py-3 hover:bg-gray-50 border-b border-gray-50 cursor-pointer">
      <div className="flex items-start gap-3">
        <div className={`w-2 h-2 rounded-full mt-2 ${colors[type]}`} />
        <div>
          <p className="text-sm font-medium text-gray-900">{title}</p>
          <p className="text-sm text-gray-500">{message}</p>
          <p className="text-xs text-gray-400 mt-1">{time}</p>
        </div>
      </div>
    </div>
  )
}

function ProfileItem({ icon: Icon, label }) {
  return (
    <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
      <Icon size={18} className="text-gray-400" />
      <span className="text-sm">{label}</span>
    </button>
  )
}