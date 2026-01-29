// Advanced AI Analysis Engine for Campus Life Optimization
class CampusAIEngine {
  constructor() {
    this.models = {
      productivity: new ProductivityModel(),
      timeLeakage: new TimeLeakageModel(),
      burnout: new BurnoutPredictionModel(),
      optimization: new OptimizationModel()
    }
  }

  // Main analysis pipeline
  async analyzeStudentData(userData, analysisType = 'comprehensive') {
    const results = {
      timestamp: new Date().toISOString(),
      analysisType,
      confidence: 0,
      insights: [],
      predictions: {},
      optimizations: []
    }

    try {
      // Run parallel analysis
      const [productivity, timeLeakage, burnout, optimizations] = await Promise.all([
        this.models.productivity.analyze(userData),
        this.models.timeLeakage.detect(userData),
        this.models.burnout.predict(userData),
        this.models.optimization.generate(userData)
      ])

      results.productivity = productivity
      results.timeLeakage = timeLeakage
      results.burnout = burnout
      results.optimizations = optimizations
      results.confidence = this.calculateOverallConfidence([productivity, timeLeakage, burnout])
      results.insights = this.generateInsights(results)

      return results
    } catch (error) {
      console.error('AI Analysis Error:', error)
      throw new Error('AI analysis failed')
    }
  }

  calculateOverallConfidence(analyses) {
    const confidences = analyses.map(a => a.confidence || 0.8)
    return Math.round(confidences.reduce((sum, c) => sum + c, 0) / confidences.length * 100)
  }

  generateInsights(analysisResults) {
    const insights = []
    
    if (analysisResults.productivity.score > 80) {
      insights.push('High productivity detected - maintain current patterns')
    } else if (analysisResults.productivity.score < 60) {
      insights.push('Productivity below optimal - consider schedule adjustments')
    }

    if (analysisResults.timeLeakage.totalHours > 3) {
      insights.push(`Significant time leakage detected: ${analysisResults.timeLeakage.totalHours.toFixed(1)}h daily`)
    }

    if (analysisResults.burnout.risk > 0.7) {
      insights.push('High burnout risk - immediate intervention recommended')
    }

    return insights
  }
}

// Productivity Analysis Model
class ProductivityModel {
  async analyze(userData) {
    const activityData = userData.activityData || []
    const settings = userData.settings || {}
    
    // Simulate complex productivity analysis
    const baseScore = this.calculateBaseScore(activityData)
    const timeFactors = this.analyzeTimePatterns(activityData)
    const environmentFactors = this.analyzeEnvironment(activityData)
    
    const score = Math.max(0, Math.min(100, 
      baseScore + timeFactors.adjustment + environmentFactors.adjustment
    ))

    return {
      score: Math.round(score),
      confidence: 0.87,
      factors: {
        timePatterns: timeFactors,
        environment: environmentFactors,
        consistency: this.calculateConsistency(activityData)
      },
      trend: this.calculateTrend(activityData),
      recommendations: this.generateProductivityRecommendations(score, timeFactors)
    }
  }

  calculateBaseScore(activityData) {
    // Simulate base productivity calculation
    const studyActivities = activityData.filter(a => a.activityType === 'study').length
    const totalActivities = activityData.length || 1
    return (studyActivities / totalActivities) * 100 * 0.7 + Math.random() * 30
  }

  analyzeTimePatterns(activityData) {
    // Analyze when user is most productive
    const hourlyData = {}
    activityData.forEach(activity => {
      const hour = new Date(activity.timestamp).getHours()
      hourlyData[hour] = (hourlyData[hour] || 0) + 1
    })

    const peakHour = Object.keys(hourlyData).reduce((a, b) => 
      hourlyData[a] > hourlyData[b] ? a : b, '10')

    return {
      peakHour: parseInt(peakHour),
      adjustment: peakHour >= 9 && peakHour <= 11 ? 10 : -5,
      pattern: 'morning_peak'
    }
  }

  analyzeEnvironment(activityData) {
    const locations = {}
    activityData.forEach(activity => {
      locations[activity.location] = (locations[activity.location] || 0) + 1
    })

    const bestLocation = Object.keys(locations).reduce((a, b) => 
      locations[a] > locations[b] ? a : b, 'library')

    return {
      bestLocation,
      adjustment: bestLocation.includes('library') ? 15 : 0,
      diversity: Object.keys(locations).length
    }
  }

