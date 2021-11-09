import {
  createSelector,
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  current,
} from "@reduxjs/toolkit";
import axios from "../../../axios";

import { adapterEntities } from "./adapter";

const pluralize = require("pluralize");

const selectCreateErrors = (state) => state.create.errors;
const selectUpdateErrors = (state) => state.update.errors;

const defaultResourceState = {
  current_page: 1,
  pageSize: 0,
  count: 0,
  hasNext: false,
  last_page: 0,
  total: null,
  data: [],
};

const createResourceSelector = (
  slicePart,
  keys,
  denormalizeFunction,
  resourceState = { ...defaultResourceState }
) =>
  createSelector(
    [
      (state) => state.admin,
      (state, selectedQueryString) => selectedQueryString,
    ],
    (adminState, selectedQueryString) => {
      let selected = adminState[slicePart].queryString[selectedQueryString];
      if (!selected) {
        return resourceState;
      } else {
        let ids = selected[slicePart];
        let obj = keys.reduce((acc, k) => {
          acc[k] = adminState[k]["entities"];
          return acc;
        }, {});
        let data = denormalizeFunction(ids, obj);
        return {
          ...selected,
          data: data[slicePart],
        };
      }
    }
  );

const upsetNormalizedSlice = (stateSlice) => (state, action) => {
  const { entities, qsUpdate, ...rest } = action.payload;
  adapterEntities[stateSlice].upsertMany(state, entities[stateSlice]);
  if (stateSlice == qsUpdate) {
    const { arg } = action.meta;
    state.queryString[arg] = {
      ...rest,
      [stateSlice]: Object.keys(entities[stateSlice]),
    };
  }
};


const normalizeAndUpsetSlice =
  (normalizeFunction, stateSlice) => (state, action) => {
    
    let normalized = normalizeFunction(action.payload.data);
    adapterEntities[stateSlice].upsertMany(
      state,
      normalized.entities[stateSlice]
    );

    const { data, ...rest } = action.payload;
    const { arg } = action.meta;
    state.queryString[arg] = {
      ...rest,
      [stateSlice]: normalized.result,
    };

    state.isLoading = false;
  };
const createUpdateResourceRejected = (resource) => (state, action) => {
  state.update.errors = action.payload.errors;
};
const createUpdateResourceFulfilled = (resource) => (state, action) => {
  state.update.errors = null;
  adapterEntities[resource].updateOne(state, {
    id: action.meta.arg.id,
    changes: action.meta.arg,
  });
};
const createAddNewResourceFulfilled = (resource) => (state, action) => {
  state.create.errors = null;
  state.queryString = {};
  adapterEntities[resource].addOne(state, action.payload);
};

const createAddNewResourceRejected = (resource) => (state, action) => {
  state.create.errors = action.payload.errors;
};

const withNormalize = (actionName, url) => (normalizeFunction) => {
  return createAsyncThunk(actionName, async (qs) => {
    let result = await (await axios.get(`${url}${qs}`)).data;
    let normalized = normalizeFunction(result.data);
    return normalized;
  });
};
const createFetchResourceFunction = ({
  actionName,
  url,
  normalizeFunction,
  qsUpdate,
}) => {
  return createAsyncThunk(actionName, async (qs) => {
    let result = await axios.get(`${url}${qs}`);
    if (normalizeFunction)
      result = {
        ...result,
        ...normalizeFunction(result.data),
        qsUpdate,
      };
    return result;
  });
};
const createDeleteResourceFunction = (actionName, url) => {
  return createAsyncThunk(actionName, async (qs) => {
    return await (
      await axios.delete(`${url}${qs}`)
    ).data;
  });
};
const createPostResourceFunction = (actionName, url, method = "post") => {
  return createAsyncThunk(actionName, async (data, { rejectWithValue }) => {
    try {
      return await axios[method](url, { ...data });
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  });
};

const createUpdateResourceFunction = (actionName, url) => {
  return createAsyncThunk(actionName, async (data, { rejectWithValue }) => {
    try {
      return await (
        await axios.put(`${url}${data.id}`, { ...data })
      ).data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  });
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const createCrudAsyncThunkFunctions = (resource) => {
  const capitalized = capitalizeFirstLetter(resource.name);
  const pluralized = pluralize.plural(capitalized);
  // const url = `/admin/${resource.url}/`;
  const urlFetch = `/admin/${resource.url}`;
  const url = `/admin/${resource.url}/`;
  const deleteResource = createDeleteResourceFunction(
    `admin/delete${capitalized}`,
    url
  );
  const fetchSingleResource = createFetchResourceFunction({
    actionName: `admin/fetch${capitalized}`,
    url,
  });

  const fetchMultypleResources = createFetchResourceFunction({
    actionName: `admin/fetch${pluralized}`,
    url: urlFetch,
    normalizeFunction: resource.multypleResourceNormalized,
    qsUpdate: resource.url,
  });

  const addNewResource = createPostResourceFunction(
    `admin/addNew${capitalized}`,
    urlFetch
  );

  const updateResource = createUpdateResourceFunction(
    `admin/update${capitalized}`,
    url
  );

  return {
    deleteResource,
    fetchSingleResource,
    fetchMultypleResources,
    addNewResource,
    updateResource,
  };
};
const cleanQueryStringCache = (state) => (state.queryString = {});
export {
  createResourceSelector,
  normalizeAndUpsetSlice,
  createUpdateResourceRejected,
  createUpdateResourceFulfilled,
  createFetchResourceFunction,
  createPostResourceFunction,
  createUpdateResourceFunction,
  createDeleteResourceFunction,
  createAddNewResourceRejected,
  createAddNewResourceFulfilled,
  createCrudAsyncThunkFunctions,
  selectCreateErrors,
  selectUpdateErrors,
  withNormalize,
  upsetNormalizedSlice,
  cleanQueryStringCache,
};
