# Green Minds Youth Initiative - Backend

A comprehensive backend system for the Green Minds Youth Initiative website, built with Node.js, Express, and MongoDB.

## Features

### Core Functionality
- **Project Management**: Full CRUD operations for environmental projects
- **Contact System**: Handle contact form submissions with email notifications
- **Team Management**: Manage team member profiles and information
- **Admin Panel**: Secure authentication and content management
- **File Uploads**: Image upload support for projects and team members

### API Endpoints

#### Projects (`/api/projects`)
- `GET /` - Get all projects (with filtering)
- `GET /:id` - Get single project
- `POST /` - Create new project
- `PUT /:id` - Update project
- `DELETE /:id` - Delete project
- `POST /:id/updates` - Add project update
- `POST /:id/gallery` - Add image to project gallery

#### Contact (`/api/contact`)
- `POST /` - Submit contact form
- `GET /` - Get all contact messages (admin)
- `PUT /:id/status` - Update contact status

#### Team (`/api/team`)
- `GET /` - Get all team members
- `GET /:id` - Get single team member
- `POST /` - Add new team member
- `PUT /:id` - Update team member
- `DELETE /:id` - Delete team member

#### Admin (`/api/admin`)
- `POST /login` - Admin login
- `POST /register` - Register new admin (admin only)
- `GET /profile` - Get admin profile

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create a `.env` file with the following variables:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/greenminds
JWT_SECRET=your-super-secret-jwt-key
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 3. Database Setup
Make sure MongoDB is running, then seed the database:
```bash
node scripts/seed.js
```

### 4. Start the Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## Project Structure

```
├── config/
│   └── database.js          # Database configuration
├── middleware/
│   └── auth.js              # Authentication middleware
├── models/
│   ├── Project.js           # Project model
│   ├── Contact.js           # Contact model
│   ├── Team.js              # Team model
│   └── Admin.js             # Admin model
├── routes/
│   ├── projects.js          # Project routes
│   ├── contact.js           # Contact routes
│   ├── team.js              # Team routes
│   └── admin.js             # Admin routes
├── scripts/
│   └── seed.js              # Database seeding script
├── uploads/
│   ├── projects/            # Project images
│   └── team/                # Team member photos
├── public/                  # Static files (HTML, CSS, JS)
└── server.js                # Main server file
```

## Enhanced Features

### Project Management
- **Dynamic Loading**: Projects are loaded from the database via API
- **Filtering**: Filter projects by category and status
- **Progress Tracking**: Visual progress bars for fundraising goals
- **Status Management**: Track project status (Planning, Active, Completed, On Hold)
- **Statistics**: Track various metrics per project type

### Contact System
- **Form Validation**: Client and server-side validation
- **Email Notifications**: Automatic email notifications for new submissions
- **Status Tracking**: Track message status (New, Read, Replied, Resolved)

### Security Features
- **JWT Authentication**: Secure admin authentication
- **Password Hashing**: Bcrypt password hashing
- **Input Validation**: Express-validator for input sanitization
- **File Upload Security**: Secure file upload with type and size restrictions
- **CORS Protection**: Cross-origin request handling
- **Helmet**: Security headers

## Default Admin Credentials
- **Username**: admin
- **Password**: admin123

**Important**: Change these credentials immediately after first login!

## File Upload Guidelines
- **Project Images**: Max 5MB, stored in `uploads/projects/`
- **Team Photos**: Max 2MB, stored in `uploads/team/`
- **Supported Formats**: JPG, PNG, GIF, WebP

## Email Configuration
For the contact form to work properly:
1. Use a Gmail account
2. Enable 2-factor authentication
3. Generate an app-specific password
4. Use the app password in the `EMAIL_PASS` environment variable

## Development Notes
- The blog functionality has been removed as requested
- Projects page now loads data dynamically from the API
- Enhanced filtering and search capabilities
- Responsive design maintained across all pages
- SEO-friendly URLs and meta tags

## Production Deployment
1. Set `NODE_ENV=production`
2. Use a production MongoDB instance
3. Configure proper SSL certificates
4. Set up proper logging and monitoring
5. Use PM2 or similar for process management

## Support
For technical support or questions about the Green Minds Youth Initiative backend system, please contact the development team.