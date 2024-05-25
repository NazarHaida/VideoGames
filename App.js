import React from 'react';
import LoginForm from './LoginForm';
import GlobalPredictionPage from './SalesPredictionForm';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RegisterForm from "./img/RegisterForm";
import EUSales from "./EUSales";
import NASales from "./NASales";
import OtherSales from "./OtherSales";
import JPSales from "./JPSales";
function App() {
  return (
    <Router>
      <div className="App">

        <nav>

        </nav>


        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/eusales" element={<EUSales />} />
          <Route path="/nasales" element={<NASales />} />
          <Route path="/othersales" element={<OtherSales />} />
          <Route path="/jpsales" element={<JPSales />} />

          <Route path="/home" element={<GlobalPredictionPage />} />
          <Route path="/register" element={<RegisterForm />} />

          <Route path="*" element={<LoginForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
