# Wanderlust 🌍

A full-stack web application for listing and reviewing vacation properties. Users can browse properties, create listings, leave reviews, and manage their accounts.

Deployed on Render

URL:https://first-project-m8oc.onrender.com

## Features

- **User Authentication**: Secure user registration and login with Passport.js
- **Property Listings**: Create, read, update, and delete vacation property listings
- **Image Upload**: Upload property images with Multer
- **Reviews & Ratings**: Users can leave reviews and ratings on properties
- **User Sessions**: Persistent session management with MongoDB store
- **Form Validation**: Server-side validation with Joi
- **Responsive Design**: Mobile-friendly interface with CSS components
- **Flash Messages**: Real-time user feedback messages

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Passport.js with Local Strategy
- **Templating**: EJS with EJS-Mate layouts
- **File Upload**: Multer
- **Session Management**: Express-Session with MongoDB Store
- **Validation**: Joi
- **Frontend**: HTML, CSS, JavaScript
- **Development**: Nodemon

## Installation

### Prerequisites

- Node.js (v24.13.0 or higher)
- MongoDB Atlas account or local MongoDB instance
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd wanderlust
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```
   ATLAS_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/wanderlust
   NODE_ENV=development
   SESSION_SECRET=your-secret-key
   ```

4. **Start the development server**
   ```bash
   npm start
   ```
   The application will run on `http://localhost:3000`

## Project Structure

```
wanderlust/
├── app.js                      # Main application file
├── package.json                # Project dependencies
├── .env                        # Environment variables (create this)
├── controller/                 # Route controllers
│   ├── listingController.js    # Listing CRUD operations
│   ├── reviewController.js     # Review operations
│   └── userController.js       # User authentication & profile
├── models/                     # MongoDB schemas
│   ├── listing.js              # Property listing schema
│   ├── review.js               # Review schema
│   └── user.js                 # User schema
├── router/                     # Express route handlers
│   ├── listingRouter.js
│   ├── reviewRouter.js
│   └── userRouter.js
├── views/                      # EJS template files
│   ├── layouts/
│   │   └── boilerplate.ejs     # Main layout template
│   ├── includes/               # Reusable components
│   │   ├── navbar.ejs
│   │   ├── footer.ejs
│   │   └── flash.ejs
│   ├── listings/               # Listing pages
│   │   ├── index.ejs           # All listings
│   │   ├── show.ejs            # Property details
│   │   ├── new.ejs             # Create listing
│   │   └── edit.ejs            # Edit listing
│   ├── review/
│   │   └── edit.ejs            # Edit review
│   └── user/
│       ├── signIn.ejs          # User registration
│       └── logIn.ejs           # User login
├── public/                     # Static files
│   ├── css/                    # Stylesheets
│   │   ├── main.css
│   │   └── components/         # Component styles
│   │       ├── navbar.css
│   │       ├── cards.css
│   │       ├── form.css
│   │       ├── rating.css
│   │       ├── review.css
│   │       └── show.css
│   └── JS/                     # Client-side scripts
│       ├── main.js
│       └── component/
│           └── form.js
├── utils/                      # Utility functions
│   ├── ExpressError.js         # Custom error class
│   ├── midleware.js            # Custom middleware
│   ├── schema.js               # Joi validation schemas
│   └── wrapAsync.js            # Async error wrapper
└── init/                       # Database initialization
    ├── index.js                # Seed script entry
    └── data.js                 # Sample data
```

## Database Schema

### User
- Email (unique, required)
- Username (Passport Local Mongoose)
- Password (hashed by Passport)

### Listing
- Title (required)
- Description
- Image URL
- Price
- Location
- Country
- Reviews (array of Review IDs)
- Owner (User ID)

### Review
- Rating (required)
- Comment
- Created Date
- Author (User ID)

## Usage

### User Workflows

**Register & Login**
- Visit `/user/signup` to create an account
- Use `/user/login` to sign in
- Authenticated users have session persistence

**Browse Listings**
- View all listings on the home page
- Click on a listing to see full details
- View reviews and ratings from other users

**Create a Listing**
- Sign in to your account
- Click "Create Listing"
- Fill in property details and upload an image
- Submit to publish

**Leave a Review**
- View any property listing
- Sign in if needed
- Leave a rating and comment
- Reviews appear on the listing page

**Manage Your Content**
- Edit or delete your own listings
- Edit or delete your own reviews

## API Routes

### Listings
- `GET /listings` - View all listings
- `POST /listings` - Create new listing
- `GET /listings/:id` - View listing details
- `PATCH /listings/:id` - Update listing
- `DELETE /listings/:id` - Delete listing

### Reviews
- `POST /listings/:id/reviews` - Create review
- `DELETE /listings/:id/reviews/:reviewId` - Delete review
- `PATCH /listings/:id/reviews/:reviewId` - Update review

### Users
- `GET /user/signup` - Signup form
- `POST /user/signup` - Register user
- `GET /user/login` - Login form
- `POST /user/login` - Login user
- `GET /user/logout` - Logout user

## Development

### Run with Auto-Reload
The project uses Nodemon for development. Changes to your code will automatically restart the server:
```bash
npm start
```

### Database Seeding
Initialize the database with sample data:
```bash
node init/index.js
```

## Future Enhancements

- [ ] Image gallery with multiple photos per listing
- [ ] Advanced search and filtering
- [ ] Booking/reservation system
- [ ] Payment integration
- [ ] Email notifications
- [ ] User profiles and ratings
- [ ] Wishlist feature
- [ ] Map integration
- [ ] Admin dashboard
- [ ] Email verification

## Security Considerations

- Use `.env` for sensitive data (never commit this file)
- Implement CSRF protection
- Validate and sanitize all user inputs
- Use HTTPS in production
- Keep dependencies updated
- Implement rate limiting
- Add input validation on both client and server

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Support

For issues, questions, or suggestions, please open an issue in the repository.

---

Built with ❤️ using Express.js and MongoDB