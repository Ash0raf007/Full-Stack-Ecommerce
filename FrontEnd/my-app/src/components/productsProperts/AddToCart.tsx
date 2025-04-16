"use client";
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incremented, decremented, reset } from '@/Redux/features/cartSlice';
import { RootState } from '@/Redux/store';
import { FiMinusCircle, FiPlusCircle } from 'react-icons/fi';

interface AddToCartProps {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
}

 const AddToCart: React.FC<AddToCartProps> = ({ id, name, description, image, price }) => {
  const count = useSelector((state: RootState) => state.cart.items[id]?.quantity || 0);
  const dispatch = useDispatch();

  return (
    <div className='flex flex-col items-center justify-between'>
      {count === 0 ? (
        <div
          onClick={() => dispatch(incremented({ id, name, description, image, price }))}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-[10px] cursor-pointer">
          Add to Cart
        </div>
      ) : (
        <>
          <div className='w-[30px] bg-red-400 flex text-center items-center justify-center rounded-full h-[30px]'>
            <p>{count}</p>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <button onClick={() => dispatch(incremented({ id, name, description, image,price }))}>
              <FiPlusCircle className='text-[20px]' />
            </button>
            <button onClick={() => dispatch(decremented({ id }))}>
              <FiMinusCircle className='text-[20px]' />
            </button>
            <button onClick={() => dispatch(reset({ id }))} className="text-sm bg-gray-200 px-2 py-1 rounded">
              Reset
            </button>
          </div>
        </>
      )}
    </div>
  );
};
export default AddToCart;