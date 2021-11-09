import React from "react";

import { Pagination as MuiPagination } from "@material-ui/lab/";

const Pagination = (props) => {
  return (
    <MuiPagination
      count={props.last_page}
      page={props.current_page}
      variant="outlined"
      shape="rounded"
      style={{ marginTop: "10px" }}
      onChange={props.handleChangePage}
    />
  );
};

export default Pagination;
