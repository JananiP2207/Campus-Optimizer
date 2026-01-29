import React, { useState } from 'react'
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Calendar,
  Zap,
  Target
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'

const Predictions = () => {
  const [selectedWeek, setSelectedWeek] = useState('current')

  const weeklyPredictions = [
    { week: 'Week 1', productivity: 85, burnout: 20, satisfaction: 78 },
    { week: 'Week 2', productivity: 72, burnout: 45, satisfaction: 65 },
    { week: 'Week 3', productivity: 90, burnout: 15, satisfaction: 85 },
    { week: 'Week 4', productivity: 68, burnout: 60, satisfaction: 55 },
    { week: 'Week 5', productivity: 82, burnout: 25, satisfaction: 80 },
    { week: 'Week 6', productivity: 75, burnout: 35, satisfaction: 72 }
  ]

  const burnoutFactors = [
    { factor: 'Workload', current: 65, predicted: 70, max: 100 },
    { factor: 'Sleep Quality', current: 75, predicted: 68, max: 100 },
    { factor: 'Social Balance', current: 80, predicted: 85, max: 100 },
    { factor: 'Exercise', current: 45, predicted: 50, max: 100 },
    { factor: 'Stress Level', current: 40, predicted: 45, max: 100 },
    { factor: 'Academic Load', current: 70, predicted: 75, max: 100 }
  ]

  const predictions = [
    {
      type: 'Productive Week',
      probability: 78,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      factors: ['Optimal sleep pattern', 'Balanced schedule', 'Low stress indicators'],
      recommendation: 'Schedule important tasks and projects this week'
    },
    {
      type: 'Burnout Risk',
      probability: 23,
      icon: AlertTriangle,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      factors: ['Increased workload', 'Reduced sleep', 'Multiple deadlines'],
      recommendation: 'Plan recovery activities and reduce optional commitments'
    },
    {
      type: 'Focus Peak',
      probability: 85,
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      factors: ['Morning energy high', 'Minimal distractions', 'Good nutrition'],
      recommendation: 'Schedule deep work sessions between 9-11 AM'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Predictions</h1>
          <p className="text-gray-600 mt-1">Predict productive vs burnout weeks using pattern analysis</p>
        </div>
        <div className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-primary-600" />
          <span className="text-sm text-gray-600">AI Confidence: 87%</span>
        </div>
      </div>

      {/* Week Predictions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {predictions.map((prediction) => {
          const Icon = prediction.icon
          return (
            <div key={prediction.type} className={`card ${prediction.bgColor} border ${prediction.borderColor}`}>
              <div className="flex items-center justify-between mb-4">
                <Icon className={`h-6 w-6 ${prediction.color}`} />
                <div className="text-right">
                  <div className={`text-2xl font-bold ${prediction.color}`}>
                    {prediction.probability}%
                  </div>
                  <div className="text-xs text-gray-500">Probability</div>
                </div>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2">{prediction.type}</h3>
              
              <div className="mb-3">
                <p className="text-xs text-gray-600 mb-2">Key Factors:</p>
                <ul className="space-y-1">
                  {prediction.factors.map((factor, index) => (
                    <li key={index} className="text-xs text-gray-700 flex items-center">
                      <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className={`p-2 rounded-lg ${prediction.bgColor} border-l-2 ${prediction.borderColor.replace('border-', 'border-l-')}`}>
                <p className="text-xs font-medium text-gray-800">{prediction.recommendation}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Prediction Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Trend Prediction */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">6-Week Productivity Forecast</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyPredictions}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="productivity" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                name="Productivity"
              />
              <Line 
                type="monotone" 
                dataKey="burnout" 
                stroke="#ef4444" 
                strokeWidth={3}
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                name="Burnout Risk"
              />
              <Line 
                type="monotone" 
                dataKey="satisfaction" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                name="Satisfaction"
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Productivity</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Burnout Risk</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Satisfaction</span>
            </div>
          </div>
        </div>

        {/* Burnout Factor Analysis */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Burnout Risk Factors</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={burnoutFactors}>
              <PolarGrid />
              <PolarAngleAxis dataKey="factor" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar
                name="Current"
                dataKey="current"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.3}
              />
              <Radar
                name="Predicted"
                dataKey="predicted"
                stroke="#ef4444"
                fill="#ef4444"
                fillOpacity={0.2}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Current Level</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Predicted Level</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Reasoning */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🧠 AI Reasoning & Pattern Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Pattern Recognition</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Sleep-Productivity Correlation</p>
                  <p className="text-xs text-gray-600">7+ hours sleep → 23% higher productivity next day</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Weekly Rhythm Detection</p>
                  <p className="text-xs text-gray-600">Tuesdays show 15% lower energy - schedule lighter tasks</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-purple-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Stress Accumulation Model</p>
                  <p className="text-xs text-gray-600">3+ consecutive high-load days → burnout risk increases 40%</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Prediction Confidence</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Productivity Forecast</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                  </div>
                  <span className="text-xs text-gray-600">87%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Burnout Risk</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '73%' }}></div>
                  </div>
                  <span className="text-xs text-gray-600">73%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Optimal Timing</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '91%' }}></div>
                  </div>
                  <span className="text-xs text-gray-600">91%</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600">
                <span className="font-medium">Data Sources:</span> Activity patterns, sleep data, 
                calendar analysis, location tracking, and historical performance metrics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Predictions