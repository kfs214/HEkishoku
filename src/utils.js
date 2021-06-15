import PropTypes from "prop-types";

export const tasksPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  spentHour: PropTypes.number,
  estimatedHour: PropTypes.number,
  startedAt: PropTypes.string,
  endedBy: PropTypes.string
});

export const handleHoursChange = ({
  e,
  key,
  handleOnChange,
  validator = () => true
}) => {
  const value = e.target.value.replace(/[^\d.]/g, "");

  if (validator(value)) {
    const float = value === "" ? null : parseFloat(value);

    handleOnChange({ [key]: float });
  }
};
