# Forum Application Documentation

Welcome to the forum application documentation. This folder contains comprehensive guides on security, deployment, and development practices.

## 📚 Documentation Index

### Security
- **[SECURITY_FIXES.md](./SECURITY_FIXES.md)** - Comprehensive security vulnerability fixes and mitigation strategies
  - qs arrayLimit bypass DoS vulnerability (HIGH severity)
  - Package updates and dependency management
  - Rate limiting implementation
  - Input validation middleware
  - Testing and deployment guidelines

### Development
- **[INPUT_VALIDATION.md](./INPUT_VALIDATION.md)** - Input validation middleware documentation
  - Middleware functions overview
  - Attack scenarios and prevention
  - Testing guidelines
  - Configuration options

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.x
- MongoDB instance
- Environment variables configured (see `.env` setup below)

### Installation
```bash
# Install dependencies
npm install

# Start development server with auto-reload
npm run dev

# Start production server
npm start
```

### Environment Setup
Create a `.env` file in the root directory:
```env
PORT=3001
db_connection=mongodb://localhost:27017/forum_db
SESSION_SECRET=your_secure_random_string_here
```

## 🛡️ Security Features

This application implements multiple layers of security:

1. **Rate Limiting**
   - General: 100 requests per 15 minutes
   - Authentication routes: 5 requests per 15 minutes

2. **Input Validation**
   - Maximum nesting depth: 5 levels
   - Maximum parameters: 1000
   - Request body size limit: 10MB
   - Field-specific sanitization

3. **Updated Dependencies**
   - All packages updated to secure versions
   - Regular security audits recommended

## 📖 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [OWASP Security Guidelines](https://owasp.org/)

## 🔒 Security Contact

For security issues, please review [SECURITY_FIXES.md](./SECURITY_FIXES.md) first, then contact the development team.

---

**Last Updated:** January 2, 2026
