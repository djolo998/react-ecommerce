import React from "react";
import get from "lodash/get";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider as MuiDivider,
  Typography as MuiTypography,
} from "@material-ui/core";

import { Skeleton } from "@material-ui/lab";

const createTable = (tableDate, dataArray, isLoading) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {tableDate.map((data, ind) => {
              let align = ind == 0 ? "" : "left";
              return (
                <TableCell align={align} key={data.title}>
                  {data.title}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>

        <TableBody>
          {!isLoading &&
            dataArray.map((row, ind) => (
              <TableRow key={ind}>
                {tableDate.map((data) => {
                  let tableCellContent = get(row, data.key);
                  if (data.custom)
                    tableCellContent = data.fn(get(row, data.key));
                  if (data.component) {
                    let Component = data.component;
                    tableCellContent = <Component data={row} />;
                  }
                  return (
                    <TableCell component="th" scope="row" key={data.key}>
                      {tableCellContent}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          {isLoading &&
            [0, 1, 2, 3].map((row) => (
              <TableRow>
                {tableDate.map((data) => {
                  return (
                    <TableCell component="th" scope="row">
                      <Skeleton variant="rect" width={"100%"} height={20} />
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { createTable };
