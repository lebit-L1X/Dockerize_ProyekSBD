import React from "react";

const Cart = ({ cart, handleOrder }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div key={index} className="border p-2 rounded mb-2">
              <p>{item.name}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Total: ${item.quantity * item.price}</p>
            </div>
          ))}
          <button
            className="mt-2 bg-green-500 text-white py-1 px-4 rounded"
            onClick={handleOrder}
          >
            Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
