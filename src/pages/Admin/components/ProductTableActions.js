import React from "react";
import { useDispatch } from "react-redux";
import { EditIconButton } from "../components";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { deleteProduct } from "../../../redux/reducers/AdminSlice/productsSlice";

const ProductTableActions = ({ data }) => {
  const dispatch = useDispatch();
  let editLink = `/admin/products/edit/${data.product_id}`;
  const handleDeleteClick = () => dispatch(deleteProduct(data.product_id));
  return (
    <>
      <EditIconButton editLink={editLink} />

      <DeleteForeverIcon
        onClick={handleDeleteClick}
        style={{ cursor: "pointer" }}
      />
    </>
  );
};

export default ProductTableActions;
