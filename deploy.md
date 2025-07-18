# Deployment Guide - Medical & Finance AI Chatbot

This guide covers various deployment options for the Medical & Finance AI Chatbot, from simple static hosting to enterprise-grade deployments.

## Quick Start (Static Deployment)

### Option 1: Simple HTML Deployment
1. Download the `index.html` file
2. Upload to any web server or hosting service
3. Access via browser - no build process required

### Option 2: GitHub Pages
1. Fork the repository
2. Enable GitHub Pages in repository settings
3. Select source branch (usually `main`)
4. Access via `https://yourusername.github.io/medical-finance-chatbot`

## Development Setup

### Prerequisites
- Node.js 14.0.0 or higher
- npm 6.0.0 or higher
- Git

### Local Development
```bash
# Clone the repository
git clone https://github.com/yourusername/medical-finance-chatbot.git
cd medical-finance-chatbot

# Install dependencies
npm install

# Start development server
npm start
```

Access at `http://localhost:3000`

## Production Builds

### Build for Production
```bash
# Create optimized production build
npm run build

# The build folder contains the production-ready files
# Upload contents to your web server
```

### Build Output Structure
```
dist/
├── index.html
├── bundle.js
├── bundle.css
├── assets/
│   ├── images/
│   └── fonts/
└── static/
    └── js/
```

## Hosting Options

### 1. Static Hosting Services

#### Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

#### Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

#### AWS S3 + CloudFront
```bash
# Build the project
npm run build

# Upload to S3 bucket
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

### 2. Traditional Web Hosting

#### Shared Hosting / cPanel
1. Build the project: `npm run build`
2. Upload `dist/` contents to `public_html/`
3. Access via your domain

#### VPS/Dedicated Server (nginx)
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    location / {
        root /var/www/medical-finance-chatbot/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # Compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

## Environment Configuration

### Environment Variables
Create `.env` file for configuration:
```env
REACT_APP_API_URL=https://api.yourdomain.com
REACT_APP_EXPERT_CONSULTATION_URL=https://experts.yourdomain.com
REACT_APP_ANALYTICS_ID=UA-XXXXXXXXX-X
REACT_APP_CHATBOT_VERSION=1.0.0
```

### Production Environment Setup
```bash
# Set NODE_ENV for production
export NODE_ENV=production

# Build with production optimizations
npm run build-prod
```

## Security Considerations

### Content Security Policy (CSP)
Add to your HTML header:
```html
<meta http-equiv="Content-Security-Policy" content="
    default-src 'self';
    script-src 'self' 'unsafe-inline' cdnjs.cloudflare.com;
    style-src 'self' 'unsafe-inline' cdnjs.cloudflare.com;
    img-src 'self' data: https:;
    connect-src 'self' https:;
    font-src 'self' cdnjs.cloudflare.com;
">
```

### HTTPS Configuration
Always serve over HTTPS in production:
```nginx
server {
    listen 443 ssl http2;
    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;
    
    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
}
```

## Performance Optimization

### Caching Strategy
```nginx
# Cache static assets
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# Cache HTML files for short duration
location ~* \.(html)$ {
    expires 1h;
    add_header Cache-Control "public, must-revalidate";
}
```

### CDN Integration
```javascript
// webpack.config.js for CDN
module.exports = {
  output: {
    publicPath: 'https://cdn.yourdomain.com/assets/'
  }
};
```

## Monitoring and Analytics

### Google Analytics Integration
```javascript
// Add to index.html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Error Monitoring
```javascript
// Add error tracking
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  // Send to your error tracking service
});
```

## Compliance and Legal

### HIPAA Compliance (Healthcare)
- Ensure all data transmission is encrypted
- Implement proper access controls
- Maintain audit logs
- Use HIPAA-compliant hosting services

### Financial Regulations
- Implement proper disclaimers
- Ensure data privacy compliance
- Follow regional financial regulations
- Maintain transaction security

## Backup and Recovery

### Automated Backups
```bash
#!/bin/bash
# backup-script.sh
DATE=$(date +%Y%m%d_%H%M%S)
tar -czf "backup_$DATE.tar.gz" dist/
aws s3 cp "backup_$DATE.tar.gz" s3://your-backup-bucket/
```

### Disaster Recovery
1. Maintain code repository backups
2. Document deployment procedures
3. Test recovery procedures regularly
4. Keep configuration files versioned

## Scaling Considerations

### Load Balancing
```nginx
upstream chatbot_backend {
    server 127.0.0.1:3000;
    server 127.0.0.1:3001;
    server 127.0.0.1:3002;
}

server {
    location / {
        proxy_pass http://chatbot_backend;
    }
}
```

### Database Integration (Future)
```javascript
// Example MongoDB connection
const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  userId: String,
  messages: [{
    type: String,
    content: String,
    timestamp: Date,
    category: String
  }],
  createdAt: { type: Date, default: Date.now }
});
```

## Testing in Production

### Health Checks
```javascript
// health-check.js
const express = require('express');
const app = express();

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
```

### Performance Monitoring
```javascript
// Monitor Core Web Vitals
new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(`${entry.name}: ${entry.value}`);
  }
}).observe({entryTypes: ['measure']});
```

## Troubleshooting

### Common Issues
1. **Build Failures**: Check Node.js version compatibility
2. **CSS Not Loading**: Verify Tailwind configuration
3. **Icons Not Displaying**: Check Lucide React imports
4. **CORS Issues**: Configure proper headers

### Debug Mode
```bash
# Enable debug logging
export DEBUG=chatbot:*
npm start
```

## Support and Maintenance

### Update Process
1. Test updates in staging environment
2. Create backup before deployment
3. Deploy during low-traffic periods
4. Monitor error logs post-deployment

### Version Management
```bash
# Tag releases
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

---

For additional support, refer to the project documentation or contact the development team.