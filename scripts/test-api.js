// API Testing Script for Campus AI Optimizer
const axios = require('axios')

const API_BASE = 'http://localhost:5000/api'

class APITester {
  constructor() {
    this.results = {
      passed: 0,
      failed: 0,
      tests: []
    }
  }

  async runTest(name, testFn) {
    try {
      console.log(`🧪 Testing: ${name}`)
      await testFn()
      this.results.passed++
      this.results.tests.push({ name, status: 'PASSED' })
      console.log(`✅ ${name} - PASSED\n`)
    } catch (error) {
      this.results.failed++
      this.results.tests.push({ name, status: 'FAILED', error: error.message })
      console.log(`❌ ${name} - FAILED: ${error.message}\n`)
    }
  }

  async testHealthCheck() {
    const response = await axios.get(`${API_BASE}/health`)
    if (response.status !== 200) throw new Error('Health check failed')
    if (!response.data.success) throw new Error('Health check returned success: false')
  }

  async testDashboard() {
    const response = await axios.get(`${API_BASE}/dashboard`)
    if (response.status !== 200) throw new Error('Dashboard endpoint failed')
    if (!response.data.data.insights) throw new Error('Dashboard missing insights')
  }

  async testTimeAnalysis() {
    const response = await axios.get(`${API_BASE}/time-analysis`)
    if (response.status !== 200) throw new Error('Time analysis endpoint failed')
    if (!response.data.data.timeDistribution) throw new Error('Time analysis missing distribution data')
  }

  async testPredictions() {
    const response = await axios.get(`${API_BASE}/predictions`)
    if (response.status !== 200) throw new Error('Predictions endpoint failed')
    if (!response.data.data.weeklyPredictions) throw new Error('Predictions missing weekly data')
  }

  async testOptimization() {
    const response = await axios.get(`${API_BASE}/optimization`)
    if (response.status !== 200) throw new Error('Optimization endpoint failed')
    if (!response.data.data.timetableOptimizations) throw new Error('Optimization missing timetable data')
  }

  async testActivitySubmission() {
    const activityData = {
      activityType: 'study',
      duration: 120,
      location: 'library',
      timestamp: new Date().toISOString()
    }
    
    const response = await axios.post(`${API_BASE}/activity`, activityData)
    if (response.status !== 200) throw new Error('Activity submission failed')
    if (!response.data.data.activityId) throw new Error('Activity submission missing ID')
  }

  async testAIAnalysis() {
    const analysisData = {
      dataType: 'productivity',
      timeRange: 'week',
      analysisType: 'comprehensive'
    }
    
    const response = await axios.post(`${API_BASE}/analyze`, analysisData)
    if (response.status !== 200) throw new Error('AI analysis failed')
    if (!response.data.data.results) throw new Error('AI analysis missing results')
  }

  async testSettings() {
    // Test GET settings
    const getResponse = await axios.get(`${API_BASE}/settings`)
    if (getResponse.status !== 200) throw new Error('Settings GET failed')
    
    // Test PUT settings
    const settingsUpdate = {
      privacy: { dataCollection: true },
      notifications: { productivityAlerts: false }
    }
    
    const putResponse = await axios.put(`${API_BASE}/settings`, settingsUpdate)
    if (putResponse.status !== 200) throw new Error('Settings PUT failed')
  }

  async testPatterns() {
    const response = await axios.get(`${API_BASE}/patterns?timeframe=daily`)
    if (response.status !== 200) throw new Error('Patterns endpoint failed')
  }

  async testDiagnostics() {
    const response = await axios.get(`${API_BASE}/diagnostics`)
    if (response.status !== 200) throw new Error('Diagnostics endpoint failed')
    if (!response.data.data.system) throw new Error('Diagnostics missing system info')
  }

  async testRecentActivities() {
    const response = await axios.get(`${API_BASE}/activities/recent?limit=10`)
    if (response.status !== 200) throw new Error('Recent activities endpoint failed')
    if (!response.data.data.activities) throw new Error('Recent activities missing data')
  }

  async runAllTests() {
    console.log('🚀 Starting Campus AI Optimizer API Tests\n')
    
    await this.runTest('Health Check', () => this.testHealthCheck())
    await this.runTest('Dashboard Data', () => this.testDashboard())
    await this.runTest('Time Analysis', () => this.testTimeAnalysis())
    await this.runTest('AI Predictions', () => this.testPredictions())
    await this.runTest('Optimization Suggestions', () => this.testOptimization())
    await this.runTest('Activity Submission', () => this.testActivitySubmission())
    await this.runTest('AI Analysis', () => this.testAIAnalysis())
    await this.runTest('Settings Management', () => this.testSettings())
    await this.runTest('Pattern Detection', () => this.testPatterns())
    await this.runTest('System Diagnostics', () => this.testDiagnostics())
    await this.runTest('Recent Activities', () => this.testRecentActivities())
    
    this.printResults()
  }

  printResults() {
    console.log('📊 Test Results Summary')
    console.log('========================')
    console.log(`✅ Passed: ${this.results.passed}`)
    console.log(`❌ Failed: ${this.results.failed}`)
    console.log(`📈 Success Rate: ${Math.round((this.results.passed / (this.results.passed + this.results.failed)) * 100)}%`)
    
    if (this.results.failed > 0) {
      console.log('\n❌ Failed Tests:')
      this.results.tests
        .filter(test => test.status === 'FAILED')
        .forEach(test => console.log(`   - ${test.name}: ${test.error}`))
    }
    
    console.log('\n🎉 API testing completed!')
  }
}

// Run tests if this script is executed directly
if (require.main === module) {
  const tester = new APITester()
  
  // Check if server is running
  axios.get(`${API_BASE}/health`)
    .then(() => {
      console.log('✅ Server is running, starting tests...\n')
      return tester.runAllTests()
    })
    .catch(() => {
      console.log('❌ Server is not running!')
      console.log('Please start the server with: npm run server')
      console.log('Then run tests with: npm run test:api')
      process.exit(1)
    })
}

module.exports = APITester