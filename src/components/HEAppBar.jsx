import PropTypes from "prop-types";
import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
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

const HEAppBar = ({ isLoggedIn = false }) => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <img src={FunChan} alt="logo" className={classes.logo} />
        <Typography variant="h6" className={classes.title}>
          {CONSTS.APP_NAME}
        </Typography>
        {isLoggedIn && <AccountCircle />}
      </Toolbar>
    </AppBar>
  );
};

HEAppBar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default HEAppBar;
