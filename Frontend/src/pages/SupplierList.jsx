import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [showAddSupplierModal, setShowAddSupplierModal] = useState(false);
  const [newSupplier, setNewSupplier] = useState({ id: '', name: '', description: '', owed: 0 });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await fetch('/supplier');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSuppliers(data);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  const handleAddSupplier = async () => {
    try {
      const response = await fetch('/api/suppliers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSupplier),
      });

      if (response.ok) {
        const addedSupplier = await response.json();
        setSuppliers([...suppliers, addedSupplier]);
        setShowAddSupplierModal(false);
        setNewSupplier({ id: '', name: '', description: '', owed: 0 });
      } else {
        console.error('Error adding supplier:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding supplier:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSupplier({ ...newSupplier, [name]: value });
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="mx-auto w-3/4 h-128"> {/* Increased card height */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold mb-2">Supplier List</h2>
          <Button 
            variant="contained" 
            className="bg-gray-300 text-gray-800"
            onClick={() => setShowAddSupplierModal(true)}
          >
            Add New
          </Button>
        </div>
        <div className="overflow-y-auto max-h-96">
          <table className="w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Owed</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map(supplier => (
                <tr key={supplier.id}>
                  <td>{supplier.id}</td>
                  <td>
                    <Link to={`/supplier/${supplier.id}`}>
                      {supplier.name}
                    </Link>
                  </td>
                  <td>{supplier.owed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
      {showAddSupplierModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl mb-4">Add New Supplier</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleAddSupplier(); }}>
              <div className="mb-2">
                <label className="block">ID</label>
                <input
                  type="text"
                  name="id"
                  value={newSupplier.id}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newSupplier.name}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block">Description</label>
                <input
                  type="text"
                  name="description"
                  value={newSupplier.description}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div className="mb-2">
                <label className="block">Owed</label>
                <input
                  type="number"
                  name="owed"
                  value={newSupplier.owed}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div className="flex justify-end">
                <Button 
                  type="button" 
                  className="bg-gray-300 text-gray-800 mr-2"
                  onClick={() => setShowAddSupplierModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-gray-300 text-gray-800">
                  Add Supplier
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierList;
