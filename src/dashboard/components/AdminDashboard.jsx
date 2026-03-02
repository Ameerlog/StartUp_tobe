import { Users, FileText, Globe, Briefcase, BarChart3, Settings } from 'lucide-react'

export function AdminDashboard({ activeNav }) {
  const sections = {
    dashboard: (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500">Overview of platform activity</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={Users} label="Users" value="1,234" />
          <StatCard icon={Globe} label="Domains" value="89" />
          <StatCard icon={Briefcase} label="Ventures" value="24" />
          <StatCard icon={FileText} label="Listings" value="156" />
        </div>
      </div>
    ),
    users: <Placeholder title="Users" desc="Manage users and roles" />,
    listings: <Placeholder title="Listings" desc="Manage domain & venture listings" />,
    domains: <Placeholder title="Domains" desc="Manage domain inventory" />,
    ventures: <Placeholder title="Ventures" desc="Manage venture investments" />,
    analytics: <Placeholder title="Analytics" desc="Reports and insights" />,
    settings: <Placeholder title="Settings" desc="Admin preferences" />,
  }

  return (
    <div className="max-w-4xl mx-auto">
      {sections[activeNav] || sections.dashboard}
    </div>
  )
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="gd-card p-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
          <Icon size={20} className="text-gray-600" />
        </div>
        <div>
          <p className="text-xs text-gray-500">{label}</p>
          <p className="text-lg font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  )
}

function Placeholder({ title, desc }) {
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <p className="text-gray-500">{desc}</p>
      <div className="gd-card p-8 text-center text-gray-500">
        Content coming soon
      </div>
    </div>
  )
}
