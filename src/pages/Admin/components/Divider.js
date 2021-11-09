import { spacing } from "@material-ui/system";
import styled from "styled-components";

import { Divider as MuiDivider } from "@material-ui/core";

const MyDivider = styled(MuiDivider)(spacing);

const Divider = () => <MyDivider my={3} />;

export default Divider;
