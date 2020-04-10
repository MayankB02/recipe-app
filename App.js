import React, { useState } from "react";
import { Grid, useMediaQuery } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Recipe from "./components/Cards";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import ToolBar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";
import SearchBar from "./components/SearchField";
import "./styles.css";

require('dotenv').config();
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: "1"
  },
  offset: theme.mixins.toolbar
}));
export default function App() {
  const classes = useStyles();
  const API_Key = "3c3abd24c08748cb94e64115fc30ae21";
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));
  const [recipes, setRecipes] = useState([]);
  const [searchField, setSearchField] = useState("");
  const getRecipes = async () => {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/search?apiKey=${API_Key}&query=${searchField}&number=12&offset=10&instructionsRequired=true`
    );
    const data = await response.json();
    setRecipes(data.results);
  };

  return (
    <div className="App">
      <AppBar position="absolute" style={{ backgroundColor: "purple" }}>
        <ToolBar>
          <Typography
            variant="h5"
            className={classes.root}
            style={
              matches
                ? { textAlign: "center", fontSize: "6.9vh", margin: "4.1%" }
                : { textAlign: "left", marginLeft: "25%" }
            }
          >
            Hey Cooking
          </Typography>
          <Hidden xsDown>
            <SearchBar
              width="40"
              getRecipes={getRecipes}
              searchField={searchField}
              setSearchField={setSearchField}
            />
          </Hidden>
        </ToolBar>
        <Hidden smUp>
          <ToolBar>
            <SearchBar
              width="100"
              getRecipes={getRecipes}
              searchField={searchField}
              setSearchField={setSearchField}
            />
          </ToolBar>
        </Hidden>
      </AppBar>
      <ToolBar disableGutters={false} />
      {matches ? (
        <div>
          <ToolBar />
          <ToolBar />
        </div>
      ) : null}
      <div className={classes.offset}>
        <div className={classes.root}>
          <Grid
            container
            direction={matches ? "column" : "row"}
            alignItems={matches ? "center" : null}
            wrap="wrap"
            spacing={5}
          >
            {recipes.map(recipe => (
              <Grid className={classes.root} item xs={12} sm={6} md={4}>
                <Recipe key={recipe.id} id={recipe.id} API_Key={API_Key} />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
}
