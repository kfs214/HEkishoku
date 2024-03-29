import { Typography } from "@material-ui/core";
import { PlayCircleFilled } from "@material-ui/icons";

const TaskTimer = () => (
  <>
    <PlayCircleFilled color="disabled" />
    <Typography color="textSecondary" display="inline">
      8:88:88
    </Typography>
  </>
);

export default TaskTimer;
