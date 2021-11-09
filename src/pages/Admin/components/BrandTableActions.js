import React from "react";
import { useDispatch } from "react-redux";
import { EditIconButton } from "../components";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { deleteBrand } from "../../../redux/reducers/AdminSlice/brandsSlice";

const BrandTableActions = ({ data }) => {
  const dispatch = useDispatch();
  let editLink = `/admin/brands/edit/${data.brand_id}`;
  const handleDeleteClick = () => dispatch(deleteBrand(data.brand_id));
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

export default BrandTableActions;
