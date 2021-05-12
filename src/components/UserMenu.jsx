import { useState } from "react";

import { Auth } from "aws-amplify";

import {
  Button,
  Typography,
  Menu,
  MenuItem,
  makeStyles
} from "@material-ui/core";

import {
  AccountCircle,
  Settings as SettingsIcon,
  ExitToApp as ExitToAppIcon
} from "@material-ui/icons";

const useStyles = makeStyles(() => ({
  menuTitle: {
    flexGrow: 1
  }
}));

const UserMenu = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = ({ currentTarget }) => {
    setAnchorEl(currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    try {
      await Auth.signOut();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log("error signing out: ", e);
    }
  };

  return (
    <>
      <Button aria-controls="user-menu" aria-haspopup onClick={handleClick}>
        <AccountCircle style={{ color: "white" }} />
      </Button>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Typography className={classes.menuTitle}>Settings...</Typography>
          <SettingsIcon />
        </MenuItem>
        <MenuItem onClick={handleSignOut}>
          <Typography className={classes.menuTitle}>Sign Out</Typography>
          <ExitToAppIcon />
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
