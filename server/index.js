const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const fs = require('fs').promises
const path = require('path')

// Import our enhanced AI and data processing utilities
const CampusAIEngine = require('./utils/aiEngine')
const DataProcessor = require('./utils/dataProcessor')

const app = express()
const PORT = process.env.PORT || 5000

// Initialize AI Engine and Data Processor
const aiEngine = new CampusAIEngine()
const dataProcessor = new DataProcessor()

// Middleware
app.use(helmet())
app.use(cors())
app.use(express.json({ limit: '10mb' }))

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`)
  next()
})

// Data storage (in production, use a proper database)
const DATA_DIR = path.join(__dirname, 'data')
const USER_DATA_FILE = path.join(DATA_DIR, 'user_data.json')

// Ensure data directory exists
const initializeDataStorage = async () => {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
    
    // Initialize user data file if it doesn't exist
    try {
      await fs.access(USER_DATA_FILE)
    } catch {
      const initialData = {
        userId: 'user_001',
        createdAt: new Date().toISOString(),
        settings: {
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
        },
        activityData: [],
        predictions: [],
        optimizations: []
      }
      await fs.writeFile(USER_DATA_FILE, JSON.stringify(initialData, null, 2))
    }
  } catch (error) {
    console.error('Failed to initialize data storage:', error)
  }
}

// AI Analysis Engine (simulated)
class AIAnalysisEngine {
  static generateProductivityScore(activityData) {
    // Simulate AI analysis based on various factors
    const baseScore = 70
    const timeOfDay = new Date().getHours()
    const dayOfWeek = new Date().getDay()
    
    let score = baseScore
    
    // Time-based adjustments
    if (timeOfDay >= 9 && timeOfDay <= 11) score += 15 // Peak hours
    if (timeOfDay >= 14 && timeOfDay <= 16) score -= 10 // Post-lunch dip
    
    // Day-based adjustments
    if (dayOfWeek === 3) score += 12 // Wednesday peak
    if (dayOfWeek === 1) score -= 8 // Monday blues
    
    // Add some randomness to simulate real data
    score += Math.random() * 20 - 10
    
    return Math.max(0, Math.min(100, Math.round(score)))
  }
  
  static detectTimeLeakage(activityData) {
    // Simulate time leakage detection
    const sources = [
      { 
        source: 'Social Media', 
        hours: 2.3 + (Math.random() - 0.5) * 0.8,
        trend: Math.random() > 0.5 ? '+' : '-',
        trendValue: Math.round(Math.random() * 25) + 5
      },
      { 
        source: 'Idle Gaps', 
        hours: 1.8 + (Math.random() - 0.5) * 0.6,
        trend: Math.random() > 0.3 ? '-' : '+',
        trendValue: Math.round(Math.random() * 15) + 3
      },
      { 
        source: 'Travel Inefficiency', 
        hours: 1.2 + (Math.random() - 0.5) * 0.4,
        trend: '-',
        trendValue: Math.round(Math.random() * 30) + 10
      }
    ]
    
    return sources.map(s => ({
      ...s,
      hours: Math.round(s.hours * 10) / 10,
      trend: `${s.trend}${s.trendValue}%`
    }))
  }
  
  static predictWeekType(historicalData) {
    // Simulate week prediction based on patterns
    const predictions = ['Productive', 'Balanced', 'Challenging', 'Recovery']
    const probabilities = [0.4, 0.3, 0.2, 0.1]
    
    const random = Math.random()
    let cumulative = 0
    
    for (let i = 0; i < predictions.length; i++) {
      cumulative += probabilities[i]
      if (random <= cumulative) {
        return {
          type: predictions[i],
          confidence: Math.round((0.75 + Math.random() * 0.2) * 100),
          factors: this.generatePredictionFactors(predictions[i])
        }
      }
    }
    
    return {
      type: 'Productive',
      confidence: 85,
      factors: this.generatePredictionFactors('Productive')
    }
  }
  
  static generatePredictionFactors(weekType) {
    const factorSets = {
      'Productive': [
        'Optimal sleep pattern detected',
        'Balanced workload distribution',
        'Low stress indicators',
        'Consistent routine maintenance'
      ],
      'Challenging': [
        'Increased academic load',
        'Multiple deadlines approaching',
        'Reduced sleep quality',
        'Higher stress markers'
      ],
      'Recovery': [
        'Post-exam period detected',
        'Lower activity requirements',
        'Opportunity for rest',
        'Routine reset recommended'
      ],
      'Balanced': [
        'Moderate workload ahead',
        'Mixed activity patterns',
        'Standard stress levels',
        'Regular routine maintained'
      ]
    }
    
    return factorSets[weekType] || factorSets['Balanced']
  }
  
  static generateOptimizations(userData) {
    const optimizations = []
    
    // Timetable optimizations
    if (Math.random() > 0.3) {
      optimizations.push({
        type: 'timetable',
        category: 'Class Scheduling',
        current: 'Early morning classes',
        optimized: 'Mid-morning scheduling',
        impact: `+${Math.round(Math.random() * 20 + 10)}% attendance`,
        reason: 'Energy patterns suggest better performance later in morning',
        status: 'recommended',
        priority: 'high'
      })
    }
    
    // Route optimizations
    if (Math.random() > 0.4) {
      optimizations.push({
        type: 'route',
        category: 'Campus Navigation',
        current: 'Standard route',
        optimized: 'Optimized path',
        impact: `Save ${Math.round(Math.random() * 10 + 5)} min daily`,
        reason: 'Alternative route reduces walking time',
        status: 'recommended',
        priority: 'medium'
      })
    }
    
    return optimizations
  }
}

// Utility functions
const loadUserData = async () => {
  try {
    const data = await fs.readFile(USER_DATA_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error loading user data:', error)
    return null
  }
}

const saveUserData = async (data) => {
  try {
    await fs.writeFile(USER_DATA_FILE, JSON.stringify(data, null, 2))
    return true
  } catch (error) {
    console.error('Error saving user data:', error)
    return false
  }
}

// Enhanced API Routes
app.get('/api/dashboard', async (req, res) => {
  try {
    const userData = await loadUserData()
    if (!userData) {
      return res.status(500).json({ success: false, message: 'Failed to load user data' })
    }
    
    const productivityScore = AIAnalysisEngine.generateProductivityScore(userData.activityData)
    const timeLeakSources = AIAnalysisEngine.detectTimeLeakage(userData.activityData)
    const weekPrediction = AIAnalysisEngine.predictWeekType(userData.activityData)
    
    // Generate weekly productivity data
    const productivityData = Array.from({ length: 7 }, (_, i) => {
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      return {
        day: days[i],
        score: Math.round(60 + Math.random() * 35 + (i === 2 ? 15 : 0)), // Wednesday boost
        timeWaste: Math.round((1 + Math.random() * 3) * 10) / 10
      }
    })
    
    res.json({
      success: true,
      data: {
        insights: {
          productivityScore,
          timeLeakage: timeLeakSources.reduce((sum, source) => sum + source.hours, 0).toFixed(1),
          burnoutRisk: productivityScore > 75 ? 'Low' : productivityScore > 50 ? 'Medium' : 'High',
          weekPrediction: weekPrediction.type
        },
        productivityData,
        timeLeakSources,
        aiInsights: [
          `Your productivity peaks on ${productivityData.reduce((max, day) => day.score > max.score ? day : max).day}s`,
          `Time leakage reduced by ${Math.round(Math.random() * 20 + 10)}% this week`,
          `${weekPrediction.factors[0]}`
        ],
        recommendations: AIAnalysisEngine.generateOptimizations(userData).slice(0, 3)
      }
    })
  } catch (error) {
    console.error('Dashboard API error:', error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

app.get('/api/time-analysis', async (req, res) => {
  try {
    const userData = await loadUserData()
    const timeLeakSources = AIAnalysisEngine.detectTimeLeakage(userData?.activityData || [])
    
    // Generate hourly leakage pattern
    const leakagePattern = Array.from({ length: 8 }, (_, i) => {
      const hour = 8 + i * 2
      return {
        time: `${hour}:00`,
        social: Math.round((Math.random() * 2 + 0.5 + (i === 3 ? 1 : 0)) * 10) / 10, // Peak at 2-4 PM
        idle: Math.round((Math.random() * 1.5 + 0.2) * 10) / 10,
        inefficiency: Math.round((Math.random() * 1 + 0.1) * 10) / 10
      }
    })
    
    res.json({
      success: true,
      data: {
        timeDistribution: [
          { name: 'Classes', value: 25, color: '#3b82f6' },
          { name: 'Study', value: 30, color: '#10b981' },
          { name: 'Social Media', value: 15, color: '#ef4444' },
          { name: 'Commute', value: 10, color: '#f59e0b' },
          { name: 'Meals', value: 8, color: '#8b5cf6' },
          { name: 'Sleep', value: 35, color: '#6b7280' },
          { name: 'Other', value: 12, color: '#ec4899' }
        ],
        leakagePattern,
        insights: timeLeakSources,
        privacyMetrics: {
          dataPointsAnalyzed: Math.round(Math.random() * 1000 + 500),
          privacyScore: 95,
          encryptedSessions: Math.round(Math.random() * 50 + 20)
        }
      }
    })
  } catch (error) {
    console.error('Time analysis API error:', error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

app.get('/api/predictions', async (req, res) => {
  try {
    const userData = await loadUserData()
    const weekPrediction = AIAnalysisEngine.predictWeekType(userData?.activityData || [])
    
    // Generate 6-week predictions
    const weeklyPredictions = Array.from({ length: 6 }, (_, i) => ({
      week: `Week ${i + 1}`,
      productivity: Math.round(60 + Math.random() * 35),
      burnout: Math.round(Math.random() * 60 + 10),
      satisfaction: Math.round(55 + Math.random() * 35)
    }))
    
    // Generate burnout factors
    const burnoutFactors = [
      'Workload', 'Sleep Quality', 'Social Balance', 
      'Exercise', 'Stress Level', 'Academic Load'
    ].map(factor => ({
      factor,
      current: Math.round(Math.random() * 60 + 30),
      predicted: Math.round(Math.random() * 60 + 30),
      max: 100
    }))
    
    res.json({
      success: true,
      data: {
        weeklyPredictions,
        burnoutFactors,
        confidence: weekPrediction.confidence,
        currentPrediction: weekPrediction.type,
        predictionFactors: weekPrediction.factors,
        modelMetrics: {
          accuracy: '87%',
          dataPoints: Math.round(Math.random() * 5000 + 2000),
          lastUpdated: new Date().toISOString()
        }
      }
    })
  } catch (error) {
    console.error('Predictions API error:', error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

app.get('/api/optimization', async (req, res) => {
  try {
    const userData = await loadUserData()
    const optimizations = AIAnalysisEngine.generateOptimizations(userData || {})
    
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
        status: Math.random() > 0.5 ? 'applied' : 'recommended'
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
        current: `${Math.round(Math.random() * 10 + 20)} min`,
        optimized: `${Math.round(Math.random() * 5 + 15)} min`,
        savings: `${Math.round(Math.random() * 8 + 3)} min`,
        method: 'Alternative path via Science Building',
        frequency: 'Daily'
      },
      {
        route: 'Class → Cafeteria → Gym',
        current: `${Math.round(Math.random() * 5 + 12)} min`,
        optimized: `${Math.round(Math.random() * 3 + 9)} min`,
        savings: `${Math.round(Math.random() * 4 + 2)} min`,
        method: 'Direct route through courtyard',
        frequency: '3x/week'
      }
    ]
    
    const locationInsights = [
      {
        location: 'Library - 3rd Floor',
        type: 'Study Spot',
        productivity: Math.round(Math.random() * 20 + 80),
        crowding: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
        noise: ['Quiet', 'Moderate', 'Loud'][Math.floor(Math.random() * 3)],
        recommendation: 'Best for deep work sessions'
      },
      {
        location: 'Student Center Café',
        type: 'Social Study',
        productivity: Math.round(Math.random() * 30 + 50),
        crowding: 'Medium',
        noise: 'Moderate',
        recommendation: 'Good for group projects'
      },
      {
        location: 'Dorm Study Lounge',
        type: 'Casual Study',
        productivity: Math.round(Math.random() * 25 + 35),
        crowding: 'High',
        noise: 'Variable',
        recommendation: 'Avoid during peak hours'
      }
    ]
    
    res.json({
      success: true,
      data: {
        timetableOptimizations,
        routeOptimizations,
        locationInsights,
        optimizationStats: {
          totalOptimizations: optimizations.length + 6,
          appliedOptimizations: Math.round(Math.random() * 3 + 2),
          potentialTimeSavings: `${Math.round(Math.random() * 30 + 20)} min/day`
        }
      }
    })
  } catch (error) {
    console.error('Optimization API error:', error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

// AI Analysis endpoint (simulates ML processing)
app.post('/api/analyze', (req, res) => {
  const { dataType, timeRange } = req.body
  
  // Simulate AI processing delay
  setTimeout(() => {
    res.json({
      success: true,
      data: {
        analysis: `AI analysis complete for ${dataType} over ${timeRange}`,
        insights: [
          'Pattern detected: Productivity peaks on Wednesdays',
          'Recommendation: Schedule important tasks mid-week',
          'Alert: Social media usage increasing during study hours'
        ],
        confidence: Math.floor(Math.random() * 20) + 80 // 80-100%
      }
    })
  }, 1500)
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Campus AI Optimizer API is running',
    timestamp: new Date().toISOString()
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Campus AI Optimizer API running on port ${PORT}`)
  console.log(`📊 Dashboard: http://localhost:3000`)
  console.log(`🔗 API Health: http://localhost:${PORT}/api/health`)
})

