import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  BarChart3, 
  Brain, 
  Clock, 
  Settings, 
  Zap,
  TrendingUp
} from 'lucide-react'

const Layout = ({ children }) => {
  const location = useLocation()
  
  const navigation = [
    { name: 'Dashboard', href: '/', icon: BarChart3 },
    { name: 'Time Analysis', href: '/time-analysis', icon: Clock },
    { name: 'Predictions', href: '/predictions', icon: Brain },
    { name: 'Optimization', href: '/optimization', icon: Zap },
    { name: 'Settings', href: '/settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
        <div className="flex h-16 items-center px-6 border-b">
          <TrendingUp className="h-8 w-8 text-primary-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">Campus AI</span>
        </div>
        
        <nav className="mt-6 px-3">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.href
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-3 py-2 mb-1 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="pl-64">
        <main className="py-6 px-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout