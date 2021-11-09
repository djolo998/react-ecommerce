import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCategoryCreateErrors,
  addNewCategory,
} from "../../../redux/reducers/AdminSlice/categoriesSlice";
import { CreateFormElements } from "../Form";
import {
  AddResourceButton,
  AdminCreateHeader,
  ResourceForm,
} from "../components/";
import { useCategory } from "./hooks";
import { categoryFormsInputs, categoryDefaultState } from "./shared";

function CreateCategoryPage() {
  const dispatch = useDispatch();

  const { categoryState, handleCategoryFieldChange } =
    useCategory(categoryDefaultState);

  let categoryCreateStateErrors = useSelector(selectCategoryCreateErrors);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewCategory({ ...categoryState }));
  };

  return (
    <AdminCreateHeader title="Admin Category Create" text="Create Category">
      <ResourceForm handleSubmit={handleSubmit}>
        <CreateFormElements
          formInputs={categoryFormsInputs}
          formState={categoryState}
          formErrorState={categoryCreateStateErrors}
          handleFieldChange={handleCategoryFieldChange}
        />

        <div>
          <AddResourceButton text={"Add Category"} />
        </div>
      </ResourceForm>
    </AdminCreateHeader>
  );
}
export default CreateCategoryPage;
