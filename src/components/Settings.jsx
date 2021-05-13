import PropTypes from "prop-types";
import { Modal } from "@material-ui/core";

const Settings = ({ open = false, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="settings-modal">
      <p>modal opened</p>
    </Modal>
  );
};

Settings.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
};

export default Settings;
