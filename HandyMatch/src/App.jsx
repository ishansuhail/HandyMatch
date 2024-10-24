import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './authentication/Login'
import SignUp from './authentication/SignUp'
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


const App = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Router>
      <Routes>
        {/* Define the home route */}
        <Route path="/home" element={<Home />} />

        {/* Define a route for Login/SignUp with toggle */}
        <Route
          path="/"
          element={
            <div>
              {isLogin ? (
                <Login onToggle={() => setIsLogin(false)} />
              ) : (
                <SignUp onToggle={() => setIsLogin(true)} />
              )}
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App