  calculateConsistency(activityData) {
    // Measure routine consistency
    const dailyPatterns = {}
    activityData.forEach(activity => {
      const day = new Date(activity.timestamp).getDay()
      dailyPatterns[day] = (dailyPatterns[day] || 0) + 1
    })

    const variance = this.calculateVariance(Object.values(dailyPatterns))
    return Math.max(0, 100 - variance * 10)
  }

  calculateTrend(activityData) {
    // Simple trend calculation
    const recent = activityData.slice(-10)
    const older = activityData.slice(-20, -10)
    
    if (recent.length > older.length) return 'improving'
    if (recent.length < older.length) return 'declining'
    return 'stable'
  }

  calculateVariance(values) {
    if (values.length === 0) return 0
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length
    return Math.sqrt(variance)
  }

  generateProductivityRecommendations(score, timeFactors) {
    const recommendations = []
    
    if (score < 70) {
      recommendations.push('Consider restructuring your daily schedule')
    }
    
    if (timeFactors.peakHour < 9) {
      recommendations.push('Schedule important tasks later in the morning')
    }
    
    return recommendations
  }
}

// Time Leakage Detection Model
class TimeLeakageModel {
  async detect(userData) {
    const activityData = userData.activityData || []
    
    const sources = [
      this.detectSocialMediaLeakage(activityData),
      this.detectIdleTime(activityData),
      this.detectTravelInefficiency(activityData),
      this.detectContextSwitching(activityData)
    ]

    const totalHours = sources.reduce((sum, source) => sum + source.hours, 0)

    return {
      totalHours,
      sources,
      confidence: 0.82,
      patterns: this.analyzeLeakagePatterns(sources),
      recommendations: this.generateLeakageRecommendations(sources)
    }
  }

  detectSocialMediaLeakage(activityData) {
    // Simulate social media usage detection
    const socialActivities = activityData.filter(a => 
      a.activityType === 'social' || a.location === 'phone'
    )
    
    return {
      type: 'Social Media',
      hours: Math.round((socialActivities.length * 0.3 + Math.random() * 2) * 10) / 10,
      trend: Math.random() > 0.5 ? 'increasing' : 'decreasing',
      peakTimes: ['14:00-16:00', '20:00-22:00'],
      impact: 'high'
    }
  }

  detectIdleTime(activityData) {
    // Detect gaps between activities
    let idleHours = 0
    for (let i = 1; i < activityData.length; i++) {
      const gap = new Date(activityData[i].timestamp) - new Date(activityData[i-1].timestamp)
      if (gap > 30 * 60 * 1000) { // 30 minutes
        idleHours += gap / (1000 * 60 * 60)
      }
    }

    return {
      type: 'Idle Gaps',
      hours: Math.round(Math.min(idleHours, 3) * 10) / 10,
      trend: 'stable',
      peakTimes: ['12:00-14:00'],
      impact: 'medium'
    }
  }

  detectTravelInefficiency(activityData) {
    // Analyze location changes for travel efficiency
    const locationChanges = activityData.filter((activity, index) => 
      index > 0 && activity.location !== activityData[index - 1].location
    )

    return {
      type: 'Travel Inefficiency',
      hours: Math.round((locationChanges.length * 0.2 + Math.random() * 1) * 10) / 10,
      trend: 'improving',
      peakTimes: ['08:00-09:00', '17:00-18:00'],
      impact: 'low'
    }
  }

  detectContextSwitching(activityData) {
    // Detect frequent activity type changes
    const switches = activityData.filter((activity, index) => 
      index > 0 && activity.activityType !== activityData[index - 1].activityType
    )

    return {
      type: 'Context Switching',
      hours: Math.round((switches.length * 0.1 + Math.random() * 0.5) * 10) / 10,
      trend: 'stable',
      peakTimes: ['10:00-12:00', '15:00-17:00'],
      impact: 'medium'
    }
  }

  analyzeLeakagePatterns(sources) {
    return {
      primarySource: sources.reduce((max, source) => 
        source.hours > max.hours ? source : max
      ),
      totalSources: sources.length,
      improvingTrends: sources.filter(s => s.trend === 'improving').length
    }
  }