// Settings management
app.get('/api/settings', async (req, res) => {
  try {
    const userData = await loadUserData()
    if (!userData) {
      return res.status(500).json({ success: false, message: 'Failed to load user data' })
    }
    
    res.json({
      success: true,
      data: userData.settings
    })
  } catch (error) {
    console.error('Settings API error:', error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

app.put('/api/settings', async (req, res) => {
  try {
    const userData = await loadUserData()
    if (!userData) {
      return res.status(500).json({ success: false, message: 'Failed to load user data' })
    }
    
    userData.settings = { ...userData.settings, ...req.body }
    userData.updatedAt = new Date().toISOString()
    
    const saved = await saveUserData(userData)
    if (!saved) {
      return res.status(500).json({ success: false, message: 'Failed to save settings' })
    }
    
    res.json({
      success: true,
      message: 'Settings updated successfully',
      data: userData.settings
    })
  } catch (error) {
    console.error('Settings update API error:', error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

// Enhanced activity data submission with AI processing
app.post('/api/activity', async (req, res) => {
  try {
    const rawActivity = req.body
    
    // Validate and process the activity data
    const processedActivity = dataProcessor.processActivityData(rawActivity)
    
    const userData = await loadUserData()
    if (!userData) {
      return res.status(500).json({ success: false, message: 'Failed to load user data' })
    }
    
    userData.activityData.push(processedActivity)
    
    // Keep only last 1000 entries to prevent unlimited growth
    if (userData.activityData.length > 1000) {
      userData.activityData = userData.activityData.slice(-1000)
    }
    
    // Run AI analysis on the updated data
    const aiAnalysis = await aiEngine.analyzeStudentData(userData, 'incremental')
    
    // Store analysis results
    userData.lastAnalysis = {
      timestamp: new Date().toISOString(),
      results: aiAnalysis
    }
    
    const saved = await saveUserData(userData)
    if (!saved) {
      return res.status(500).json({ success: false, message: 'Failed to save activity data' })
    }
    
    res.json({
      success: true,
      message: 'Activity data recorded and analyzed successfully',
      data: { 
        activityId: processedActivity.id,
        aiInsights: aiAnalysis.insights.slice(0, 2), // Return top 2 insights
        productivityScore: aiAnalysis.productivity?.score || null
      }
    })
  } catch (error) {
    console.error('Activity submission API error:', error)
    res.status(400).json({ 
      success: false, 
      message: error.message || 'Failed to process activity data' 
    })
  }
})

// Enhanced data export with multiple formats
app.get('/api/export', async (req, res) => {
  try {
    const { format = 'json' } = req.query
    const userData = await loadUserData()
    
    if (!userData) {
      return res.status(500).json({ success: false, message: 'Failed to load user data' })
    }
    
    const exportedData = await dataProcessor.exportData(userData, format)
    
    const contentTypes = {
      json: 'application/json',
      csv: 'text/csv'
    }
    
    const fileExtensions = {
      json: 'json',
      csv: 'csv'
    }
    
    res.setHeader('Content-Type', contentTypes[format] || 'application/json')
    res.setHeader('Content-Disposition', `attachment; filename="campus-ai-data.${fileExtensions[format] || 'json'}"`)
    
    if (format === 'json') {
      res.json(JSON.parse(exportedData))
    } else {
      res.send(exportedData)
    }
  } catch (error) {
    console.error('Data export API error:', error)
    res.status(500).json({ success: false, message: error.message || 'Internal server error' })
  }
})

// Data deletion
app.delete('/api/data', async (req, res) => {
  try {
    const { confirmDelete } = req.body
    
    if (!confirmDelete) {
      return res.status(400).json({ 
        success: false, 
        message: 'Confirmation required for data deletion' 
      })
    }
    
    // Reset to initial state
    const initialData = {
      userId: 'user_001',
      createdAt: new Date().toISOString(),
      settings: {
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
      },
      activityData: [],
      predictions: [],
      optimizations: []
    }
    
    const saved = await saveUserData(initialData)
    if (!saved) {
      return res.status(500).json({ success: false, message: 'Failed to delete data' })
    }
    
    res.json({
      success: true,
      message: 'All user data has been deleted successfully'
    })
  } catch (error) {
    console.error('Data deletion API error:', error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

// Enhanced real-time AI analysis endpoint
app.post('/api/analyze', async (req, res) => {
  try {
    const { dataType, timeRange, analysisType = 'comprehensive' } = req.body
    
    if (!dataType) {
      return res.status(400).json({ 
        success: false, 
        message: 'Data type is required for analysis' 
      })
    }
    
    const userData = await loadUserData()
    if (!userData) {
      return res.status(500).json({ success: false, message: 'Failed to load user data' })
    }
    
    // Run comprehensive AI analysis
    const analysisResults = await aiEngine.analyzeStudentData(userData, analysisType)
    
    // Process and detect patterns
    const patterns = dataProcessor.detectPatterns(userData.activityData || [])
    
    // Aggregate time data based on requested timeframe
    const aggregatedData = dataProcessor.aggregateTimeData(
      userData.activityData || [], 
      timeRange || 'daily'
    )
    
    const response = {
      analysisId: dataProcessor.generateId(),
      dataType,
      timeRange: timeRange || 'comprehensive',
      analysisType,
      completedAt: new Date().toISOString(),
      results: {
        aiAnalysis: analysisResults,
        patterns,
        aggregatedData,
        insights: analysisResults.insights,
        confidence: analysisResults.confidence,
        recommendations: analysisResults.optimizations?.optimizations || []
      },
      metadata: {
        dataPoints: userData.activityData?.length || 0,
        analysisVersion: '2.0',
        processingTime: Math.round(Math.random() * 1000 + 500) + 'ms'
      }
    }
    
    // Store analysis results
    userData.analyses = userData.analyses || []
    userData.analyses.push({
      id: response.analysisId,
      timestamp: response.completedAt,
      type: analysisType,
      confidence: response.results.confidence
    })
    
    // Keep only last 10 analyses
    if (userData.analyses.length > 10) {
      userData.analyses = userData.analyses.slice(-10)
    }
    
    await saveUserData(userData)
    
    res.json({
      success: true,
      message: `Enhanced AI analysis complete for ${dataType}`,
      data: response
    })
  } catch (error) {
    console.error('AI analysis API error:', error)
    res.status(500).json({ 
      success: false, 
      message: error.message || 'AI analysis failed' 
    })
  }
})

// System status and metrics
app.get('/api/status', async (req, res) => {
  try {
    const userData = await loadUserData()
    const uptime = process.uptime()
    
    res.json({
      success: true,
      data: {
        system: {
          status: 'operational',
          uptime: Math.round(uptime),
          version: '1.0.0',
          environment: process.env.NODE_ENV || 'development'
        },
        ai: {
          modelStatus: 'active',
          lastAnalysis: new Date().toISOString(),
          analysisQueue: Math.floor(Math.random() * 5),
          confidence: '87%'
        },
        data: {
          userDataLoaded: !!userData,
          activityEntries: userData?.activityData?.length || 0,
          lastUpdate: userData?.updatedAt || userData?.createdAt
        },
        performance: {
          avgResponseTime: Math.round(Math.random() * 200 + 100) + 'ms',
          successRate: '99.2%',
          errorRate: '0.8%'
        }
      }
    })
  } catch (error) {
    console.error('Status API error:', error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

// Initialize data storage on startup
initializeDataStorage().then(() => {
  console.log('✅ Data storage initialized')
}).catch(error => {
  console.error('❌ Failed to initialize data storage:', error)
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Campus AI Optimizer API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    features: [
      'Time Leakage Detection',
      'Predictive Analytics', 
      'Campus Optimization',
      'Privacy-First Processing'
    ]
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('API Error:', err.stack)
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error',
    timestamp: new Date().toISOString()
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
    availableEndpoints: [
      'GET /api/health',
      'GET /api/status', 
      'GET /api/dashboard',
      'GET /api/time-analysis',
      'GET /api/predictions',
      'GET /api/optimization',
      'GET /api/settings',
      'PUT /api/settings',
      'POST /api/activity',
      'POST /api/analyze',
      'GET /api/export',
      'DELETE /api/data'
    ]
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Campus AI Optimizer API running on port ${PORT}`)
  console.log(`📊 Dashboard: http://localhost:3000`)
  console.log(`🔗 API Health: http://localhost:${PORT}/api/health`)
  console.log(`📈 API Status: http://localhost:${PORT}/api/status`)
  console.log(`🧠 AI Features: Time Leakage Detection, Predictive Analytics, Campus Optimization`)
})
// Pattern analysis endpoint
app.get('/api/patterns', async (req, res) => {
  try {
    const { timeframe = 'daily' } = req.query
    const userData = await loadUserData()
    
    if (!userData || !userData.activityData) {
      return res.json({
        success: true,
        data: { message: 'No activity data available for pattern analysis' }
      })
    }
    
    const patterns = dataProcessor.detectPatterns(userData.activityData)
    const aggregatedData = dataProcessor.aggregateTimeData(userData.activityData, timeframe)
    
    res.json({
      success: true,
      data: {
        patterns,
        aggregatedData,
        timeframe,
        analysisDate: new Date().toISOString(),
        dataPoints: userData.activityData.length
      }
    })
  } catch (error) {
    console.error('Pattern analysis API error:', error)
    res.status(500).json({ success: false, message: 'Pattern analysis failed' })
  }
})

// Bulk activity data import
app.post('/api/activities/bulk', async (req, res) => {
  try {
    const { activities } = req.body
    
    if (!Array.isArray(activities)) {
      return res.status(400).json({
        success: false,
        message: 'Activities must be an array'
      })
    }
    
    const userData = await loadUserData()
    if (!userData) {
      return res.status(500).json({ success: false, message: 'Failed to load user data' })
    }
    
    const processedActivities = []
    const errors = []
    
    activities.forEach((activity, index) => {
      try {
        const processed = dataProcessor.processActivityData(activity)
        processedActivities.push(processed)
      } catch (error) {
        errors.push({ index, error: error.message })
      }
    })
    
    userData.activityData.push(...processedActivities)
    
    // Keep only last 1000 entries
    if (userData.activityData.length > 1000) {
      userData.activityData = userData.activityData.slice(-1000)
    }
    
    const saved = await saveUserData(userData)
    if (!saved) {
      return res.status(500).json({ success: false, message: 'Failed to save bulk activity data' })
    }
    
    res.json({
      success: true,
      message: `Bulk import completed`,
      data: {
        imported: processedActivities.length,
        errors: errors.length,
        errorDetails: errors.slice(0, 5), // Return first 5 errors
        totalActivities: userData.activityData.length
      }
    })
  } catch (error) {
    console.error('Bulk import API error:', error)
    res.status(500).json({ success: false, message: 'Bulk import failed' })
  }
})

// Get recent activities
app.get('/api/activities/recent', async (req, res) => {
  try {
    const { limit = 50 } = req.query
    const userData = await loadUserData()
    
    if (!userData || !userData.activityData) {
      return res.json({
        success: true,
        data: { activities: [], total: 0 }
      })
    }
    
    const recentActivities = userData.activityData
      .slice(-parseInt(limit))
      .reverse() // Most recent first
    
    res.json({
      success: true,
      data: {
        activities: recentActivities,
        total: userData.activityData.length,
        showing: recentActivities.length
      }
    })
  } catch (error) {
    console.error('Recent activities API error:', error)
    res.status(500).json({ success: false, message: 'Failed to fetch recent activities' })
  }
})

// Delete specific activity
app.delete('/api/activities/:activityId', async (req, res) => {
  try {
    const { activityId } = req.params
    const userData = await loadUserData()
    
    if (!userData || !userData.activityData) {
      return res.status(404).json({ success: false, message: 'No activity data found' })
    }
    
    const initialLength = userData.activityData.length
    userData.activityData = userData.activityData.filter(activity => activity.id !== activityId)
    
    if (userData.activityData.length === initialLength) {
      return res.status(404).json({ success: false, message: 'Activity not found' })
    }
    
    const saved = await saveUserData(userData)
    if (!saved) {
      return res.status(500).json({ success: false, message: 'Failed to delete activity' })
    }
    
    res.json({
      success: true,
      message: 'Activity deleted successfully',
      data: { remainingActivities: userData.activityData.length }
    })
  } catch (error) {
    console.error('Delete activity API error:', error)
    res.status(500).json({ success: false, message: 'Failed to delete activity' })
  }
})

// System diagnostics
app.get('/api/diagnostics', async (req, res) => {
  try {
    const userData = await loadUserData()
    const memoryUsage = process.memoryUsage()
    
    const diagnostics = {
      system: {
        nodeVersion: process.version,
        platform: process.platform,
        uptime: Math.round(process.uptime()),
        memory: {
          used: Math.round(memoryUsage.heapUsed / 1024 / 1024) + ' MB',
          total: Math.round(memoryUsage.heapTotal / 1024 / 1024) + ' MB',
          external: Math.round(memoryUsage.external / 1024 / 1024) + ' MB'
        }
      },
      data: {
        userDataExists: !!userData,
        activitiesCount: userData?.activityData?.length || 0,
        settingsConfigured: !!userData?.settings,
        lastUpdate: userData?.updatedAt || userData?.createdAt || 'Never',
        dataIntegrity: userData ? 'OK' : 'Missing'
      },
      ai: {
        engineStatus: 'Active',
        modelsLoaded: ['productivity', 'timeLeakage', 'burnout', 'optimization'],
        lastAnalysis: userData?.lastAnalysis?.timestamp || 'Never',
        analysisCount: userData?.analyses?.length || 0
      },
      performance: {
        avgResponseTime: '150ms',
        requestsHandled: Math.floor(Math.random() * 1000 + 500),
        errorRate: '0.2%',
        cacheHitRate: '94%'
      }
    }
    
    res.json({
      success: true,
      data: diagnostics,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Diagnostics API error:', error)
    res.status(500).json({ success: false, message: 'Diagnostics failed' })
  }
})