// Data Processing Utilities for Campus AI Optimizer
const fs = require('fs').promises
const path = require('path')

class DataProcessor {
  constructor() {
    this.dataValidationRules = {
      activity: {
        required: ['activityType', 'duration'],
        optional: ['location', 'timestamp', 'metadata'],
        types: {
          activityType: 'string',
          duration: 'number',
          location: 'string',
          timestamp: 'string'
        }
      },
      settings: {
        required: ['privacy', 'notifications', 'ai'],
        types: {
          privacy: 'object',
          notifications: 'object',
          ai: 'object'
        }
      }
    }
  }

  // Validate incoming data
  validateData(data, type) {
    const rules = this.dataValidationRules[type]
    if (!rules) {
      throw new Error(`Unknown data type: ${type}`)
    }

    const errors = []

    // Check required fields
    rules.required.forEach(field => {
      if (!(field in data)) {
        errors.push(`Missing required field: ${field}`)
      }
    })

    // Check data types
    Object.keys(rules.types).forEach(field => {
      if (field in data) {
        const expectedType = rules.types[field]
        const actualType = typeof data[field]
        
        if (expectedType === 'object' && actualType !== 'object') {
          errors.push(`Field ${field} must be an object`)
        } else if (expectedType !== 'object' && actualType !== expectedType) {
          errors.push(`Field ${field} must be of type ${expectedType}`)
        }
      }
    })

    if (errors.length > 0) {
      throw new Error(`Validation errors: ${errors.join(', ')}`)
    }

    return true
  }

  // Sanitize and normalize activity data
  processActivityData(rawActivity) {
    this.validateData(rawActivity, 'activity')

    const processed = {
      id: this.generateId(),
      activityType: this.sanitizeString(rawActivity.activityType),
      duration: Math.max(0, Math.min(1440, rawActivity.duration)), // 0-1440 minutes (24 hours)
      location: this.sanitizeString(rawActivity.location || 'unknown'),
      timestamp: rawActivity.timestamp || new Date().toISOString(),
      processed: true,
      processingVersion: '1.0',
      metadata: this.sanitizeMetadata(rawActivity.metadata || {})
    }

    // Add derived fields
    processed.hour = new Date(processed.timestamp).getHours()
    processed.dayOfWeek = new Date(processed.timestamp).getDay()
    processed.category = this.categorizeActivity(processed.activityType)

    return processed
  }

  // Categorize activities for analysis
  categorizeActivity(activityType) {
    const categories = {
      academic: ['study', 'class', 'lecture', 'assignment', 'research', 'lab'],
      social: ['social', 'friends', 'party', 'club', 'meeting'],
      personal: ['meal', 'sleep', 'exercise', 'commute', 'shopping'],
      leisure: ['entertainment', 'gaming', 'tv', 'music', 'reading'],
      digital: ['social_media', 'phone', 'internet', 'email']
    }

    for (const [category, activities] of Object.entries(categories)) {
      if (activities.some(activity => 
        activityType.toLowerCase().includes(activity.toLowerCase())
      )) {
        return category
      }
    }

    return 'other'
  }

