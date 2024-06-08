// SupplierList.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await fetch('/api/suppliers');
      const data = await response.json();
      setSuppliers(data);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  const handleAddSupplier = () => {
    // Logic to handle adding a new supplier
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Supplier List</h2>
        <Button variant="outline" onClick={handleAddSupplier}>
          Add New
        </Button>
      </div>
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
    </Card>
  );
};

export default SupplierList;
