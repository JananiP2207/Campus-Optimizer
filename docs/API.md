# Campus AI Optimizer API Documentation

## Overview
The Campus AI Optimizer API provides endpoints for student productivity analysis, time leakage detection, and campus life optimization.

## Base URL
`http://localhost:5000/api`

## Authentication
Currently, no authentication is required for development. In production, implement proper authentication.

## Endpoints

### Health & Status
- `GET /health` - API health check
- `GET /status` - System status and metrics
- `GET /diagnostics` - Detailed system diagnostics

### Dashboard
- `GET /dashboard` - Main dashboard data with insights and metrics

### Time Analysis
- `GET /time-analysis` - Time leakage detection and analysis
- `GET /patterns` - Activity pattern analysis

### AI Predictions
- `GET /predictions` - Burnout risk and productivity predictions
- `POST /analyze` - Run comprehensive AI analysis

### Optimization
- `GET /optimization` - Timetable and route optimization suggestions

### Activity Management
- `POST /activity` - Submit single activity data
- `POST /activities/bulk` - Bulk import activities
- `GET /activities/recent` - Get recent activities
- `DELETE /activities/:id` - Delete specific activity

### Settings
- `GET /settings` - Get user settings
- `PUT /settings` - Update user settings

### Data Management
- `GET /export` - Export user data (JSON/CSV)
- `DELETE /data` - Delete all user data

## Data Models

### Activity Data
```json
{
  "activityType": "study",
  "duration": 120,
  "location": "library",
  "timestamp": "2026-01-29T10:00:00.000Z"
}
```

### Settings
```json
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
```

## Error Handling
All endpoints return standardized error responses:
```json
{
  "success": false,
  "message": "Error description",
  "timestamp": "2026-01-29T10:00:00.000Z"
}
```

## Rate Limiting
- 100 requests per 15-minute window per IP
- Bulk operations have separate limits

## Privacy & Security
- All data processing happens locally
- No personal messages or private content accessed
- Location data is anonymized
- User controls all data collection settings