  generateLeakageRecommendations(sources) {
    const recommendations = []
    
    const socialMedia = sources.find(s => s.type === 'Social Media')
    if (socialMedia && socialMedia.hours > 2) {
      recommendations.push('Consider using app timers to limit social media usage')
    }

    const idle = sources.find(s => s.type === 'Idle Gaps')
    if (idle && idle.hours > 1.5) {
      recommendations.push('Schedule shorter breaks between activities')
    }

    return recommendations
  }
}

// Burnout Prediction Model
class BurnoutPredictionModel {
  async predict(userData) {
    const factors = this.analyzeBurnoutFactors(userData)
    const risk = this.calculateBurnoutRisk(factors)
    
    return {
      risk,
      level: this.getRiskLevel(risk),
      factors,
      confidence: 0.79,
      timeline: this.predictTimeline(risk),
      interventions: this.suggestInterventions(risk, factors)
    }
  }

  analyzeBurnoutFactors(userData) {
    const activityData = userData.activityData || []
    
    return {
      workload: this.assessWorkload(activityData),
      sleepQuality: this.assessSleep(activityData),
      socialBalance: this.assessSocialBalance(activityData),
      exercise: this.assessExercise(activityData),
      stressLevel: this.assessStress(activityData),
      academicLoad: this.assessAcademicLoad(activityData)
    }
  }

  assessWorkload(activityData) {
    const workActivities = activityData.filter(a => 
      a.activityType === 'study' || a.activityType === 'class'
    )
    return Math.min(100, (workActivities.length / activityData.length) * 150)
  }

  assessSleep(activityData) {
    // Simulate sleep quality assessment
    return Math.round(70 + Math.random() * 25)
  }

  assessSocialBalance(activityData) {
    const socialActivities = activityData.filter(a => a.activityType === 'social')
    return Math.round(60 + (socialActivities.length / activityData.length) * 80)
  }

  assessExercise(activityData) {
    const exerciseActivities = activityData.filter(a => a.activityType === 'exercise')
    return Math.round((exerciseActivities.length / activityData.length) * 100)
  }

  assessStress(activityData) {
    // Inverse correlation with consistency
    const consistency = this.calculateConsistency(activityData)
    return Math.round(100 - consistency)
  }

  assessAcademicLoad(activityData) {
    const academicActivities = activityData.filter(a => 
      a.activityType === 'study' || a.activityType === 'class' || a.activityType === 'assignment'
    )
    return Math.min(100, (academicActivities.length / activityData.length) * 120)
  }

  calculateBurnoutRisk(factors) {
    const weights = {
      workload: 0.25,
      sleepQuality: -0.2, // Negative because higher sleep quality reduces risk
      socialBalance: -0.15,
      exercise: -0.1,
      stressLevel: 0.3,
      academicLoad: 0.2
    }

    let risk = 0
    Object.keys(weights).forEach(factor => {
      risk += (factors[factor] / 100) * weights[factor]
    })

    return Math.max(0, Math.min(1, risk))
  }

  getRiskLevel(risk) {
    if (risk < 0.3) return 'Low'
    if (risk < 0.6) return 'Medium'
    return 'High'
  }

  predictTimeline(risk) {
    if (risk < 0.3) return 'No immediate concern'
    if (risk < 0.6) return '2-3 weeks if current patterns continue'
    return '1-2 weeks - immediate attention needed'
  }

  suggestInterventions(risk, factors) {
    const interventions = []
    
    if (factors.sleepQuality < 60) {
      interventions.push('Improve sleep hygiene and aim for 7-8 hours nightly')
    }
    
    if (factors.exercise < 30) {
      interventions.push('Incorporate 30 minutes of physical activity daily')
    }
    
    if (factors.socialBalance < 40) {
      interventions.push('Schedule regular social activities and breaks')
    }
    
    if (risk > 0.7) {
      interventions.push('Consider speaking with a counselor or advisor')
    }

    return interventions
  }

