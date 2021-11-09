import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

const ApiErrorBoundary = () => {
  const dispatch = useDispatch();
  const is404ApiError = useSelector((state) => state.ui.is404ApiError);
  if (is404ApiError) {
    return <Redirect to="/404" />;
  }
  return null;
};

export default ApiErrorBoundary;
