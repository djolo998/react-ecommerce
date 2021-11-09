import { useImmer } from "use-immer";

const useBrand = (brandDefaultState) => {
  const [brandState, setBrandState] = useImmer(brandDefaultState);
  const handleFieldChange = (e) => {
    let { name, value } = e.target;
    setBrandState((draft) => {
      draft[name] = value;
    });
  };

  return {
    brandState,
    setBrandState,
    handleFieldChange,
  };
};

export { useBrand };
