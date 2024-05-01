import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Search from './components/Search';
import Navbar from './components/Navbar';
import PropertyDetails from './components/PropertyDetails';
import { SearchProvider } from './context/SearchContext';
import './assets/css/global.css';


function App() {

  return (
    <ChakraProvider>
      <Router>
        <SearchProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
          </Routes>
        </SearchProvider>
      </Router>
    </ChakraProvider>
  );
}

export default App;