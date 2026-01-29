import React, { useState } from 'react'
import { 
  Shield, 
  Bell, 
  Smartphone, 
  MapPin, 
  Clock,
  Brain,
  Save,
  Eye,
  EyeOff
} from 'lucide-react'

const Settings = () => {
  const [settings, setSettings] = useState({
    privacy: {
      dataCollection: true,
      locationTracking: true,
      appUsageMonitoring: false,
      messageContentAccess: false
    },
    notifications: {
      productivityAlerts: true,
      burnoutWarnings: true,
      optimizationSuggestions: true,
      weeklyReports: true
    },
    ai: {
      predictionAccuracy: 'balanced',
      analysisDepth: 'detailed',
      recommendationFrequency: 'daily'
    }
  })

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }))
  }

  const privacySettings = [
    {
      key: 'dataCollection',
      title: 'Basic Data Collection',
      description: 'Allow collection of anonymized usage patterns and productivity metrics',
      icon: Shield,
      required: true
    },
    {
      key: 'locationTracking',
      title: 'Location-Based Optimization',
      description: 'Enable campus navigation and location-specific productivity insights',
      icon: MapPin,
      required: false
    },
    {
      key: 'appUsageMonitoring',
      title: 'App Usage Patterns',
      description: 'Monitor app switching and usage duration (no content access)',
      icon: Smartphone,
      required: false
    },
    {
      key: 'messageContentAccess',
      title: 'Message Content Analysis',
      description: 'Access message content for stress level analysis (NOT RECOMMENDED)',
      icon: EyeOff,
      required: false,
      warning: true
    }
  ]

  const notificationSettings = [
    {
      key: 'productivityAlerts',
      title: 'Productivity Alerts',
      description: 'Get notified when productivity patterns change',
      icon: Clock
    },
    {
      key: 'burnoutWarnings',
      title: 'Burnout Risk Warnings',
      description: 'Receive early warnings about potential burnout',
      icon: Brain
    },
    {
      key: 'optimizationSuggestions',
      title: 'Optimization Suggestions',
      description: 'Get real-time suggestions for schedule improvements',
      icon: Bell
    },
    {
      key: 'weeklyReports',
      title: 'Weekly Summary Reports',
      description: 'Receive comprehensive weekly productivity reports',
      icon: Bell
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Configure your privacy preferences and AI behavior</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Save className="h-4 w-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Privacy Settings */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <Shield className="h-6 w-6 text-green-600" />
          <h2 className="text-xl font-semibold text-gray-900">Privacy & Data Collection</h2>
        </div>
        
        <div className="space-y-4">
          {privacySettings.map((setting) => {
            const Icon = setting.icon
            return (
              <div key={setting.key} className={`p-4 rounded-lg border ${
                setting.warning ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-gray-50'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <Icon className={`h-5 w-5 mt-0.5 ${
                      setting.warning ? 'text-red-600' : 'text-gray-600'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-gray-900">{setting.title}</h3>
                        {setting.required && (
                          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                            Required
                          </span>
                        )}
                        {setting.warning && (
                          <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full">
                            Not Recommended
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{setting.description}</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.privacy[setting.key]}
                      onChange={(e) => handleSettingChange('privacy', setting.key, e.target.checked)}
                      disabled={setting.required}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
          <h4 className="font-medium text-blue-900 mb-2">🔒 Privacy-First Approach</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• All data processing happens locally on your device</li>
            <li>• No personal messages or private content is ever accessed</li>
            <li>• Location data is anonymized and encrypted</li>
            <li>• You can export or delete your data at any time</li>
          </ul>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <Bell className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
        </div>
        
        <div className="space-y-4">
          {notificationSettings.map((setting) => {
            const Icon = setting.icon
            return (
              <div key={setting.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon className="h-5 w-5 text-gray-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">{setting.title}</h3>
                    <p className="text-sm text-gray-600">{setting.description}</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications[setting.key]}
                    onChange={(e) => handleSettingChange('notifications', setting.key, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            )
          })}
        </div>
      </div>

      {/* AI Configuration */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <Brain className="h-6 w-6 text-purple-600" />
          <h2 className="text-xl font-semibold text-gray-900">AI Behavior</h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prediction Accuracy vs Speed
            </label>
            <select
              value={settings.ai.predictionAccuracy}
              onChange={(e) => handleSettingChange('ai', 'predictionAccuracy', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="fast">Fast (Lower accuracy, quicker results)</option>
              <option value="balanced">Balanced (Good accuracy and speed)</option>
              <option value="accurate">Accurate (Higher accuracy, slower processing)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Analysis Depth
            </label>
            <select
              value={settings.ai.analysisDepth}
              onChange={(e) => handleSettingChange('ai', 'analysisDepth', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="basic">Basic (Essential insights only)</option>
              <option value="detailed">Detailed (Comprehensive analysis)</option>
              <option value="deep">Deep (Maximum insights and correlations)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recommendation Frequency
            </label>
            <select
              value={settings.ai.recommendationFrequency}
              onChange={(e) => handleSettingChange('ai', 'recommendationFrequency', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="realtime">Real-time (Immediate suggestions)</option>
              <option value="daily">Daily (Once per day summary)</option>
              <option value="weekly">Weekly (Weekly optimization reports)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Data Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
            <h3 className="font-medium text-gray-900 mb-1">Export Data</h3>
            <p className="text-sm text-gray-600">Download all your data in JSON format</p>
          </button>
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
            <h3 className="font-medium text-gray-900 mb-1">Reset Analytics</h3>
            <p className="text-sm text-gray-600">Clear all analytics and start fresh</p>
          </button>
          <button className="p-4 border border-red-300 rounded-lg hover:bg-red-50 text-left">
            <h3 className="font-medium text-red-900 mb-1">Delete Account</h3>
            <p className="text-sm text-red-600">Permanently delete all data</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings