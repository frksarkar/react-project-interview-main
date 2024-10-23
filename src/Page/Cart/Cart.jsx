import { useContext } from 'react';
import { OrderContext } from '../../ContextAPIs/OrderProvider';
import { Link } from 'react-router-dom';
import { CartItem, CartItemHeader, CartSummary } from '../../components/index';
import { calculateSubTotal, calculateTotalPrice } from '../../Utils/helpers';
const Cart = () => {
	const { cart, removeFromCart, updateCartQuantity, setCartItem } =
		useContext(OrderContext);

	return (
		<div className="m-mt_16px">
			<h1 className="text-sm text-start md:text-text_xl lg:py-0 font-bold">
				Cart
			</h1>
			<div className="pt-p_16px">
				<div className="lg:flex items-start gap-3">
					<div className="w-full lg:w-[58%] bg-white border-2">
						<table className="overflow-x-auto w-full">
							<thead>
								<CartItemHeader />
							</thead>

							{/* Cart Items Table Body Start */}
							<tbody className="overflow-x-auto">
								{cart ? (
									<CartItem
										cart={cart}
										removeFromCart={removeFromCart}
										incrementItem={() => updateCartQuantity(cart.id, cart.quantity + 1)}
                                        decrementItem={() => updateCartQuantity(cart.id, cart.quantity - 1)}
										calculateSubTotal={calculateSubTotal}
									/>
								) : (
									<tr>
										<td
											colSpan="4"
											className="text-center py-4"
										>
											Your cart is empty
										</td>
									</tr>
								)}
							</tbody>

							{/* Cart Items Table Body End */}
						</table>
					</div>

					<div className="lg:w-[41%] bg-white border-2">
						<CartSummary
							calculateTotalPrice={() =>
								calculateTotalPrice(cart)
							}
							handleSubmit={() => {
                                setCartItem(cart);
                                removeFromCart(null);
                            }}
							link={cart ? "/checkout" : "/course"}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;
