import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Slide,
  useScrollTrigger
} from "@material-ui/core";
import UserMenu from "./UserMenu";
import FunChan from "../assets/funchan.svg";
import CONSTS from "../consts";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  },
  logo: {
    maxWidth: 40,
    marginRight: 10
  }
}));

const HideOnScroll = ({ children }) => {
  const trigger = useScrollTrigger({ target: window });

  return <Slide in={!trigger}>{children}</Slide>;
};

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired
};

const HEAppBar = ({ isLoggedIn }) => {
  const classes = useStyles();

  return (
    <HideOnScroll>
      <AppBar>
        <Toolbar>
          <img src={FunChan} alt="logo" className={classes.logo} />
          <Typography variant="h6" className={classes.title}>
            {CONSTS.APP_NAME}
          </Typography>
          {isLoggedIn && <UserMenu />}
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};

HEAppBar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default HEAppBar;
