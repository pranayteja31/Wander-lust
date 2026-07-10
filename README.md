# Wander-lust

A full-stack web application for discovering and sharing travel destinations, experiences, and reviews.

## 📋 Project Description

Wander-lust is a travel exploration platform that allows users to browse, create, and review travel destinations. Whether you're looking for your next adventure or want to share your travel experiences, Wander-lust provides an intuitive interface to discover amazing places around the world and read authentic reviews from fellow travelers.

## ✨ Features

- **Destination Listings**: Browse a curated collection of travel destinations with detailed information
- **User Reviews**: Read and write reviews for destinations you've visited
- **Create & Share**: Add new destinations to the platform for other travelers to discover
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices
- **Interactive UI**: Engaging user interface with smooth navigation
- **User Authentication**: Secure user registration and login system
- **Search & Filter**: Easily find destinations based on your interests

## 🛠️ Tools & Technologies Used

### Frontend
- **JavaScript** (44.5%) - Dynamic client-side functionality and interactivity
- **EJS** (32.1%) - Server-side templating for rendering dynamic HTML pages
- **CSS** (23.4%) - Styling and responsive design

### Backend & Database
- **Node.js** - Server-side runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for storing destinations, reviews, and user data
- **Passport.js** - Authentication middleware

### Additional Tools
- **Git** - Version control system
- **npm** - Package management

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/pranayteja31/Wander-lust.git
cd Wander-lust
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your configuration:
```
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
PORT=3000
```

4. Start the application:
```bash
npm start
```

5. Open your browser and navigate to:
```
http://localhost:3000
```

## 📁 Project Structure

```
Wander-lust/
├── public/              # Static files (CSS, images)
├── views/               # EJS templates
├── routes/              # Express route handlers
├── models/              # Database schemas
├── controllers/         # Business logic
├── config/              # Configuration files
├── app.js               # Main application file
└── package.json         # Project dependencies
```

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute to Wander-lust:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## ✉️ Contact & Support

For questions, suggestions, or feedback, feel free to open an issue on the repository or reach out directly.

---

Happy travels! 🌍✈️
