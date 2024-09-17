import './App.css';
import Login from './Login';
import BudgetPage from './BudgetPage'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/budget" element={<BudgetPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
