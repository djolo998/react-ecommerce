import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useImmer } from "use-immer";
import {
  fetchUpdateCart,
  fetchDeleteCartItem,
} from "../redux/reducers/cartSlice";
import { createProductSizeQuantyMap, formatValue } from "../utils";

const useCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const [cartState, setCartState] = useImmer(null);

  useEffect(() => {
    let cartState = createProductSizeQuantyMap(cart);
    setCartState(cartState);
  }, [cart]);

  const handleSelectedSizeChange = (productId, selectedSizeId) => {
    setCartState((draft) => {
      draft[productId].selectedQuantity = 1;
      draft[productId].selectedSizeId = selectedSizeId;
    });

    dispatchUpdateCart({
      quantity: 1,
      size_id: selectedSizeId,
      product_id: productId,
    });
  };

  const handleSelectedQuantityChange = (productId, selectedQuantity) => {
    setCartState((draft) => {
      draft[productId].selectedQuantity = selectedQuantity;
    });
    const { selectedSizeId } = cartState[productId];

    dispatchUpdateCart({
      quantity: selectedQuantity,
      size_id: selectedSizeId,
      product_id: productId,
    });
  };

  const dispatchUpdateCart = (data) => {
    dispatch(fetchUpdateCart(data));
  };

  const handleDeleteCartItem = (cartId) => {
    dispatch(fetchDeleteCartItem(cartId));
  };

  return {
    cartState,
    setCartState,
    handleSelectedSizeChange,
    handleSelectedQuantityChange,
    handleDeleteCartItem,
  };
};

export default useCart;
