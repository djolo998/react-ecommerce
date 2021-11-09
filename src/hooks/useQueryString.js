import { useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";
import { getQueryString } from "../utils";

const useQueryString = () => {
  let { search } = useLocation();

  const querySearch = getQueryString(search);

  return {
    querySearch,
  };
};

export default useQueryString;
