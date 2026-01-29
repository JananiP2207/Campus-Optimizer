// Setup Script for Campus AI Optimizer
const fs = require('fs').promises
const path = require('path')

class ProjectSetup {
  constructor() {
    this.setupSteps = []
  }

  async createDirectories() {
    const directories = [
      'server/data',
      'server/logs',
      'public/assets',
      'src/assets',
      'docs'
    ]

    for (const dir of directories) {
      try {
        await fs.mkdir(dir, { recursive: true })
        console.log(`✅ Created directory: ${dir}`)
      } catch (error) {
        console.log(`⚠️  Directory ${dir} already exists or failed to create`)
      }
    }
  }

  async createEnvFile() {
    const envContent = `# Campus AI Optimizer Environment Variables
NODE_ENV=development
PORT=5000
API_BASE_URL=http://localhost:5000/api

# AI Configuration
AI_CONFIDENCE_THRESHOLD=0.75
MAX_ACTIVITY_ENTRIES=1000
ANALYSIS_CACHE_TTL=300

# Security
CORS_ORIGIN=http://localhost:3000
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX=100

# Logging
LOG_LEVEL=info
LOG_FILE=server/logs/app.log

# Data Storage
DATA_RETENTION_DAYS=365
BACKUP_INTERVAL_HOURS=24
`

    try {
      await fs.access('.env')
      console.log('⚠️  .env file already exists, skipping creation')
    } catch {
      await fs.writeFile('.env', envContent)
      console.log('✅ Created .env file with default configuration')
    }
  }

  async createGitignore() {
    const gitignoreContent = `# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Production builds
dist/
build/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Data files
server/data/
server/logs/

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db

# Temporary files
*.tmp
*.temp
.cache/

# Coverage reports
coverage/
.nyc_output/

# Runtime data
pids
*.pid
*.seed
*.pid.lock
`

    try {
      await fs.access('.gitignore')
      console.log('⚠️  .gitignore file already exists, skipping creation')
    } catch {
      await fs.writeFile('.gitignore', gitignoreContent)
      console.log('✅ Created .gitignore file')
    }
  }

  async createDocumentation() {
    const apiDocsContent = `# Campus AI Optimizer API Documentation

## Overview
The Campus AI Optimizer API provides endpoints for student productivity analysis, time leakage detection, and campus life optimization.

## Base URL
\`http://localhost:5000/api\`

## Authentication
Currently, no authentication is required for development. In production, implement proper authentication.

## Endpoints

### Health & Status
- \`GET /health\` - API health check
- \`GET /status\` - System status and metrics
- \`GET /diagnostics\` - Detailed system diagnostics

### Dashboard
- \`GET /dashboard\` - Main dashboard data with insights and metrics

### Time Analysis
- \`GET /time-analysis\` - Time leakage detection and analysis
- \`GET /patterns\` - Activity pattern analysis

### AI Predictions
- \`GET /predictions\` - Burnout risk and productivity predictions
- \`POST /analyze\` - Run comprehensive AI analysis

### Optimization
- \`GET /optimization\` - Timetable and route optimization suggestions

### Activity Management
- \`POST /activity\` - Submit single activity data
- \`POST /activities/bulk\` - Bulk import activities
- \`GET /activities/recent\` - Get recent activities
- \`DELETE /activities/:id\` - Delete specific activity

### Settings
- \`GET /settings\` - Get user settings
- \`PUT /settings\` - Update user settings

### Data Management
- \`GET /export\` - Export user data (JSON/CSV)
- \`DELETE /data\` - Delete all user data

## Data Models

### Activity Data
\`\`\`json
{
  "activityType": "study",
  "duration": 120,
  "location": "library",
  "timestamp": "2026-01-29T10:00:00.000Z"
}
\`\`\`

### Settings
\`\`\`json
{
  "privacy": {
    "dataCollection": true,
    "locationTracking": true
  },
  "notifications": {
    "productivityAlerts": true,
    "burnoutWarnings": true
  },
  "ai": {
    "predictionAccuracy": "balanced",
    "analysisDepth": "detailed"
  }
}
\`\`\`

## Error Handling
All endpoints return standardized error responses:
\`\`\`json
{
  "success": false,
  "message": "Error description",
  "timestamp": "2026-01-29T10:00:00.000Z"
}
\`\`\`

## Rate Limiting
- 100 requests per 15-minute window per IP
- Bulk operations have separate limits

## Privacy & Security
- All data processing happens locally
- No personal messages or private content accessed
- Location data is anonymized
- User controls all data collection settings
`

    try {
      await fs.writeFile('docs/API.md', apiDocsContent)
      console.log('✅ Created API documentation')
    } catch (error) {
      console.log('⚠️  Failed to create API documentation:', error.message)
    }
  }