  // Process and aggregate time-series data
  aggregateTimeData(activities, timeframe = 'daily') {
    const aggregated = {}

    activities.forEach(activity => {
      let key
      const date = new Date(activity.timestamp)

      switch (timeframe) {
        case 'hourly':
          key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}`
          break
        case 'daily':
          key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
          break
        case 'weekly':
          const weekStart = new Date(date)
          weekStart.setDate(date.getDate() - date.getDay())
          key = `${weekStart.getFullYear()}-W${Math.ceil(weekStart.getDate() / 7)}`
          break
        default:
          key = 'total'
      }

      if (!aggregated[key]) {
        aggregated[key] = {
          totalDuration: 0,
          activities: [],
          categories: {},
          locations: {},
          productivity: 0
        }
      }

      aggregated[key].totalDuration += activity.duration
      aggregated[key].activities.push(activity)
      
      // Aggregate by category
      const category = activity.category
      aggregated[key].categories[category] = (aggregated[key].categories[category] || 0) + activity.duration

      // Aggregate by location
      const location = activity.location
      aggregated[key].locations[location] = (aggregated[key].locations[location] || 0) + activity.duration

      // Calculate productivity score
      aggregated[key].productivity = this.calculateProductivityScore(aggregated[key].categories)
    })

    return aggregated
  }

  // Calculate productivity score based on activity categories
  calculateProductivityScore(categories) {
    const weights = {
      academic: 1.0,
      personal: 0.6,
      social: 0.4,
      leisure: 0.2,
      digital: -0.3,
      other: 0.3
    }

    let totalWeightedTime = 0
    let totalTime = 0

    Object.keys(categories).forEach(category => {
      const time = categories[category]
      const weight = weights[category] || 0
      totalWeightedTime += time * weight
      totalTime += time
    })

    if (totalTime === 0) return 0
    
    // Normalize to 0-100 scale
    const rawScore = (totalWeightedTime / totalTime) * 100
    return Math.max(0, Math.min(100, rawScore + 50)) // Shift to positive range
  }

  // Detect patterns in activity data
  detectPatterns(activities) {
    const patterns = {
      timePatterns: this.detectTimePatterns(activities),
      locationPatterns: this.detectLocationPatterns(activities),
      activityPatterns: this.detectActivityPatterns(activities),
      consistencyPatterns: this.detectConsistencyPatterns(activities)
    }

    return patterns
  }

  detectTimePatterns(activities) {
    const hourlyDistribution = {}
    const dailyDistribution = {}

    activities.forEach(activity => {
      const hour = activity.hour
      const day = activity.dayOfWeek

      hourlyDistribution[hour] = (hourlyDistribution[hour] || 0) + activity.duration
      dailyDistribution[day] = (dailyDistribution[day] || 0) + activity.duration
    })

    return {
      peakHours: this.findPeaks(hourlyDistribution),
      peakDays: this.findPeaks(dailyDistribution),
      hourlyDistribution,
      dailyDistribution
    }
  }

  detectLocationPatterns(activities) {
    const locationFrequency = {}
    const locationProductivity = {}

    activities.forEach(activity => {
      const location = activity.location
      locationFrequency[location] = (locationFrequency[location] || 0) + 1
      
      if (!locationProductivity[location]) {
        locationProductivity[location] = { totalDuration: 0, academicDuration: 0 }
      }
      
      locationProductivity[location].totalDuration += activity.duration
      if (activity.category === 'academic') {
        locationProductivity[location].academicDuration += activity.duration
      }
    })

    // Calculate productivity ratio for each location
    Object.keys(locationProductivity).forEach(location => {
      const data = locationProductivity[location]
      data.productivityRatio = data.totalDuration > 0 ? 
        data.academicDuration / data.totalDuration : 0
    })

    return {
      mostFrequent: this.findTop(locationFrequency, 3),
      mostProductive: this.findTop(
        Object.fromEntries(
          Object.entries(locationProductivity).map(([loc, data]) => [loc, data.productivityRatio])
        ), 3
      ),
      locationFrequency,
      locationProductivity
    }
  }

  detectActivityPatterns(activities) {
    const activityFrequency = {}
    const categoryDistribution = {}
    const transitions = {}

    activities.forEach((activity, index) => {
      // Activity frequency
      activityFrequency[activity.activityType] = (activityFrequency[activity.activityType] || 0) + 1
      
      // Category distribution
      categoryDistribution[activity.category] = (categoryDistribution[activity.category] || 0) + activity.duration

      // Activity transitions
      if (index > 0) {
        const prevActivity = activities[index - 1].activityType
        const currentActivity = activity.activityType
        const transition = `${prevActivity} → ${currentActivity}`
        transitions[transition] = (transitions[transition] || 0) + 1
      }
    })

    return {
      mostFrequentActivities: this.findTop(activityFrequency, 5),
      categoryDistribution,
      commonTransitions: this.findTop(transitions, 5),
      diversityScore: Object.keys(activityFrequency).length
    }
  }

  detectConsistencyPatterns(activities) {
    // Group activities by day
    const dailyActivities = {}
    activities.forEach(activity => {
      const date = new Date(activity.timestamp).toDateString()
      if (!dailyActivities[date]) {
        dailyActivities[date] = []
      }
      dailyActivities[date].push(activity)
    })

    // Calculate consistency metrics
    const dailyDurations = Object.values(dailyActivities).map(dayActivities => 
      dayActivities.reduce((sum, activity) => sum + activity.duration, 0)
    )

    const consistencyScore = this.calculateConsistencyScore(dailyDurations)
    const routineStability = this.calculateRoutineStability(dailyActivities)

    return {
      consistencyScore,
      routineStability,
      averageDailyDuration: dailyDurations.reduce((sum, d) => sum + d, 0) / dailyDurations.length,
      varianceInDailyDuration: this.calculateVariance(dailyDurations)
    }
  }

  // Utility functions
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  sanitizeString(str) {
    if (typeof str !== 'string') return 'unknown'
    return str.trim().toLowerCase().replace(/[^a-z0-9\s_-]/gi, '')
  }

  sanitizeMetadata(metadata) {
    if (typeof metadata !== 'object') return {}
    
    const sanitized = {}
    Object.keys(metadata).forEach(key => {
      if (typeof key === 'string' && key.length < 50) {
        const value = metadata[key]
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
          sanitized[this.sanitizeString(key)] = value
        }
      }
    })
    
    return sanitized
  }

  findPeaks(distribution) {
    const entries = Object.entries(distribution).map(([key, value]) => ({
      key: parseInt(key),
      value
    }))
    
    return entries
      .sort((a, b) => b.value - a.value)
      .slice(0, 3)
      .map(entry => entry.key)
  }

  findTop(obj, count = 5) {
    return Object.entries(obj)
      .sort(([,a], [,b]) => b - a)
      .slice(0, count)
      .map(([key, value]) => ({ key, value }))
  }

  calculateVariance(values) {
    if (values.length === 0) return 0
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length
    return variance
  }

  calculateConsistencyScore(values) {
    if (values.length < 2) return 100
    const variance = this.calculateVariance(values)
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length
    const coefficientOfVariation = mean > 0 ? Math.sqrt(variance) / mean : 0
    return Math.max(0, 100 - coefficientOfVariation * 100)
  }

  calculateRoutineStability(dailyActivities) {
    const days = Object.keys(dailyActivities)
    if (days.length < 2) return 100

    let totalSimilarity = 0
    let comparisons = 0

    for (let i = 0; i < days.length - 1; i++) {
      for (let j = i + 1; j < days.length; j++) {
        const similarity = this.calculateDaySimilarity(
          dailyActivities[days[i]], 
          dailyActivities[days[j]]
        )
        totalSimilarity += similarity
        comparisons++
      }
    }

    return comparisons > 0 ? totalSimilarity / comparisons : 0
  }

  calculateDaySimilarity(day1, day2) {
    const activities1 = day1.map(a => a.activityType).sort()
    const activities2 = day2.map(a => a.activityType).sort()
    
    const commonActivities = activities1.filter(a => activities2.includes(a))
    const totalUniqueActivities = new Set([...activities1, ...activities2]).size
    
    return totalUniqueActivities > 0 ? (commonActivities.length / totalUniqueActivities) * 100 : 0
  }

  // Export processed data
  async exportData(userData, format = 'json') {
    const exportData = {
      exportInfo: {
        timestamp: new Date().toISOString(),
        version: '1.0',
        format,
        userId: userData.userId
      },
      userData: {
        ...userData,
        processedStats: this.generateProcessedStats(userData.activityData || [])
      }
    }

    switch (format) {
      case 'json':
        return JSON.stringify(exportData, null, 2)
      case 'csv':
        return this.convertToCSV(userData.activityData || [])
      default:
        throw new Error(`Unsupported export format: ${format}`)
    }
  }

  convertToCSV(activities) {
    if (activities.length === 0) return 'No data available'

    const headers = ['timestamp', 'activityType', 'duration', 'location', 'category', 'hour', 'dayOfWeek']
    const csvRows = [headers.join(',')]

    activities.forEach(activity => {
      const row = headers.map(header => {
        const value = activity[header] || ''
        return typeof value === 'string' ? `"${value}"` : value
      })
      csvRows.push(row.join(','))
    })

    return csvRows.join('\n')
  }

  generateProcessedStats(activities) {
    return {
      totalActivities: activities.length,
      dateRange: {
        start: activities.length > 0 ? activities[0].timestamp : null,
        end: activities.length > 0 ? activities[activities.length - 1].timestamp : null
      },
      categories: this.aggregateByField(activities, 'category'),
      locations: this.aggregateByField(activities, 'location'),
      averageDuration: activities.length > 0 ? 
        activities.reduce((sum, a) => sum + a.duration, 0) / activities.length : 0
    }
  }

  aggregateByField(activities, field) {
    const aggregated = {}
    activities.forEach(activity => {
      const value = activity[field] || 'unknown'
      aggregated[value] = (aggregated[value] || 0) + 1
    })
    return aggregated
  }
}

module.exports = DataProcessor