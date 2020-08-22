import React, { Component } from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import { getCharacterInfoUrl } from "../../constants/apiUrls";

const styles = createStyles(() => ({
  inputBase: {
    padding: "0px 20px",
    border: "solid 1px",
    borderRadius: 10,
    marginLeft: 20,
  },
}));

class Header extends Component {
  state = {
    searchValue: "",
  };

  handleHomePage = () => {
    const { history } = this.props;
    history.push("/characters");
  };

  handleSearchValue = (e) => {
    e.preventDefault();
    this.setState({ searchValue: e.target.value });
  };

  handleSearch = () => {
    const { history } = this.props;
    history.push(`/characters/${this.state.searchValue}`);
  };

  render() {
    // classes is from withStyles()
    const { classes } = this.props;

    return (
      <AppBar position="static" color="transparent">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            className={classes.title}
            onClick={this.handleHomePage}
          >
            Home
          </Typography>
          <InputBase
            className={classes.inputBase}
            placeholder="Search a hero by ID"
            onChange={this.handleSearchValue}
          />
          <IconButton
            type="submit"
            className={classes.iconButton}
            onClick={this.handleSearch}
          >
            <SearchIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withRouter(withStyles(styles)(Header));
