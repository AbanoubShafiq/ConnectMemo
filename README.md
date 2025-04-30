# ConnectMemo - Memory Sharing API 🚀

**ConnectMemo** is a robust RESTful API service developed during my **ITI Scholarship** program. It enables users to create, store, and share memories with seamless image uploads, built with Node.js and Express following a clean three-tier architecture.

## ✨ Key Features
- **Memory Management**: Full CRUD operations for text memories
- **Image Handling**: Integrated with ImageKit for optimized media storage and delivery
- **Secure Authentication**: JWT-based user authentication
- **Three-Tier Architecture**: Presentation, Business Logic, and Data Access layers
- **Modern Tooling**: MongoDB for data storage, Postman for API testing

## 🖼️ ImageKit Integration
The system leverages ImageKit for efficient image management:

.
├── configs/         # Environment configurations
├── controllers/     # Business logic
├── database/        # MongoDB connection
├── middlewares/     # Authentication & validation
├── models/          # Mongoose schemas
├── routes/          # API endpoints
├── services/        # Core business services
└── utility/         # Helper functions
