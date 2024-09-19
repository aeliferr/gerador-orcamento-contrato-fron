import React from 'react';
import Sidebar from './Sidebar';
import { Container, Row, Col } from 'react-bootstrap';
import { useAuth } from './AuthProvider';
import { Navigate } from 'react-router-dom';

const MainLayout = ({ children }) => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated()) {
    return <Navigate to='/login' />
  }

  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col xs={3} className="p-0">
          <Sidebar />
        </Col>

        {/* Main content */}
        <Col xs={9} className="p-4">
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default MainLayout;
