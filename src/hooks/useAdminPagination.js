import { useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";

const getBracketQuery = (page) => {
  return queryString.stringify(
    {
      page: page,
    },
    { arrayFormat: "bracket" }
  );
};

const useAdminPagination = () => {
  let { pathname } = useLocation();
  let history = useHistory();

  const handleChangePage = (e, page) => {
    let query = getBracketQuery(page);
    history.push(`${pathname}?${query}`);
  };

  return {
    handleChangePage,
  };
};

export default useAdminPagination;
