import React, { useState, useEffect } from 'react';
import { apiClient } from './axiosConfig';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const BudgetList = () => {
  const [budgets, setBudgets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch budgets from the API
    const fetchBudgets = async () => {
      try {
        const response = await apiClient.get('/budget');
        setBudgets(response.data);
      } catch (error) {
        console.error('Error fetching budgets:', error);
      }
    };

    fetchBudgets();
  }, []);

  // Function to navigate to the edit page
  const editInvoice = (budgetId) => {
    navigate(`/edit-invoice/${budgetId}`);
  };

  // Function to navigate to the create new budget page
  const createNewBudget = () => {
    navigate(`/budget`);  // Assuming you have a route for creating a new budget
  };

  const calculateBudgetTotalValue = (budgetItems) => {
    let totalValue = 0;
    budgetItems.forEach(item => {
      totalValue += item.quantity * item.unitValue;
    });
    return totalValue;
  };

  const printBudget = async (budgetId) => {
    const response = await apiClient.get(`/budget/${budgetId}/print`, {
      responseType: 'blob'
    });

    const pdfUrl = URL.createObjectURL(response.data);
    window.open(pdfUrl);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Budget List</h2>
      
      <div className="d-flex justify-content-between mb-3">
        <Button variant="success" onClick={createNewBudget}>
          Create New Budget
        </Button>
      </div>
      
      <Table striped bordered hover>
        <thead className="thead-dark">
          <tr>
            <th>Client</th>
            <th>Vendor</th>
            <th>Total Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {budgets.map((budget) => (
            <tr key={budget.id}>
              <td>{budget.clientName}</td>
              <td>{budget.vendor.fullName}</td>
              <td>{new Intl.NumberFormat('pt-Br', { style: 'currency', currency: 'BRL' }).format(calculateBudgetTotalValue(budget.budgetItems))}</td>
              <td>
                <Button
                  variant="primary"
                  className="mr-2"
                  onClick={() => printBudget(budget.id)}
                >
                  Print
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => editInvoice(budget.id)}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BudgetList;
