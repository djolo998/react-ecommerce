import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useImmer } from "use-immer";
import { getBase64 } from "../Form";

import { selectIsFetched } from "../../../redux/reducers/AdminSlice/adapter";
import { fetchBrands } from "../../../redux/reducers/AdminSlice/brandsSlice";
import { fetchColors } from "../../../redux/reducers/AdminSlice/colorsSlice";
import { fetchGenres } from "../../../redux/reducers/AdminSlice/genresSlice";
import { fetchSizes } from "../../../redux/reducers/AdminSlice/sizesSlice";
import { fetchCategories } from "../../../redux/reducers/AdminSlice/categoriesSlice";

const useProducts = (productDefaultState) => {
  const [productState, setProductState] = useImmer(productDefaultState);

  const handleCheckBoxStateChanged = (e) => {
    let { name, value, checked } = e.target;
    value = Number(value);
    if (checked)
      setProductState((draft) => {
        draft[name].push(value);
      });
    else {
      let index = productState[name].indexOf(value);
      setProductState((draft) => {
        draft[name].splice(index, 1);
      });
    }
  };

  const handleProductFieldChange = (e) => {
    let { name, value } = e.target;
    setProductState((draft) => {
      draft[name] = value;
    });
  };

  const handleFileChange = (e) => {
    getBase64(e.target.files[0]).then(function (result) {
      setProductState((draft) => {
        draft.image = result;
      });
    });
  };

  return {
    productState,
    setProductState,
    handleCheckBoxStateChanged,
    handleProductFieldChange,
    handleFileChange,
  };
};

const useDispatchResources = () => {
  const dispatch = useDispatch();
  const isFetched = useSelector(selectIsFetched);
  let resourceFunctionKeyMap = {
    brands: fetchBrands,
    colors: fetchColors,
    genres: fetchGenres,
    sizes: fetchSizes,
    categories: fetchCategories,
  };

  const fetchAll = useCallback(() => {
    Object.keys(resourceFunctionKeyMap).forEach((key) => {
      if (!isFetched[key]["?all=true"])
        dispatch(resourceFunctionKeyMap[key]("?all=true"));
    });
  }, []);
  return { fetchAll };
};

export { useProducts, useDispatchResources };