  async createSampleData() {
    const sampleActivities = [
      {
        activityType: 'study',
        duration: 120,
        location: 'library',
        timestamp: new Date(Date.now() - 86400000).toISOString() // 1 day ago
      },
      {
        activityType: 'class',
        duration: 90,
        location: 'classroom_a',
        timestamp: new Date(Date.now() - 82800000).toISOString() // 23 hours ago
      },
      {
        activityType: 'social_media',
        duration: 45,
        location: 'dorm',
        timestamp: new Date(Date.now() - 79200000).toISOString() // 22 hours ago
      },
      {
        activityType: 'exercise',
        duration: 60,
        location: 'gym',
        timestamp: new Date(Date.now() - 75600000).toISOString() // 21 hours ago
      },
      {
        activityType: 'meal',
        duration: 30,
        location: 'cafeteria',
        timestamp: new Date(Date.now() - 72000000).toISOString() // 20 hours ago
      }
    ]

    const sampleDataContent = JSON.stringify({
      description: 'Sample activity data for testing Campus AI Optimizer',
      activities: sampleActivities,
      usage: 'Import this data using POST /api/activities/bulk'
    }, null, 2)

    try {
      await fs.writeFile('docs/sample-data.json', sampleDataContent)
      console.log('✅ Created sample data file')
    } catch (error) {
      console.log('⚠️  Failed to create sample data:', error.message)
    }
  }

  async validateSetup() {
    const requiredFiles = [
      'package.json',
      'vite.config.js',
      'tailwind.config.js',
      'server/index.js',
      'server/utils/aiEngine.js',
      'server/utils/dataProcessor.js',
      'src/App.jsx',
      'src/main.jsx'
    ]

    let allFilesExist = true

    for (const file of requiredFiles) {
      try {
        await fs.access(file)
        console.log(`✅ ${file} exists`)
      } catch {
        console.log(`❌ ${file} is missing`)
        allFilesExist = false
      }
    }

    return allFilesExist
  }

  async run() {
    console.log('🚀 Setting up Campus AI Optimizer project...\n')

    console.log('📁 Creating directories...')
    await this.createDirectories()

    console.log('\n⚙️  Creating configuration files...')
    await this.createEnvFile()
    await this.createGitignore()

    console.log('\n📚 Creating documentation...')
    await this.createDocumentation()
    await this.createSampleData()

    console.log('\n🔍 Validating setup...')
    const isValid = await this.validateSetup()

    console.log('\n' + '='.repeat(50))
    if (isValid) {
      console.log('✅ Project setup completed successfully!')
      console.log('\n🎯 Next steps:')
      console.log('1. Install dependencies: npm install')
      console.log('2. Start development servers: npm run dev:full')
      console.log('3. Test API endpoints: npm run test:api')
      console.log('4. Open browser: http://localhost:3000')
    } else {
      console.log('❌ Project setup incomplete - some files are missing')
      console.log('Please check the error messages above')
    }
    console.log('='.repeat(50))
  }
}

// Run setup if this script is executed directly
if (require.main === module) {
  const setup = new ProjectSetup()
  setup.run().catch(error => {
    console.error('Setup failed:', error)
    process.exit(1)
  })
}

module.exports = ProjectSetup