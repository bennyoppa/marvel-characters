import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import useFetchApi from "../../../utils/useFetchApi";
import { getCharactersUrl } from "../../../constants/apiUrls";

import "./Characters.css";

const useStyles = makeStyles((theme) => {
  return {
    section: {
      padding: "40px",
      height: "calc(100vh - 64px)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    cardGroup: {
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      height: "100%",
    },
    card: {
      margin: "1vw 0",
      flexBasis: "18%",
      [theme.breakpoints.down("lg")]: { flexBasis: "24%" },
      [theme.breakpoints.down("md")]: { flexBasis: "47%" },
      [theme.breakpoints.down("sm")]: { flexBasis: "95%" },
    },
    media: { width: "100%", height: 200, margin: "auto" },
    cardContent: { textAlign: "center" },
  };
});

export default function Characters(props) {
  const classes = useStyles();
  const { history } = props;

  const [loading, characters, err] = useFetchApi(getCharactersUrl(), "get");

  const handleEnterCharacterInfo = (id) => {
    history.push(`/characters/${id}`);
  };

  if (err.isError) return err.errMessage;

  return (
    <section className={classes.section}>
      {!loading ? (
        <div className={classes.cardGroup}>
          {characters.map((item) => (
            <Card key={item.id} className={classes.card}>
              <CardActionArea
                onClick={(e) => {
                  e.preventDefault();
                  handleEnterCharacterInfo(item.id);
                }}
              >
                <CardMedia
                  className={classes.media}
                  image={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                  title="Contemplative Reptile"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {item.name} {item.id}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {item.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              {/* <CardActions>
                <Button size="small" color="primary">
                  Share
                </Button>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </CardActions> */}
            </Card>
          ))}
        </div>
      ) : (
        <CircularProgress color="secondary" size={150} />
      )}
    </section>
  );
}
