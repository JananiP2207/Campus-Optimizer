import React, { useState } from 'react'
import { 
  Zap, 
  Calendar, 
  MapPin, 
  Clock,
  Route,
  Coffee,
  BookOpen,
  Users
} from 'lucide-react'

const Optimization = () => {
  const [activeTab, setActiveTab] = useState('timetable')

  const timetableOptimizations = [
    {
      type: 'Class Scheduling',
      current: 'Math at 8:00 AM',
      optimized: 'Math at 10:00 AM',
      impact: '+18% attendance',
      reason: 'Your energy peaks at 10 AM based on activity patterns',
      status: 'recommended'
    },
    {
      type: 'Break Insertion',
      current: 'Back-to-back classes',
      optimized: '15-min break between classes',
      impact: '+25% focus retention',
      reason: 'Prevents cognitive overload and improves comprehension',
      status: 'applied'
    },
    {
      type: 'Study Blocks',
      current: 'Random study times',
      optimized: 'Focused 2-hour blocks',
      impact: '+40% productivity',
      reason: 'Aligns with your natural concentration cycles',
      status: 'recommended'
    }
  ]

  const routeOptimizations = [
    {
      route: 'Dorm → Library → Class',
      current: '25 min',
      optimized: '18 min',
      savings: '7 min',
      method: 'Alternative path via Science Building',
      frequency: 'Daily'
    },
    {
      route: 'Class → Cafeteria → Gym',
      current: '15 min',
      optimized: '12 min',
      savings: '3 min',
      method: 'Direct route through courtyard',
      frequency: '3x/week'
    },
    {
      route: 'Library → Parking → Dorm',
      current: '20 min',
      optimized: '14 min',
      savings: '6 min',
      method: 'Use east entrance',
      frequency: 'Weekends'
    }
  ]

  const campusInsights = [
    {
      location: 'Library - 3rd Floor',
      type: 'Study Spot',
      icon: BookOpen,
      productivity: 92,
      crowding: 'Low',
      noise: 'Quiet',
      recommendation: 'Best for deep work sessions'
    },
    {
      location: 'Student Center Café',
      type: 'Social Study',
      icon: Coffee,
      productivity: 68,
      crowding: 'Medium',
      noise: 'Moderate',
      recommendation: 'Good for group projects'
    },
    {
      location: 'Dorm Study Lounge',
      type: 'Casual Study',
      icon: Users,
      productivity: 45,
      crowding: 'High',
      noise: 'Variable',
      recommendation: 'Avoid during peak hours'
    }
  ]

  const weeklySchedule = [
    { time: '8:00', mon: '', tue: 'Math', wed: '', thu: 'Math', fri: '', sat: '', sun: '' },
    { time: '9:00', mon: 'Physics', tue: '', wed: 'Physics', thu: '', fri: 'Physics', sat: '', sun: '' },
    { time: '10:00', mon: '', tue: 'Chemistry', wed: '', thu: 'Chemistry', fri: '', sat: 'Study', sun: '' },
    { time: '11:00', mon: 'English', tue: '', wed: 'English', thu: '', fri: 'English', sat: 'Study', sun: '' },
    { time: '12:00', mon: 'Lunch', tue: 'Lunch', wed: 'Lunch', thu: 'Lunch', fri: 'Lunch', sat: 'Lunch', sun: 'Lunch' },
    { time: '13:00', mon: '', tue: 'Lab', wed: '', thu: 'Lab', fri: '', sat: '', sun: 'Free' },
    { time: '14:00', mon: 'Study', tue: 'Lab', wed: 'Study', thu: 'Lab', fri: 'Study', sat: '', sun: 'Free' },
    { time: '15:00', mon: 'Study', tue: '', wed: 'Study', thu: '', fri: 'Study', sat: 'Gym', sun: 'Free' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Campus Life Optimization</h1>
          <p className="text-gray-600 mt-1">AI-powered suggestions for better timetables and campus navigation</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Zap className="h-4 w-4 text-yellow-500" />
          <span>12 optimizations available</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        {[
          { id: 'timetable', label: 'Timetable', icon: Calendar },
          { id: 'routes', label: 'Routes', icon: MapPin },
          { id: 'locations', label: 'Locations', icon: Coffee }
        ].map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Timetable Optimization */}
      {activeTab === 'timetable' && (
        <div className="space-y-6">
          {/* Optimization Suggestions */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🎯 Timetable Optimizations</h3>
            <div className="space-y-4">
              {timetableOptimizations.map((opt, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-medium text-gray-900">{opt.type}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        opt.status === 'applied' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {opt.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Current: <span className="font-medium">{opt.current}</span></p>
                        <p className="text-gray-600">Optimized: <span className="font-medium text-green-600">{opt.optimized}</span></p>
                      </div>
                      <div>
                        <p className="text-gray-600">Impact: <span className="font-medium text-blue-600">{opt.impact}</span></p>
                      </div>
                      <div>
                        <p className="text-gray-600">{opt.reason}</p>
                      </div>
                    </div>
                  </div>
                  {opt.status === 'recommended' && (
                    <button className="btn-primary ml-4">Apply</button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Schedule View */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📅 Optimized Weekly Schedule</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 font-medium text-gray-600">Time</th>
                    <th className="text-left p-2 font-medium text-gray-600">Mon</th>
                    <th className="text-left p-2 font-medium text-gray-600">Tue</th>
                    <th className="text-left p-2 font-medium text-gray-600">Wed</th>
                    <th className="text-left p-2 font-medium text-gray-600">Thu</th>
                    <th className="text-left p-2 font-medium text-gray-600">Fri</th>
                    <th className="text-left p-2 font-medium text-gray-600">Sat</th>
                    <th className="text-left p-2 font-medium text-gray-600">Sun</th>
                  </tr>
                </thead>
                <tbody>
                  {weeklySchedule.map((row, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="p-2 font-medium text-gray-700">{row.time}</td>
                      {['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map((day) => (
                        <td key={day} className="p-2">
                          {row[day] && (
                            <div className={`px-2 py-1 rounded text-xs font-medium ${
                              row[day].includes('Study') ? 'bg-blue-100 text-blue-700' :
                              row[day].includes('Math') || row[day].includes('Physics') || row[day].includes('Chemistry') || row[day].includes('English') ? 'bg-green-100 text-green-700' :
                              row[day].includes('Lab') ? 'bg-purple-100 text-purple-700' :
                              row[day].includes('Lunch') ? 'bg-yellow-100 text-yellow-700' :
                              row[day].includes('Gym') ? 'bg-red-100 text-red-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {row[day]}
                            </div>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Route Optimization */}
      {activeTab === 'routes' && (
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🗺️ Route Optimizations</h3>
            <div className="space-y-4">
              {routeOptimizations.map((route, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">{route.route}</h4>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-600">Save {route.savings}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Current: <span className="font-medium">{route.current}</span></p>
                      <p className="text-gray-600">Optimized: <span className="font-medium text-green-600">{route.optimized}</span></p>
                    </div>
                    <div>
                      <p className="text-gray-600">Method:</p>
                      <p className="font-medium">{route.method}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Frequency:</p>
                      <p className="font-medium">{route.frequency}</p>
                    </div>
                    <div className="flex items-center">
                      <button className="btn-primary">Apply Route</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Weekly Time Savings</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">47 min</div>
                <div className="text-sm text-gray-600">Total weekly savings</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">3.2 km</div>
                <div className="text-sm text-gray-600">Distance reduced</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">23%</div>
                <div className="text-sm text-gray-600">Efficiency improvement</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Location Optimization */}
      {activeTab === 'locations' && (
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📍 Campus Location Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {campusInsights.map((location, index) => {
                const Icon = location.icon
                return (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      <Icon className="h-6 w-6 text-primary-600" />
                      <div>
                        <h4 className="font-medium text-gray-900">{location.location}</h4>
                        <p className="text-sm text-gray-600">{location.type}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Productivity</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${location.productivity}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{location.productivity}%</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Crowding:</span>
                        <span className={`font-medium ${
                          location.crowding === 'Low' ? 'text-green-600' :
                          location.crowding === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                        }`}>{location.crowding}</span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Noise:</span>
                        <span className="font-medium text-gray-700">{location.noise}</span>
                      </div>
                    </div>
                    
                    <div className="p-2 bg-blue-50 rounded border-l-2 border-blue-500">
                      <p className="text-xs text-blue-800">{location.recommendation}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🎯 Location-Based Recommendations</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                <BookOpen className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-900">Deep Work Sessions</p>
                  <p className="text-xs text-green-700">Use Library 3rd Floor between 9-11 AM for maximum productivity</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <Users className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Group Study</p>
                  <p className="text-xs text-blue-700">Student Center Café works best for collaborative projects</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-900">Avoid Peak Hours</p>
                  <p className="text-xs text-yellow-700">Dorm study areas are 60% less productive between 7-9 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Optimization