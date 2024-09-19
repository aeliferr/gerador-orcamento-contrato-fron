import './App.css';
import Login from './Login';
import BudgetPage from './BudgetPage'
import { AuthProvider } from './AuthProvider';
import PrivateRoute from './PrivateRoute';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BudgetList from './BudgetList';

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/budget"
              element={
                <PrivateRoute>
                  <BudgetPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/budgets"
              element={
                <PrivateRoute>
                  <BudgetList />
                </PrivateRoute>
              }
            />
            {/* Add other routes */}
          </Routes>        
        </Router>
    </AuthProvider>
    </>
  );
}

export default App;
