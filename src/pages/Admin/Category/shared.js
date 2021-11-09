import CategoryTableActions from "../components/CategoryTableActions";

const categoryFormsInputs = [
  { name: "category_name", type: "text", label: "Category Name" },
];

const categoryDefaultState = {
  category_name: "",
};

const categoryTableDate = [
  { title: "Category Id", key: "category_id" },
  { title: "Category Name", key: "category_name" },
  { title: "Actions", key: "actions", component: CategoryTableActions },
];

export { categoryFormsInputs, categoryDefaultState, categoryTableDate };
