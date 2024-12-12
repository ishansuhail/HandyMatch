

## Prerequisites

Before you begin, ensure you have the following installed:

### 1. Node.js
- Download from [Node.js official website](https://nodejs.org/)
- Verify installation: `node -v`

### 2. Package Manager (npm or yarn)
- npm (comes with Node.js)
  - Verify installation: `npm -v`
- Or install yarn:
  - `npm install -g yarn`

### 3. Git
- Download from [Git official website](https://git-scm.com/)
- Verify installation: `git --version`

### 4. Code Editor
- Recommended: Visual Studio Code
- Download from [VS Code official website](https://code.visualstudio.com/)

## Installation Steps

### 1. Clone the Repository
```bash
# Navigate to your project directory
cd /path/to/your/project

# Clone the repository
git clone https://github.com/ishansuhail/HandyMatch.git

# Navigate to the React App directory
cd HandyMatch/HandyMatch

```

### 2. Install Dependencies
```bash
# Using npm
npm install

# Or using yarn
yarn
```

### 3. Set Up Google Geocoding API
1. Go to [Google Cloud Platform](https://console.cloud.google.com)
2. Login or create a Google account
3. Search for "Geocoding API" in the top search bar
4. Click "Enable" in the middle of the screen
5. Follow Google's setup process (card information may be required, but you won't be charged)
6. Save your API key securely

### 4. Configure Environment Variables
1. Create a `.env` file in the React app directory NOT THE PROJECT DIRECTORY:
```bash
touch .env
```

2. Add your Google Maps API key:
```bash
VITE_GOOGLE_MAPS_API_KEY=your-key
```

### 5. Run the Project
```bash
npm run dev
```
Then open http://localhost:5173/ in your browser (CMD+Click on Mac, CTRL+Click on Windows):