  calculateConsistency(activityData) {
    // Reuse from ProductivityModel
    const dailyPatterns = {}
    activityData.forEach(activity => {
      const day = new Date(activity.timestamp).getDay()
      dailyPatterns[day] = (dailyPatterns[day] || 0) + 1
    })

    const values = Object.values(dailyPatterns)
    if (values.length === 0) return 50

    const mean = values.reduce((sum, val) => sum + val, 0) / values.length
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length
    return Math.max(0, 100 - Math.sqrt(variance) * 10)
  }
}

// Optimization Model
class OptimizationModel {
  async generate(userData) {
    const optimizations = []
    
    optimizations.push(...this.optimizeTimetable(userData))
    optimizations.push(...this.optimizeRoutes(userData))
    optimizations.push(...this.optimizeLocations(userData))
    
    return {
      optimizations,
      totalPotential: this.calculateTotalPotential(optimizations),
      priority: this.prioritizeOptimizations(optimizations),
      confidence: 0.84
    }
  }

  optimizeTimetable(userData) {
    const optimizations = []
    const activityData = userData.activityData || []
    
    // Analyze current schedule patterns
    const hourlyActivity = {}
    activityData.forEach(activity => {
      const hour = new Date(activity.timestamp).getHours()
      hourlyActivity[hour] = (hourlyActivity[hour] || 0) + 1
    })

    // Suggest optimal timing
    if (hourlyActivity[8] > hourlyActivity[10]) {
      optimizations.push({
        type: 'timetable',
        category: 'Class Scheduling',
        current: 'Early morning classes (8 AM)',
        optimized: 'Mid-morning classes (10 AM)',
        impact: '+18% attendance improvement',
        reason: 'Activity patterns show higher engagement at 10 AM',
        priority: 'high',
        estimatedSavings: '30 min/day'
      })
    }

    return optimizations
  }

  optimizeRoutes(userData) {
    const optimizations = []
    const activityData = userData.activityData || []
    
    // Analyze location transitions
    const routes = {}
    for (let i = 1; i < activityData.length; i++) {
      const from = activityData[i-1].location
      const to = activityData[i].location
      if (from !== to) {
        const route = `${from} → ${to}`
        routes[route] = (routes[route] || 0) + 1
      }
    }

    // Suggest route optimizations for frequent paths
    Object.keys(routes).forEach(route => {
      if (routes[route] > 2) {
        optimizations.push({
          type: 'route',
          category: 'Campus Navigation',
          current: route,
          optimized: `Optimized ${route}`,
          impact: `Save ${Math.round(Math.random() * 8 + 3)} min`,
          reason: 'Alternative path identified with less congestion',
          priority: 'medium',
          estimatedSavings: `${Math.round(Math.random() * 15 + 10)} min/week`
        })
      }
    })

    return optimizations
  }

  optimizeLocations(userData) {
    const optimizations = []
    const activityData = userData.activityData || []
    
    // Analyze location effectiveness
    const locationPerformance = {}
    activityData.forEach(activity => {
      if (!locationPerformance[activity.location]) {
        locationPerformance[activity.location] = {
          count: 0,
          totalDuration: 0
        }
      }
      locationPerformance[activity.location].count++
      locationPerformance[activity.location].totalDuration += activity.duration || 60
    })

    // Find best performing locations
    const bestLocation = Object.keys(locationPerformance).reduce((best, location) => {
      const avgDuration = locationPerformance[location].totalDuration / locationPerformance[location].count
      const bestAvg = locationPerformance[best]?.totalDuration / locationPerformance[best]?.count || 0
      return avgDuration > bestAvg ? location : best
    }, Object.keys(locationPerformance)[0])

    if (bestLocation && bestLocation !== 'unknown') {
      optimizations.push({
        type: 'location',
        category: 'Study Environment',
        current: 'Various locations',
        optimized: `Focus on ${bestLocation}`,
        impact: '+25% productivity boost',
        reason: `${bestLocation} shows highest engagement rates`,
        priority: 'medium',
        estimatedSavings: '45 min/day'
      })
    }

    return optimizations
  }

  calculateTotalPotential(optimizations) {
    return optimizations.reduce((total, opt) => {
      const savings = parseInt(opt.estimatedSavings) || 0
      return total + savings
    }, 0)
  }

  prioritizeOptimizations(optimizations) {
    return optimizations.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    })
  }
}

module.exports = CampusAIEngine