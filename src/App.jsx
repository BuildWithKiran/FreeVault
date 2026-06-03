import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Category from './pages/Category';
import CategoriesList from './pages/CategoriesList';
import Collections from './pages/Collections';
import ScrollToTop from './components/ScrollToTop';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  return (
    <ThemeProvider>
      {isInitialLoad && <LoadingScreen onComplete={() => setIsInitialLoad(false)} />}
      <Router>
        <ScrollToTop />
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', opacity: isInitialLoad ? 0 : 1, transition: 'opacity 0.5s ease-in' }}>
          <Navigation />
          <main style={{ flex: 1, paddingTop: '72px' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<CategoriesList />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/category/:id" element={<Category />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
