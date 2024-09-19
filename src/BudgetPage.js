import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

const BudgetPage = () => {
  const [clientName, setClientName] = useState("");
  const [budgetItems, setBudgetItems] = useState([
    { description: "", unitValue: "", quantity: 1 },
  ]);
  const navigate = useNavigate()

  // Add new item to the items array
  const addItem = () => {
    setBudgetItems([...budgetItems, { description: "", unitValue: "", quantity: 1 }]);
  };

  // Remove an item from the items array
  const removeItem = (index) => {
    const newItems = budgetItems.filter((_, i) => i !== index);
    setBudgetItems(newItems);
  };

  // Handle change in any of the item inputs
  const handleItemChange = (index, field, value) => {
    const newItems = budgetItems.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setBudgetItems(newItems);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      clientName,
      budgetItems,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/budget`, {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("authToken"), 
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      navigate('/budgets')
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error submitting the invoice.");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Submit Invoice Data</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="clientName" className="form-label">
            Client Name:
          </label>
          <input
            type="text"
            id="clientName"
            className="form-control"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required
          />
        </div>

        <h3 className="mb-3">Items</h3>
        {budgetItems.map((item, index) => (
          <div key={index} className="row mb-3 align-items-center">
            <div className="col-md-4">
              <label htmlFor={`itemDescription-${index}`} className="form-label">
                Description:
              </label>
              <input
                type="text"
                className="form-control"
                value={item.description}
                onChange={(e) =>
                  handleItemChange(index, "description", e.target.value)
                }
                required
              />
            </div>
            <div className="col-md-3">
              <label htmlFor={`itemUnitValue-${index}`} className="form-label">
                Unit Value:
              </label>
              <input
                type="text"
                className="form-control"
                value={item.unitValue}
                onChange={(e) =>
                  handleItemChange(index, "unitValue", Number(e.target.value))
                }
                required
              />
            </div>
            <div className="col-md-2">
              <label htmlFor={`itemQuantity-${index}`} className="form-label">
                Quantity:
              </label>
              <input
                type="number"
                className="form-control"
                value={item.quantity}
                onChange={(e) =>
                  handleItemChange(index, "quantity", Number(e.target.value))
                }
                required
              />
            </div>
            <div className="col-md-3">
              <button
                type="button"
                className="btn btn-danger mt-4"
                onClick={() => removeItem(index)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-success"
            onClick={addItem}
          >
            Add Item
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default BudgetPage;
