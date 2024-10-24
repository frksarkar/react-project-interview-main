import React from 'react';
import { RiDeleteBin5Line } from 'react-icons/ri';

const CartItem = ({
	cart,
	removeFromCart,
	incrementItem,
    decrementItem,
	calculateSubTotal,
    arrProp
}) => {
	return (
		<tr className="border-b border-gray-300">
      <td>
        <div className="flex items-center justify-center">
          {/* Remove Item Button */}
          <div className="w-[20%] text-center flex items-center justify-center">
            <RiDeleteBin5Line
              className="text-xl hover:text-footer_color cursor-pointer"
              onClick={() => removeFromCart(cart?.id)} // Remove item from cart
            />
          </div>
          {/* Product Information */}
          <div className="flex flex-col text-center justify-center items-center py-2 w-[80%]">
            <div className="mask">
              <img
                className="h-[40px] w-[70px]"
                src={
                  cart?.photo ||
                  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                }
                alt="Course"
              />
            </div>
            <p className="text-[14.4px] px-[7px] text-center flex">
              {cart?.course_name}{' '}
              <span className="hidden lg:flex">- {cart?.trainer_data?.name}</span>
            </p>
          </div>
        </div>
      </td>
      {/* Price Information */}
      <td>
        <p className="text-[14.4px] font-bold p-[7px] text-black text-center">
          Tk {cart?.discount_price}
        </p>
      </td>
      {/* Quantity Control */}
      <td>
        <div className="flex justify-center">
          {/* Decrement Button */}
          <div className="border">
            <button
              className="px-4 w-[30px] font-bold my-1.5"
              onClick={() => decrementItem(cart?.id)}
              disabled={cart?.quantity <= 1} // Disable when quantity is 1
            >
              -
            </button>
          </div>
          {/* Quantity Display */}
          <div className="border-y">
            <input
              type="number"
              readOnly
              value={cart?.quantity}
              className="font-bold w-[30px] lg:w-[60px] px-2 text-center mx-auto h-full"
            />
          </div>
          {/* Increment Button */}
          <div className="border">
            <button
              className="px-4 w-[30px] font-bold my-1.5"
              onClick={() => incrementItem(cart?.id)}
            >
              +
            </button>
          </div>
        </div>
      </td>
      {/* Subtotal */}
      <td>
        <p className="text-[14.4px] font-bold p-[7px] text-black text-center">
          Tk {calculateSubTotal(cart)}
        </p>
      </td>
    </tr>
	);
};

export const CartItemHeader = () => {
    return (
        <tr className="border-b border-gray-300">
            <th className="text-[14.4px] font-bold p-[7px] text-black">
                Course
            </th>
            <th className="text-[14.4px] font-bold p-[7px] text-black">
                Price
            </th>
            <th className="text-[14.4px] font-bold p-[7px] text-black">
                Quantity
            </th>
            <th className="text-[14.4px] font-bold p-[7px] text-black">
                Sub Total
            </th>
        </tr>
    );
};

export default CartItem;
