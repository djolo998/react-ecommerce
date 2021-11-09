import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectBrandUpdateErrors,
  fetchBrand,
  updateBrand,
  selectBrandById,
} from "../../../redux/reducers/AdminSlice/brandsSlice";
import { CreateFormElements } from "../Form";
import {
  AddResourceButton,
  AdminCreateHeader,
  ResourceForm,
} from "../components/";
import { useBrand } from "./hooks";
import { brandFormsInputs, brandDefaultState } from "./shared";

const UpdateBrandPage = ({ match }) => {
  let { brandId } = match.params;
  const dispatch = useDispatch();

  const [pageTitle, setPageTitle] = useState("Admin - Update Brand");

  const brandInStore = useSelector((state) => selectBrandById(state, brandId));

  const { brandState, setBrandState, handleFieldChange } =
    useBrand(brandDefaultState);

  let brandUpdateStateErrors = useSelector(selectBrandUpdateErrors);

  useEffect(() => {
    if (brandInStore) {
      setBrandState((draft) => {
        draft["brand_name"] = brandInStore["brand_name"];
      });
      setPageTitle(`Update - ${brandInStore.brand_name}`);
    } else {
      dispatch(fetchBrand(brandId));
    }
  }, [brandInStore]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateBrand({ ...brandState, id: brandId }));
  };

  return (
    <AdminCreateHeader title={pageTitle} text="Update Brand">
      <ResourceForm handleSubmit={handleSubmit}>
        <CreateFormElements
          formInputs={brandFormsInputs}
          formState={brandState}
          formErrorState={brandUpdateStateErrors}
          handleFieldChange={handleFieldChange}
        />
        <div>
          <AddResourceButton text={"Update Brand"} />
        </div>
      </ResourceForm>
    </AdminCreateHeader>
  );
};

export default UpdateBrandPage;
