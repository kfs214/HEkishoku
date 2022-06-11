import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Slide,
  useScrollTrigger,
} from "@material-ui/core";
import { Save } from "@material-ui/icons";

import { useState } from "react";
import CONSTS from "../../consts";
import FunChan from "../../assets/funchan.svg";
import UserMenu from "./UserMenu";
import Settings from "../../containers/Settings";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    maxWidth: 40,
    marginRight: 10,
  },
}));

const HideOnScroll = ({ children }) => {
  const trigger = useScrollTrigger({ target: window });

  return <Slide in={!trigger}>{children}</Slide>;
};

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

const HEAppBar = ({ isLoggedIn, userSub = null, isEditingTitle }) => {
  const classes = useStyles();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const contentsUnderLogInCondition = isLoggedIn ? (
    <>
      {isEditingTitle && <Save />}
      <UserMenu setSettingsOpen={setSettingsOpen} />
      <Settings
        userSub={userSub}
        settingsOpen={settingsOpen}
        setSettingsOpen={setSettingsOpen}
      />
    </>
  ) : null;

  return (
    <HideOnScroll>
      <AppBar>
        <Toolbar>
          <img src={FunChan} alt="logo" className={classes.logo} />
          <Typography variant="h6" className={classes.title}>
            {CONSTS.APP_NAME}
          </Typography>
          {contentsUnderLogInCondition}
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};

HEAppBar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  userSub: PropTypes.string,
  isEditingTitle: PropTypes.bool.isRequired,
};

HEAppBar.defaultProps = {
  userSub: null,
};

export default HEAppBar;
