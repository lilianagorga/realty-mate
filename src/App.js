import React from 'react';
import './assets/css/app.css';
import { ChakraProvider } from '@chakra-ui/react';
import { SearchProvider } from './context/SearchContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import theme from './assets/js/theme';
import Home from './components/pages/Home';
import Search from './components/pages/Search';
import About from './components/pages/About';
import Navbar from './components/common/Navbar';
import Property from './components/property/Property';
import Contact from './components/pages/contact/Contact';
import Footer from './components/common/footer/Footer';
import Price from './components/price/Price';



function App() {

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <SearchProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/" element={<Search />} />
            <Route path="/property/:id" element={<Property />} />
            <Route path='/contact' element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/price" element={<Price />} />
          </Routes>
          <Footer />
        </SearchProvider>
      </Router>
    </ChakraProvider>
  );
}

export default App;