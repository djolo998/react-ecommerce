import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAddToCart } from "../redux/reducers/cartSlice";

const useAddToCart = (product) => {
  const dispatch = useDispatch();

  const [productId, setProductId] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [maxQuantityForSize, setMaxQuantityForSize] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    if (product) {
      setProductId(product.product_id);
    }
  }, [product]);

  const handleSelectedSize = (size_id) => {
    setSelectedSize(size_id);
    let maxQty = product.sizes.find((s) => s.size_id == size_id).pivot.quantity;
    setMaxQuantityForSize(maxQty);
    setSelectedQuantity(1);
  };

  const handleAddToCart = () => {
    dispatch(
      fetchAddToCart({
        size_id: selectedSize,
        quantity: selectedQuantity,
        product_id: productId,
      })
    );
  };
  const handleSelectedQuantity = (e) => setSelectedQuantity(e.target.value);

  return {
    selectedQuantity,
    maxQuantityForSize,
    selectedSize,
    handleSelectedSize,
    handleAddToCart,
    handleSelectedQuantity,
  };
};

export default useAddToCart;
