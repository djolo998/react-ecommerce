import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useImmer } from "use-immer";
import { fetchCreateOrder } from "../redux/reducers/cartSlice";

const useCart = () => {
  const dispatch = useDispatch();
  const checkout = useSelector((state) => state.cart.checkout);

  const [checkoutState, setCheckoutState] = useImmer({
    delivery: 1,
    paymentMethod: 1,
  });

  const handleDeliveryChange = (e) =>
    setCheckoutState((draft) => {
      draft.delivery = e.target.value;
    });

  const handleSelectedPaymentMethodChange = (e) =>
    setCheckoutState((draft) => {
      draft.paymentMethod = e.target.value;
    });

  const handleOrder = () => {
    dispatch(fetchCreateOrder());
  };

  return {
    checkoutState,
    setCheckoutState,
    handleDeliveryChange,
    handleSelectedPaymentMethodChange,
    checkout,
    handleOrder,
  };
};

export default useCart;
