import React, { Component } from "react";
import axios from "axios";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import { getCharacterInfoUrl } from "../../../constants/apiUrls";

const styles = createStyles(() => ({
  section: {
    padding: "40px",
    height: "calc(100vh - 64px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  heroImg: {
    width: "100%",
    height: "100%",
  },
  paper: {
    height: "80%",
    width: "90%",
    margin: "auto",
    display: "flex",
    justifyContent: "flex-start",
  },
  nameDesciption: {
    alignSelf: "flex-start",
    padding: "60px !important",
  },
}));

class CharacterInfo extends Component {
  state = {
    haveResult: false,
    image: null,
    name: null,
    description: null,
  };

  fetch = async (id) => {
    try {
      const res = await axios.get(getCharacterInfoUrl(id));
      if (res.status === 200) {
        this.setState({ haveResult: true });
        if (res.data.data.results[0].thumbnail) {
          const thumbnail = res.data.data.results[0].thumbnail;
          if (thumbnail.path && thumbnail.extension) {
            const path = thumbnail.path;
            const extension = thumbnail.extension;
            this.setState({ image: `${path}.${extension}` });
          }
        }
      } else {
        console.log("Fetch failed.");
      }
    } catch (err) {
      console.log(err);
      this.setState({ haveResult: false });
    }
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.fetch(id);
  }

  componentDidUpdate(prevProps) {
    const prevId = prevProps.match.params.id;
    const { id } = this.props.match.params;
    if (prevId !== id) this.fetch(id);
  }

  render() {
    const { classes } = this.props;

    return (
      <section className={classes.section}>
        {this.state.haveResult ? (
          <Paper className={classes.paper}>
            <Grid
              container
              spacing={3}
              justify="space-evenly"
              alignItems="center"
            >
              <Grid item xs={6}>
                <img src={this.state.image} className={classes.heroImg} />
              </Grid>
              <Grid item xs={6} className={classes.nameDesciption}>
                <h2>Name</h2>
                <span>Description</span>
              </Grid>
            </Grid>
          </Paper>
        ) : (
          "Hero ID is invalid."
        )}
      </section>
    );
  }
}

export default withStyles(styles)(CharacterInfo);
