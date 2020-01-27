import React, { Component } from "react";

import PropTypes from "prop-types";

import DialogContent from "@material-ui/core/DialogContent";

import Box from "@material-ui/core/Box";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import Checkbox from "@material-ui/core/Checkbox";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";

import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import FormatColorResetIcon from "@material-ui/icons/FormatColorReset";

import appearance from "../../services/appearance";

class AppearanceTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      performingAction: false,
      primaryColorLabelWidth: 0,
      secondaryColorLabelWidth: 0
    };

    this.primaryColorLabel = React.createRef();
    this.secondaryColorLabel = React.createRef();
  }

  handlePrimaryColorChange = event => {
    if (!event) {
      return;
    }

    const primaryColor = event.target.value;

    if (!primaryColor) {
      return;
    }

    const { theme } = this.props;

    if (!theme) {
      return;
    }

    if (theme.primaryColor.id === primaryColor) {
      return;
    }

    this.setState(
      {
        performingAction: true
      },
      () => {
        appearance
          .changeTheme({
            primaryColor: primaryColor,
            secondaryColor: theme.secondaryColor.id,
            dark: theme.dark,
            dense: theme.dense
          })
          .catch(reason => {
            const code = reason.code;
            const message = reason.message;

            switch (code) {
              default:
                this.props.openSnackbar(message);
                return;
            }
          })
          .finally(() => {
            this.setState({
              performingAction: false
            });
          });
      }
    );
  };

  handleSecondaryColorChange = event => {
    if (!event) {
      return;
    }

    const secondaryColor = event.target.value;

    if (!secondaryColor) {
      return;
    }

    const { theme } = this.props;

    if (!theme) {
      return;
    }

    if (theme.secondaryColor.id === secondaryColor) {
      return;
    }

    this.setState(
      {
        performingAction: true
      },
      () => {
        appearance
          .changeTheme({
            primaryColor: theme.primaryColor.id,
            secondaryColor: secondaryColor,
            dark: theme.dark,
            dense: theme.dense
          })
          .catch(reason => {
            const code = reason.code;
            const message = reason.message;

            switch (code) {
              default:
                this.props.openSnackbar(message);
                return;
            }
          })
          .finally(() => {
            this.setState({
              performingAction: false
            });
          });
      }
    );
  };

  handleDarkModeChange = event => {
    if (!event) {
      return;
    }

    const dark = event.target.checked;

    const { theme } = this.props;

    if (!theme) {
      return;
    }

    if (theme.dark === dark) {
      return;
    }

    this.setState(
      {
        performingAction: true
      },
      () => {
        appearance
          .changeTheme({
            primaryColor: theme.primaryColor.id,
            secondaryColor: theme.secondaryColor.id,
            dark: dark,
            dense: theme.dense
          })
          .catch(reason => {
            const code = reason.code;
            const message = reason.message;

            switch (code) {
              default:
                this.props.openSnackbar(message);
                return;
            }
          })
          .finally(() => {
            this.setState({
              performingAction: false
            });
          });
      }
    );
  };

  handleResetThemeClick = () => {
    const { theme } = this.props;

    if (!theme) {
      return;
    }

    if (appearance.isDefaultTheme(theme)) {
      return;
    }

    this.setState(
      {
        performingAction: true
      },
      () => {
        appearance
          .resetTheme()
          .catch(reason => {
            const code = reason.code;
            const message = reason.message;

            switch (code) {
              default:
                this.props.openSnackbar(message);
                return;
            }
          })
          .finally(() => {
            this.setState({
              performingAction: false
            });
          });
      }
    );
  };

  render() {
    // Properties
    const { theme } = this.props;

    if (!theme) {
      return null;
    }

    const {
      performingAction,
      primaryColorLabelWidth,
      secondaryColorLabelWidth
    } = this.state;

    return (
      <DialogContent>
        <List dense={theme.dense} disablePadding>
          <Box mb={1}>
            <ListItem>
              <Hidden xsDown>
                <ListItemIcon>
                  <FiberManualRecord color="primary" />
                </ListItemIcon>
              </Hidden>

              <FormControl
                disabled={performingAction}
                fullWidth
                variant="outlined"
              >
                <InputLabel ref={this.primaryColorLabel}>
                  Primary color
                </InputLabel>

                <Hidden smUp>
                  <Select
                    native
                    value={theme.primaryColor.id}
                    labelWidth={primaryColorLabelWidth}
                    onChange={this.handlePrimaryColorChange}
                  >
                    {Object.keys(appearance.colors).map(color => {
                      color = appearance.colors[color];

                      return (
                        <option key={color.id} value={color.id}>
                          {color.name}
                        </option>
                      );
                    })}
                  </Select>
                </Hidden>

                <Hidden xsDown>
                  <Select
                    value={theme.primaryColor.id}
                    labelWidth={primaryColorLabelWidth}
                    onChange={this.handlePrimaryColorChange}
                  >
                    {Object.keys(appearance.colors).map(color => {
                      color = appearance.colors[color];

                      return (
                        <MenuItem key={color.id} value={color.id}>
                          {color.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Hidden>
              </FormControl>
            </ListItem>
          </Box>

          <Box mb={1}>
            <ListItem>
              <Hidden xsDown>
                <ListItemIcon>
                  <FiberManualRecord color="secondary" />
                </ListItemIcon>
              </Hidden>

              <FormControl
                disabled={performingAction}
                fullWidth
                variant="outlined"
              >
                <InputLabel ref={this.secondaryColorLabel}>
                  Secondary color
                </InputLabel>

                <Hidden smUp>
                  <Select
                    native
                    value={theme.secondaryColor.id}
                    labelWidth={secondaryColorLabelWidth}
                    onChange={this.handleSecondaryColorChange}
                  >
                    {Object.keys(appearance.colors).map(color => {
                      color = appearance.colors[color];

                      return (
                        <option key={color.id} value={color.id}>
                          {color.name}
                        </option>
                      );
                    })}
                  </Select>
                </Hidden>

                <Hidden xsDown>
                  <Select
                    value={theme.secondaryColor.id}
                    labelWidth={secondaryColorLabelWidth}
                    onChange={this.handleSecondaryColorChange}
                  >
                    {Object.keys(appearance.colors).map(color => {
                      color = appearance.colors[color];

                      return (
                        <MenuItem key={color.id} value={color.id}>
                          {color.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Hidden>
              </FormControl>
            </ListItem>
          </Box>

          <ListItem>
            <Hidden xsDown>
              <ListItemIcon>
                <Brightness4Icon />
              </ListItemIcon>
            </Hidden>

            <ListItemText
              primary="Dark mode"
              secondary="Displays mostly dark surfaces"
            />

            <ListItemSecondaryAction>
              <Hidden xsDown>
                <Checkbox
                  color="primary"
                  checked={theme.dark}
                  onChange={this.handleDarkModeChange}
                />
              </Hidden>

              <Hidden smUp>
                <Switch
                  color="primary"
                  checked={theme.dark}
                  onChange={this.handleDarkModeChange}
                />
              </Hidden>
            </ListItemSecondaryAction>
          </ListItem>

          <Box mt={2} mb={1}>
            <Divider light />
          </Box>

          <ListItem>
            <Hidden xsDown>
              <ListItemIcon>
                <FormatColorResetIcon />
              </ListItemIcon>
            </Hidden>

            <ListItemText
              primary="Reset theme"
              secondary={
                appearance.isDefaultTheme(theme)
                  ? "No changes made"
                  : "Changes will be reset"
              }
            />

            <ListItemSecondaryAction>
              <Button
                color="secondary"
                disabled={appearance.isDefaultTheme(theme) || performingAction}
                variant="contained"
                onClick={this.handleResetThemeClick}
              >
                Reset
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </DialogContent>
    );
  }

  componentDidMount() {
    this.setState({
      primaryColorLabelWidth: this.primaryColorLabel.current.offsetWidth,
      secondaryColorLabelWidth: this.secondaryColorLabel.current.offsetWidth
    });
  }
}

AppearanceTab.propTypes = {
  // Properties
  theme: PropTypes.object.isRequired,

  // Functions
  openSnackbar: PropTypes.func.isRequired
};

export default AppearanceTab;
