"use client";
import React from 'react';
import { useDispatch } from 'react-redux';
import { incremented, decremented, reset } from '@/Redux/features/cartSlice';
import { FiPlusCircle, FiMinusCircle, FiTrash } from 'react-icons/fi';
import { useCartDetails } from '@/components/productsProperts/TotalAmount';

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, totalQuantity } = useCartDetails();

  const totalPrice = cartItems.reduce((acc, [_, item]) => {
    return acc + item.price * item.quantity;
  }, 0);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4 mb-6">
            {cartItems.map(([id, item]) => (
              <li key={id} className="bg-white shadow-md p-4 rounded-lg flex gap-4 items-start">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600 mb-1">{item.description}</p>
                  <p className="text-gray-600 mb-1">{item.price} $</p>
                  <div className="flex items-center gap-4 mt-2">
                    <p className="text-blue-600 font-semibold">Quantity: {item.quantity}</p>

                    <button
                      onClick={() =>
                        dispatch(incremented({
                          id,
                          name: item.name,
                          description: item.description,
                          image: item.image,
                          price: item.price,
                        }))
                      }
                      className="text-green-600 hover:text-green-800"
                      title="Increase"
                    >
                      <FiPlusCircle size={20} />
                    </button>

                    <button
                      onClick={() => dispatch(decremented({ id }))}
                      className="text-yellow-600 hover:text-yellow-800"
                      title="Decrease"
                    >
                      <FiMinusCircle size={20} />
                    </button>

                    <button
                      onClick={() => dispatch(reset({ id }))}
                      className="text-red-600 hover:text-red-800"
                      title="Remove"
                    >
                      <FiTrash size={20} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="text-xl font-bold text-right space-y-2">
            <div>Total Quantity: <span className="text-green-600">{totalQuantity}</span></div>
            <div>Total Price: <span className="text-blue-600">{totalPrice.toFixed(2)} $</span></div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
