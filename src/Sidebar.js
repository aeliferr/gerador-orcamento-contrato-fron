import React from 'react';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate()
  
  return (
    <div className="bg-light border-right vh-100 p-3" style={{ width: '250px' }}>
      <h4>Menu</h4>
      <Nav className="flex-column">
        <Nav.Item>
          <Nav.Link onClick={() => navigate('/budgets')}>Budgets</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Sidebar;
