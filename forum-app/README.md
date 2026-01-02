# Forum Application

A secure, production-ready forum application built with Express.js, MongoDB, and comprehensive security features.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run in development mode (with auto-reload)
npm run dev

# Run in production mode
npm start
```

## 📋 Features

- User authentication (register/login)
- Create and view posts
- Comment on posts
- Session management
- **Enterprise-grade security features:**
  - Rate limiting (DoS protection)
  - Input validation and sanitization
  - Protection against qs arrayLimit bypass
  - Request size limits
  - Secure dependency management

## 🛡️ Security

This application has been hardened against multiple security vulnerabilities including:
- **HIGH:** qs arrayLimit bypass DoS vulnerability (GHSA-6rw7-vpxm-498p)
- MongoDB injection attacks
- Rate limiting for brute force protection
- Input validation for all user inputs

For detailed security information, see [docs/SECURITY_FIXES.md](docs/SECURITY_FIXES.md)

## 📦 Dependencies

- **express** (^4.21.2) - Web framework
- **mongoose** (^8.9.5) - MongoDB ODM
- **express-rate-limit** (^8.2.1) - Rate limiting middleware
- **bcryptjs** (^2.4.3) - Password hashing
- **express-session** (^1.18.0) - Session management
- **ejs** (^3.1.10) - Template engine

## 🔧 Configuration

Create a `.env` file with:
```env
PORT=3001
db_connection=mongodb://localhost:27017/forum_db
SESSION_SECRET=your_secure_random_string_minimum_32_characters
```

## 📁 Project Structure

```
forum-app/
├── app.js                 # Main application entry point
├── controllers/           # Route controllers
│   ├── authController.js  # Authentication logic
│   ├── indexController.js # Index and dashboard views
│   └── postController.js  # Post and comment logic
├── middleware/            # Custom middleware
│   └── inputValidation.js # Input validation & sanitization
├── models/                # MongoDB models
│   ├── UserModel.js
│   ├── PostModel.js
│   └── CommentModel.js
├── routes/                # Route definitions
│   ├── authHandling.js
│   ├── indexHandling.js
│   └── postHandling.js
├── views/                 # EJS templates
├── public/                # Static assets
├── docs/                  # Documentation
└── package.json
```

## 🧪 Testing

Before deploying, test all endpoints:

```bash
# Test registration
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass123"}'

# Test login
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass123"}'
```

## 📚 Documentation

Full documentation is available in the `docs/` folder:
- [Security Fixes & Guidelines](docs/SECURITY_FIXES.md)
- [Documentation Index](docs/README.md)

## 🔄 Development

```bash
# Install development dependencies
npm install

# Run with nodemon for auto-reload
npm run dev

# Check for security vulnerabilities
npm audit
```

## 🚢 Deployment

1. Ensure all dependencies are up to date: `npm install`
2. Run security audit: `npm audit`
3. Set environment variables
4. Start with: `npm start`
5. Monitor logs for 400/429 errors (validation/rate limit)

## 📝 License

ISC

## 👥 Contributing

1. Review security guidelines in `docs/SECURITY_FIXES.md`
2. Ensure all changes pass validation
3. Test endpoints thoroughly
4. Update documentation as needed

---

**Built with security in mind** 🔒
