import { useState } from "react";

import PropTypes from "prop-types";

import { Auth } from "aws-amplify";

import {
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";

import {
  AccountCircle,
  Settings as SettingsIcon,
  ExitToApp as ExitToAppIcon
} from "@material-ui/icons";

const UserMenu = ({ setSettingsOpen }) => {
  const anchor = "right";

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const handleOpenSettings = () => {
    handleCloseDrawer();
    setSettingsOpen(true);
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
      <Button
        aria-controls="user-menu-drawer"
        aria-haspopup
        onClick={handleOpenDrawer}
      >
        <AccountCircle style={{ color: "white" }} />
      </Button>
      <Drawer
        anchor={anchor}
        id="user-menu-drawer"
        open={drawerOpen}
        onClose={handleCloseDrawer}
      >
        <List>
          <ListItem onClick={handleOpenSettings}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings..." />
          </ListItem>
          <ListItem onClick={handleSignOut}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

UserMenu.propTypes = {
  setSettingsOpen: PropTypes.func.isRequired
};

export default UserMenu;
