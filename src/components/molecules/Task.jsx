// react
import PropTypes from "prop-types";

// material UI
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Grid,
  InputAdornment,
  TextField
} from "@material-ui/core";

// components, graphql, and consts
import TaskController from "./TaskController";
import CONSTS from "../../consts";

const Task = ({ task }) => (
  <Box mb={CONSTS.BOX_M}>
    <Card>
      <CardActions>
        <TaskController task={task} />
      </CardActions>
      <CardContent>
        <Grid container>
          <Grid container sm={6}>
            <Grid item xs={6}>
              <Box m={CONSTS.BOX_M}>
                <TextField
                  label="Task Name"
                  value="value"
                  onChange={() => {
                    console.log("changed!");
                  }}
                  aria-describedby="task-name"
                  fullWidth
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box m={CONSTS.BOX_M}>
                <TextField
                  label="Estimated Time"
                  value="value"
                  onChange={() => {
                    console.log("changed!");
                  }}
                  aria-describedby="estimated-time"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">h</InputAdornment>
                    )
                  }}
                  fullWidth
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container sm={6}>
            <Grid item xs={6}>
              <Box m={CONSTS.BOX_M}>
                <TextField
                  label="Start After"
                  value="value"
                  onChange={() => {
                    console.log("changed!");
                  }}
                  aria-describedby="task-name"
                  fullWidth
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box m={CONSTS.BOX_M}>
                <TextField
                  label="End By"
                  value="value"
                  onChange={() => {
                    console.log("changed!");
                  }}
                  aria-describedby="estimated-time"
                  fullWidth
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  </Box>
);

Task.propTypes = {
  task: PropTypes.shape({
    status: PropTypes.string.isRequired
  }).isRequired
};

export default Task;
