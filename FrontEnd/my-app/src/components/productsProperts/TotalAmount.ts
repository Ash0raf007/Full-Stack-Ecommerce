import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";

export const useCartDetails = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const cartItems = Object.entries(items).filter(([_, item]) => item.quantity > 0);
  const totalQuantity = cartItems.reduce((total, [_, item]) => total + item.quantity, 0);

  return { cartItems, totalQuantity };
};
