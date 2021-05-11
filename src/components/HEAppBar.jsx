import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import FunChan from "../Icons/Funchan";
import CONSTS from "../consts";

const HEAppBar = (user) => (
  <AppBar position="static">
    {console.log(user)}
    <Toolbar>
      <FunChan />
      <Typography>{CONSTS.APP_NAME}</Typography>
      {user && <AccountCircle />}
    </Toolbar>
  </AppBar>
);

export default HEAppBar;
