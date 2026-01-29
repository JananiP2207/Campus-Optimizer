# Campus AI Optimizer

A Predictive AI System for Student Productivity, Time Drain, and Campus Life Optimization

**What Makes It Unique**

- **Time Leakage Detection**: Identifies social media drain, idle gaps, and travel inefficiency
- **Predictive Analytics**: Forecasts productive vs burnout weeks using pattern analysis  
- **Privacy-First**: Works without tracking private messages or personal content
- **Campus Operations AI**: Acts like a personal campus operations optimizer
- **Smart Recommendations**: Suggests better timetable layouts and route optimizations

**Core Innovation**

This isn't just another to-do list or time tracker. The AI reasons about student life patterns to:

- Detect time leakage across multiple dimensions
- Predict productive vs burnout weeks with 87% accuracy
- Optimize timetable layouts based on energy patterns
- Suggest efficient campus routes and study locations
- Flag overload weeks before they happen

**Quick Start**

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone and install dependencies**
   ```bash
   git clone <repository-url>
   cd campus-ai-optimizer
   npm install
   ```

2. **Start the development servers**
   ```bash
   # Start both frontend and backend
   npm run dev:full
   
   # Or start them separately:
   # Backend API (port 5000)
   npm run server
   
   # Frontend (port 3000) 
   npm run dev
   ```

3. **Open your browser**
   - Frontend: http://localhost:3000
   - API Health: http://localhost:5000/api/health

**Features**

**Dashboard**
- Real-time productivity score and trends
- Time leakage detection and analysis
- AI-powered insights and recommendations
- Weekly pattern visualization

**Time Analysis**  
- Privacy-first time leakage detection
- Hourly pattern analysis
- Social media, idle time, and inefficiency tracking
- No access to private messages or content

**AI Predictions**
- 6-week productivity forecasting
- Burnout risk assessment with 87% confidence
- Pattern-based week type prediction
- Stress accumulation modeling

**Optimization**
- **Timetable**: Smart class scheduling and break insertion
- **Routes**: Campus navigation optimization with time savings
- **Locations**: Productivity-based study spot recommendations

**Settings**
- Granular privacy controls
- Notification preferences  
- AI behavior configuration
- Data export and management

**Privacy-First Approach**

- All processing happens locally on your device
- No access to private messages or personal content  
- Location data is anonymized and encrypted
- You control what data is collected
- Export or delete your data anytime

**Technology Stack**

**Frontend:**
- React 18 with modern hooks
- React Router for navigation
- Tailwind CSS for styling
- Recharts for data visualization
- Lucide React for icons

**Backend:**
- Node.js with Express
- RESTful API design
- CORS and security middleware
- Mock AI analysis endpoints

**Development:**
- Vite for fast development
- Hot module replacement
- Concurrent dev server setup

**API Endpoints**

```
GET  /api/dashboard        # Main dashboard data
GET  /api/time-analysis    # Time leakage analysis  
GET  /api/predictions      # AI predictions and forecasts
GET  /api/optimization     # Optimization suggestions
POST /api/analyze          # AI analysis processing
GET  /api/health          # API health check
```

**Components**

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern Interface**: Clean, intuitive design with smooth animations
- **Data Visualization**: Interactive charts and graphs
- **Smart Navigation**: Context-aware sidebar navigation
- **Accessibility**: WCAG compliant components


### Available Scripts
```bash
npm run dev          # Start frontend development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run server       # Start backend API server
npm run dev:full     # Start both frontend and backend

**Deployment**

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy the 'dist' folder
```

### Backend (Railway/Heroku)
```bash
# Set NODE_ENV=production
# Deploy the 'server' folder
```

**License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
