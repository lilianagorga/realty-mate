import React from 'react';
import './assets/css/app.css';
import { ChakraProvider } from '@chakra-ui/react';
import { SearchProvider } from './context/SearchContext.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import theme from './assets/js/theme';
import Home from './components/pages/Home.jsx';
import Search from './components/pages/Search.jsx';
import About from './components/pages/About.jsx';
import Navbar from './components/common/Navbar.jsx';
import Property from './components/property/Property.jsx';
import Contact from './components/pages/contact/Contact.jsx';
import Footer from './components/common/footer/Footer.jsx';
import Pricing from './components/pages/Pricing.jsx';



function App() {

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <SearchProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/property/:id" element={<Property />} />
            <Route path='/contact' element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Pricing />} />
          </Routes>
          <Footer />
        </SearchProvider>
      </Router>
    </ChakraProvider>
  );
}

export default App;