import React from 'react';
import './assets/css/app.css';
import { ChakraProvider } from '@chakra-ui/react';
import { SearchProvider } from './context/SearchContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import theme from './assets/js/theme';
import Home from './components/pages/Home.jsx';
import Properties from './components/pages/Properties.jsx';
import About from './components/pages/About.jsx';
import Navbar from './components/common/Navbar.jsx';
import Property from './components/property/Property.jsx';
import Contact from './components/pages/contact/Contact.jsx';
import Footer from './components/common/footer/Footer.jsx';
import Pricing from './components/pages/Pricing.jsx';
import Login from './components/auth/LoginTemp.jsx';
import AddMyProperty from './components/propertyInternal/AddMyProperty.jsx';
import MyProperties from './components/propertyInternal/MyProperties.jsx';
import RequireAuth from './components/auth/RequireAuthTemp.jsx';
import Register from './components/auth/RegisterTemp.jsx';

function App() {

  return (
    <ChakraProvider theme={theme}>
      <Router>
          <SearchProvider>
            <AuthProvider>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/properties" element={<Properties />} />
                <Route path="/property/:id" element={<Property />} />
                <Route path='/contact' element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/addProperty" element={<RequireAuth><AddMyProperty /></RequireAuth>} />
                <Route path="/myProperties" element={<RequireAuth><MyProperties /></RequireAuth>} />
                <Route path="/register" element={<Register />} />
              </Routes>
              <Footer />
            </AuthProvider>
          </SearchProvider>
      </Router>
    </ChakraProvider>
  );
}

export default App;