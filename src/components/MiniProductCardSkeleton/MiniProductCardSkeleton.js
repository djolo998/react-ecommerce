import React from "react";
import {
  Card as MuiCard,
  CardContent as MuiCardContent,
  Box,
  Typography,
  Button,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

const MiniProductCardSkeleton = () => {
  return (
    <div style={{ width: 240, height: 300 }}>
      <Skeleton variant="text" width={33} height={32} />
      <Skeleton variant="rect" width={225} height={140} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Skeleton variant="text" width={150} height={55} />
      </div>
      <Skeleton variant="rect" width={90} height={10} />
      <Skeleton variant="text" width={90} height={34} />
    </div>
  );
};

export default MiniProductCardSkeleton;
