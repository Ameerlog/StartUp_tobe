import { useState } from 'react'
import { TopNav } from '../components/TopNav'
import { LeftPanel } from '../components/LeftPanel'
import { UserDashboard } from '../components/UserDashboard'
import { AdminDashboard } from '../components/AdminDashboard'
import {
  userDomains,
  userVentures,
  userCoworking,
  userSales,
  userData,
  stats,
} from '../data/dashboardData'

export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeNav, setActiveNav] = useState('dashboard')
  const [selectedItem, setSelectedItem] = useState(null)
  const [activeCategory, setActiveCategory] = useState(null)

  // Toggle role for demo: change userData.role to 'admin' in dashboardData.js
  const isAdmin = userData.role === 'admin'

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav
        user={userData}
        onMenuToggle={() => setMenuOpen(!menuOpen)}
        menuOpen={menuOpen}
      />

      <LeftPanel
        user={userData}
        menuOpen={menuOpen}
        onCloseMenu={() => setMenuOpen(false)}
        activeNav={activeNav}
        onNavChange={(id) => {
          setActiveNav(id)
          setSelectedItem(null)
          setActiveCategory(null)
        }}
      />

      <main className="pt-[60px] lg:pl-[240px] min-h-screen">
        <div className="p-4 lg:p-8">
          {isAdmin ? (
            <AdminDashboard activeNav={activeNav} />
          ) : (
            <UserDashboard
              activeNav={activeNav}
              selectedItem={selectedItem}
              activeCategory={activeCategory}
              user={userData}
              stats={stats}
              domains={userDomains}
              ventures={userVentures}
              coworking={userCoworking}
              sales={userSales}
              onSelectItem={setSelectedItem}
              onCategoryChange={setActiveCategory}
            />
          )}
        </div>
      </main>
    </div>
  )
}
