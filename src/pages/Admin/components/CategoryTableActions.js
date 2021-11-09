import React from "react";
import { useDispatch } from "react-redux";
import { EditIconButton } from "../components";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { deleteCategory } from "../../../redux/reducers/AdminSlice/categoriesSlice";

const CategoryTableActions = ({ data }) => {
  const dispatch = useDispatch();
  let editLink = `/admin/categories/edit/${data.category_id}`;
  const handleDeleteClick = () => dispatch(deleteCategory(data.category_id));
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

export default CategoryTableActions;
