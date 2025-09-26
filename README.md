# 🌱 Harvest Hub - Food Donation App

A modern web application built with **Firebase Studio** as part of a mini workshop, designed to connect food donors with recipients to reduce food waste and help communities in need.

## 🎯 About This Project

Harvest Hub is a comprehensive food donation platform that I developed during a Firebase Studio workshop. The app facilitates the connection between businesses, restaurants, and individuals who have surplus food with organizations and people who need it, helping to reduce food waste while addressing food insecurity in our communities.

## ✨ Key Features

### 🍽️ Core Functionality
- **Donation Listing**: User-friendly interface for businesses to list surplus food donations with details like food type, quantity, and expiration date
- **Browse Donations**: Search and browse available food donations with flexible filtering by location, food type, and availability
- **Claim System**: Easy claiming process for food packages, subject to donor approval
- **Status Tracking**: Real-time updates on donation status (Available → Claimed → Approved → Picked Up)

### 🤖 AI-Powered Features
- **Smart Matching**: AI-powered suggestion system that analyzes donation patterns and recommends the most suitable recipient organizations
- **Intelligent Recommendations**: Uses historical data to make informed suggestions about optimal donation distribution

### 🗺️ Location & Logistics  
- **Interactive Map**: Map integration showing locations of food donors and recipient organizations
- **Location-based Search**: Find donations near you with geographical filtering
- **Pickup Coordination**: Efficient logistics planning with address and location data

### 🔔 Communication & Verification
- **Real-time Notifications**: Automated status updates for listing creation, claims, approvals, and pickups
- **OTP Verification**: Secure pickup verification system with one-time passwords
- **Multi-view Interface**: Switch between list view and map view for browsing donations

## 🛠️ Technology Stack

### Frontend
- **Next.js 15.3.3** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons

### AI & Backend
- **Google Genkit** - AI framework for intelligent matching
- **Firebase** - Backend services and hosting
- **Google AI** - AI-powered recommendation engine

### Development Tools
- **Firebase Studio** - Development environment and tooling
- **ESLint** - Code linting
- **PostCSS** - CSS processing

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ (as configured in `.idx/dev.nix`)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ArpitRai30/Food-Donation-App.git
   cd Food-Donation-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add your configuration:
   ```env
   # Add your Firebase and AI configuration here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:9002` to see the application

### Additional Scripts

- **AI Development**: `npm run genkit:dev` - Start Genkit AI development server
- **Build**: `npm run build` - Create production build
- **Lint**: `npm run lint` - Run ESLint
- **Type Check**: `npm run typecheck` - Run TypeScript compiler

## 🎨 Design System

### Color Palette
- **Primary**: Warm Green (#8BC34A) - Conveying freshness and community
- **Background**: Light Green (#E8F5E9) - Calming, subtly desaturated
- **Accent**: Soft Orange (#FFB74D) - For calls to action and notifications

### Typography
- **Headlines**: Playfair Display (serif) - Elegant, high-end feel
- **Body Text**: PT Sans (sans-serif) - Modern and approachable
- **Code**: Monospace font family

### UI Components
- Clean, card-based design for food listings
- Smooth transitions and subtle animations
- Modern icons representing food, community, and logistics
- Responsive design for all device sizes

## 📱 App Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── browse/            # Browse donations page
│   ├── donate/            # Create donation page
│   ├── notifications/     # Notifications page
│   ├── smart-matching/    # AI matching page
│   ├── volunteer/         # Volunteer page
│   └── otp/              # OTP verification pages
├── components/            # Reusable UI components
│   ├── donations/        # Donation-related components
│   ├── map/              # Map components
│   ├── notifications/    # Notification components
│   └── ui/               # Base UI components
├── lib/                  # Utility functions and data
└── ai/                   # AI flows and configurations
```

## 🤝 How It Works

1. **Donors** (restaurants, groceries, individuals) list surplus food with details
2. **Recipients** (food banks, shelters, individuals) browse and claim available donations
3. **AI System** suggests optimal matches between donors and recipients
4. **Verification** happens through OTP system for secure pickup
5. **Notifications** keep all parties informed throughout the process

## 🌟 Workshop Context

This application was developed as part of a **Firebase Studio mini workshop**, demonstrating:
- Modern web development with Next.js and TypeScript
- Integration with Firebase services
- AI-powered features using Google Genkit
- Responsive design with Tailwind CSS
- Real-world application of donation management systems

## 🤝 Contributing

This project was created for educational purposes during a Firebase Studio workshop. Feel free to explore the code, learn from the implementation, and adapt it for your own projects!

## 📄 License

This project is part of a workshop demonstration and is available for educational purposes.

---

**Built with ❤️ using Firebase Studio** - Connecting communities, reducing waste, one donation at a time.
