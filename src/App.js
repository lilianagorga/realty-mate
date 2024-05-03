import React from 'react';
import './assets/css/global.css';
import { ChakraProvider } from '@chakra-ui/react';
import { SearchProvider } from './context/SearchContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Search from './components/pages/Search';
import About from './components/pages/About';
import Navbar from './components/Navbar';
import Property from './components/property/Property';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';



function App() {

  return (
    <ChakraProvider>
      <Router>
        <SearchProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/" element={<Search />} />
            <Route path="/property/:id" element={<Property />} />
            <Route path='/contact' element={<Contact />} />
            <Route path="/about" element={<About />} />
          </Routes>
          <Footer />
        </SearchProvider>
      </Router>
    </ChakraProvider>
  );
}

export default App;