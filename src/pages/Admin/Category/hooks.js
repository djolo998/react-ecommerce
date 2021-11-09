import { useImmer } from "use-immer";

const categoryDefaultState = {
  category_name: "",
};
const useCategory = (categoryDefaultState) => {
  const [categoryState, setCategoryState] = useImmer(categoryDefaultState);
  const handleCategoryFieldChange = (e) => {
    let { name, value } = e.target;
    setCategoryState((draft) => {
      draft[name] = value;
    });
  };

  return {
    categoryState,
    setCategoryState,
    handleCategoryFieldChange,
  };
};

export { useCategory };
