import React, { useState, useEffect } from 'react'
import { 
  AlertTriangle, 
  TrendingUp, 
  Clock, 
  Zap,
  Calendar,
  MapPin
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

const Dashboard = () => {
  const [insights, setInsights] = useState({
    productivityScore: 78,
    timeLeakage: 2.5,
    burnoutRisk: 'Low',
    weekPrediction: 'Productive'
  })

  const productivityData = [
    { day: 'Mon', score: 85, timeWaste: 1.2 },
    { day: 'Tue', score: 72, timeWaste: 2.8 },
    { day: 'Wed', score: 90, timeWaste: 0.8 },
    { day: 'Thu', score: 68, timeWaste: 3.2 },
    { day: 'Fri', score: 75, timeWaste: 2.1 },
    { day: 'Sat', score: 45, timeWaste: 4.5 },
    { day: 'Sun', score: 55, timeWaste: 3.8 }
  ]

  const timeLeakSources = [
    { source: 'Social Media', hours: 2.3, color: '#ef4444' },
    { source: 'Idle Gaps', hours: 1.8, color: '#f59e0b' },
    { source: 'Travel Inefficiency', hours: 1.2, color: '#3b82f6' },
    { source: 'Distractions', hours: 0.9, color: '#8b5cf6' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Campus AI Dashboard</h1>
          <p className="text-gray-600 mt-1">Your personal campus operations optimizer</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          <span>Week of Jan 27, 2026</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Productivity Score</p>
              <p className="text-2xl font-bold text-green-600">{insights.productivityScore}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-xs text-gray-500 mt-2">↑ 12% from last week</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Time Leakage</p>
              <p className="text-2xl font-bold text-red-600">{insights.timeLeakage}h/day</p>
            </div>
            <Clock className="h-8 w-8 text-red-600" />
          </div>
          <p className="text-xs text-gray-500 mt-2">↓ 0.8h from last week</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Burnout Risk</p>
              <p className="text-2xl font-bold text-green-600">{insights.burnoutRisk}</p>
            </div>
            <Zap className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Optimal workload detected</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Week Prediction</p>
              <p className="text-2xl font-bold text-blue-600">{insights.weekPrediction}</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Based on pattern analysis</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Productivity Trend */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Productivity Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={productivityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Time Leakage Sources */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Time Leakage Sources</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={timeLeakSources}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="source" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hours" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Insights & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">🧠 AI Insights</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <p className="text-sm text-gray-700">Your productivity peaks on Wednesdays. Consider scheduling important tasks then.</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <p className="text-sm text-gray-700">Social media usage spikes during 2-4 PM. This correlates with your energy dips.</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <p className="text-sm text-gray-700">Your commute efficiency improved 23% after route optimization suggestions.</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">🚀 Smart Recommendations</h3>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <p className="text-sm font-medium text-blue-900">Timetable Optimization</p>
              <p className="text-xs text-blue-700 mt-1">Move your 9 AM class to 10 AM to reduce morning rush and improve attendance.</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
              <p className="text-sm font-medium text-green-900">Break Scheduling</p>
              <p className="text-xs text-green-700 mt-1">Add a 15-minute break between back-to-back classes to prevent cognitive overload.</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
              <p className="text-sm font-medium text-purple-900">Focus Zones</p>
              <p className="text-xs text-purple-700 mt-1">Library study sessions are 40% more productive than dorm studying for you.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard