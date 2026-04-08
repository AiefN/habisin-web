# Cook Smart, Waste Less

> A sustainable recipe platform that helps you cook smarter, waste less, and eat better.

## About

Cook Smart, Waste Less is an international recipe platform designed to promote sustainable cooking practices. We help users discover recipes from around the world while reducing food waste and cooking within their budget.

### Key Features

- 🌍 **International Recipes** - Explore dishes from 50+ countries
- 💰 **Budget-Friendly** - Find recipes that fit your budget
- ♻️ **Waste Transformation** - Turn kitchen leftovers into delicious recipes
- 📊 **Smart Calculator** - Adjust portion sizes and track costs
- 🎯 **Mood Finder** - Discover recipes based on your mood
- 📱 **Responsive Design** - Works seamlessly on all devices

## Tech Stack

**Frontend:**
- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui Components

**Backend:**
- Node.js
- Express.js

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/habisin.git
cd habisin
```

2. Install dependencies
```bash
npm install
```

3. Install backend dependencies
```bash
cd backend
npm install
cd ..
```

### Running Development Server

Start the frontend development server:
```bash
npm run dev
```

Start the backend server:
```bash
cd backend
npm start
```

The frontend will be available at `http://localhost:5173`
The backend API will be available at `http://localhost:3002`

### Building for Production

```bash
npm run build
```

## Project Structure

```
habisin/
├── src/
│   ├── app/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── data/          # Recipe data
│   │   └── styles/        # Global styles
│   └── main.tsx
├── backend/
│   ├── server.js          # Express server
│   ├── routes/            # API routes
│   ├── models/            # Data models
│   └── seed.js            # Database seed
├── index.html
├── vite.config.ts
└── package.json
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Support

For support, email hello@cooksmart.id or open an issue on GitHub.