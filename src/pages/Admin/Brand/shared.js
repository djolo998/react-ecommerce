import BrandTableActions from "../components/BrandTableActions";

const brandFormsInputs = [
  { name: "brand_name", type: "text", label: "Brand Name" },
];

const brandDefaultState = {
  brand_name: "",
};

const brandTableDate = [
  { title: "Brand Id", key: "brand_id" },
  { title: "Brand Name", key: "brand_name" },
  { title: "Actions", key: "actions", component: BrandTableActions },
];

export { brandFormsInputs, brandDefaultState, brandTableDate };
