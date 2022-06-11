import PropTypes from "prop-types";
import Tasks from "../../containers/Tasks";

const LoggedIn = ({ setIsEditingTitle }) => (
  <>
    <Tasks setIsEditingTitle={setIsEditingTitle} />
  </>
);

LoggedIn.propTypes = {
  setIsEditingTitle: PropTypes.func.isRequired,
};

export default LoggedIn;
