import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCategoryUpdateErrors,
  fetchCategory,
  updateCategory,
  selectCategoryById,
} from "../../../redux/reducers/AdminSlice/categoriesSlice";
import { CreateFormElements } from "../Form";
import {
  AddResourceButton,
  AdminCreateHeader,
  ResourceForm,
} from "../components/";
import { useCategory } from "./hooks";
import { categoryFormsInputs, categoryDefaultState } from "./shared";

const UpdateCategoryPage = ({ match }) => {
  let { categoryId } = match.params;
  const dispatch = useDispatch();

  const [pageTitle, setPageTitle] = useState("Admin - Update Category");

  const categoryInStore = useSelector((state) =>
    selectCategoryById(state, categoryId)
  );

  const { categoryState, setCategoryState, handleCategoryFieldChange } =
    useCategory(categoryDefaultState);

  let categoryUpdateStateErrors = useSelector(selectCategoryUpdateErrors);

  useEffect(() => {
    if (categoryInStore) {
      setCategoryState((draft) => {
        draft["category_name"] = categoryInStore["category_name"];
      });
      setPageTitle(`Update - ${categoryInStore.category_name}`);
    } else {
      dispatch(fetchCategory(categoryId));
    }
  }, [categoryInStore]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCategory({ ...categoryState, id: categoryId }));
  };

  return (
    <AdminCreateHeader title={pageTitle} text="Update Category">
      <ResourceForm handleSubmit={handleSubmit}>
        <CreateFormElements
          formInputs={categoryFormsInputs}
          formState={categoryState}
          formErrorState={categoryUpdateStateErrors}
          handleFieldChange={handleCategoryFieldChange}
        />
        <div>
          <AddResourceButton text={"Update Category"} />
        </div>
      </ResourceForm>
    </AdminCreateHeader>
  );
};

export default UpdateCategoryPage;
