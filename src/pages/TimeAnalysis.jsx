import React, { useState } from 'react'
import { 
  Clock, 
  Smartphone, 
  MapPin, 
  Coffee,
  AlertCircle,
  TrendingDown
} from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

const TimeAnalysis = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week')

  const timeDistribution = [
    { name: 'Classes', value: 25, color: '#3b82f6' },
    { name: 'Study', value: 30, color: '#10b981' },
    { name: 'Social Media', value: 15, color: '#ef4444' },
    { name: 'Commute', value: 10, color: '#f59e0b' },
    { name: 'Meals', value: 8, color: '#8b5cf6' },
    { name: 'Sleep', value: 35, color: '#6b7280' },
    { name: 'Other', value: 12, color: '#ec4899' }
  ]

  const leakagePattern = [
    { time: '8:00', social: 0.2, idle: 0.1, inefficiency: 0.3 },
    { time: '10:00', social: 0.8, idle: 0.4, inefficiency: 0.2 },
    { time: '12:00', social: 1.2, idle: 0.8, inefficiency: 0.4 },
    { time: '14:00', social: 2.1, idle: 1.2, inefficiency: 0.6 },
    { time: '16:00', social: 1.8, idle: 0.9, inefficiency: 0.8 },
    { time: '18:00', social: 1.5, idle: 0.6, inefficiency: 1.2 },
    { time: '20:00', social: 2.3, idle: 0.4, inefficiency: 0.3 },
    { time: '22:00', social: 1.9, idle: 0.2, inefficiency: 0.1 }
  ]

  const leakageInsights = [
    {
      type: 'Social Media',
      icon: Smartphone,
      hours: 2.3,
      trend: '+15%',
      peak: '2-4 PM',
      impact: 'High',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      type: 'Idle Gaps',
      icon: Clock,
      hours: 1.8,
      trend: '-8%',
      peak: '12-2 PM',
      impact: 'Medium',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      type: 'Travel Inefficiency',
      icon: MapPin,
      hours: 1.2,
      trend: '-23%',
      peak: '8-9 AM',
      impact: 'Low',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Time Analysis</h1>
          <p className="text-gray-600 mt-1">Detect and analyze time leakage patterns</p>
        </div>
        <div className="flex space-x-2">
          {['day', 'week', 'month'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                selectedPeriod === period
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Time Leakage Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {leakageInsights.map((insight) => {
          const Icon = insight.icon
          return (
            <div key={insight.type} className={`card ${insight.bgColor} border-l-4 border-l-red-500`}>
              <div className="flex items-center justify-between mb-3">
                <Icon className={`h-6 w-6 ${insight.color}`} />
                <span className={`text-xs px-2 py-1 rounded-full ${
                  insight.trend.startsWith('+') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                }`}>
                  {insight.trend}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{insight.type}</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p><span className="font-medium">{insight.hours}h</span> daily average</p>
                <p>Peak: <span className="font-medium">{insight.peak}</span></p>
                <p>Impact: <span className={`font-medium ${
                  insight.impact === 'High' ? 'text-red-600' : 
                  insight.impact === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                }`}>{insight.impact}</span></p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Time Distribution */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Time Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={timeDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
              >
                {timeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Time']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {timeDistribution.map((item) => (
              <div key={item.name} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-600">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Leakage Pattern */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Hourly Leakage Pattern</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={leakagePattern}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="social" 
                stackId="1" 
                stroke="#ef4444" 
                fill="#ef4444" 
                fillOpacity={0.6}
              />
              <Area 
                type="monotone" 
                dataKey="idle" 
                stackId="1" 
                stroke="#f59e0b" 
                fill="#f59e0b" 
                fillOpacity={0.6}
              />
              <Area 
                type="monotone" 
                dataKey="inefficiency" 
                stackId="1" 
                stroke="#3b82f6" 
                fill="#3b82f6" 
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Social Media</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Idle Time</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Inefficiency</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🔍 Detailed Time Leakage Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Privacy-First Detection</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">App Usage Patterns</p>
                  <p className="text-xs text-gray-600">Detects time spent without reading content</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Idle Gap Detection</p>
                  <p className="text-xs text-gray-600">Identifies unproductive time between activities</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-purple-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Location Efficiency</p>
                  <p className="text-xs text-gray-600">Analyzes travel patterns and route optimization</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Weekly Trends</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span className="text-sm font-medium text-red-900">Social Media</span>
                <div className="flex items-center space-x-2">
                  <TrendingDown className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-red-600">+2.3h this week</span>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium text-green-900">Travel Time</span>
                <div className="flex items-center space-x-2">
                  <TrendingDown className="h-4 w-4 text-green-600 rotate-180" />
                  <span className="text-sm text-green-600">-1.2h this week</span>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <span className="text-sm font-medium text-yellow-900">Idle Gaps</span>
                <div className="flex items-center space-x-2">
                  <TrendingDown className="h-4 w-4 text-yellow-600 rotate-180" />
                  <span className="text-sm text-yellow-600">-0.5h this week</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimeAnalysis