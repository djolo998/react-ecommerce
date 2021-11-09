import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectBrandCreateErrors,
  addNewBrand,
} from "../../../redux/reducers/AdminSlice/brandsSlice";
import { CreateFormElements } from "../Form";
import {
  AddResourceButton,
  AdminCreateHeader,
  ResourceForm,
} from "../components";
import { useBrand } from "./hooks";
import { brandFormsInputs, brandDefaultState } from "./shared";

function CreateBrandPage() {
  const dispatch = useDispatch();

  const { brandState, handleFieldChange } = useBrand(brandDefaultState);

  let brandCreateStateErrors = useSelector(selectBrandCreateErrors);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewBrand({ ...brandState }));
  };

  return (
    <AdminCreateHeader title="Admin Brand Create" text="Create Brand">
      <ResourceForm handleSubmit={handleSubmit}>
        <CreateFormElements
          formInputs={brandFormsInputs}
          formState={brandState}
          formErrorState={brandCreateStateErrors}
          handleFieldChange={handleFieldChange}
        />

        <div>
          <AddResourceButton text={"Add Brand"} />
        </div>
      </ResourceForm>
    </AdminCreateHeader>
  );
}
export default CreateBrandPage;
