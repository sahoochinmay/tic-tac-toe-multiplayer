import React, { useState, useEffect } from "react";
import {
  Card,
  Snackbar,
  CardContent,
  Container,
  Button,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import useSound from "use-sound";
import "./App.scss";
// components
import Icon from "./components/Icon";
import bgSong from "./audios/bgSong.mp3";
import click from './audios/click.mp3'

const itemArray = new Array(9).fill("empty");

const App = () => {
  const [snackbar, set_snackbar] = useState(false);
  const [snackData, set_snackData] = useState({
    messsage: "",
    severity: "success",
  });
  const [isCross, setIsCross] = useState(false);
  const [win, set_win] = useState(false);
  const [topMsg, set_topMsg] = useState("");
  const [bgPlay] = useSound(bgSong, {
    volume: 0.1,
  });
  const [clickPlay] = useSound(click,{
    volume: 0.5
  })
  useEffect(() => {
    bgPlay();
  }, []);
  const handleSnackClose = () => {
    set_snackbar(false);
  };
  const reloadGame = () => {
    setIsCross(false);
    set_win(false);
    itemArray.fill("empty", 0, 9);
  };

  const checkIsWinner = () => {
    //  checking  winner of the game
    if (
      itemArray[0] === itemArray[1] &&
      itemArray[0] === itemArray[2] &&
      itemArray[0] !== "empty"
    ) {
      set_topMsg(`${itemArray[0]} won`);
      set_win(true);
    } else if (
      itemArray[3] !== "empty" &&
      itemArray[3] === itemArray[4] &&
      itemArray[4] === itemArray[5]
    ) {
      set_topMsg(`${itemArray[3]} won`);
      set_win(true);
    } else if (
      itemArray[6] !== "empty" &&
      itemArray[6] === itemArray[7] &&
      itemArray[7] === itemArray[8]
    ) {
      set_topMsg(`${itemArray[6]} won`);
      set_win(true);
    } else if (
      itemArray[0] !== "empty" &&
      itemArray[0] === itemArray[3] &&
      itemArray[3] === itemArray[6]
    ) {
      set_topMsg(`${itemArray[0]} won`);
      set_win(true);
    } else if (
      itemArray[1] !== "empty" &&
      itemArray[1] === itemArray[4] &&
      itemArray[4] === itemArray[7]
    ) {
      set_topMsg(`${itemArray[1]} won`);
      set_win(true);
    } else if (
      itemArray[2] !== "empty" &&
      itemArray[2] === itemArray[5] &&
      itemArray[5] === itemArray[8]
    ) {
      set_topMsg(`${itemArray[2]} won`);
      set_win(true);
    } else if (
      itemArray[0] !== "empty" &&
      itemArray[0] === itemArray[4] &&
      itemArray[4] === itemArray[8]
    ) {
      set_topMsg(`${itemArray[0]} won`);
      set_win(true);
    } else if (
      itemArray[2] !== "empty" &&
      itemArray[2] === itemArray[4] &&
      itemArray[4] === itemArray[6]
    ) {
      set_topMsg(`${itemArray[2]} won`);
      set_win(true);
    } else if (
      itemArray.every((val) => {
        return val !== "empty";
      })
    ) {
      set_topMsg(`Match Draw`);
      set_win(true);
    }
  };

  const changeItem = (itemNumber) => {
    clickPlay()
    if (win) {
      set_snackData({
        messsage: "Match Finished . Please reloade ...",
        severity: "info",
      });
      return set_snackbar(true);
    }
    if (itemArray[itemNumber] === "empty") {
      itemArray[itemNumber] = isCross ? "cross" : "circle";
      setIsCross(!isCross);
    } else {
      set_snackData({
        messsage: "Already Filled",
        severity: "error",
      });
      return set_snackbar(true);
    }
    checkIsWinner();
  };
  return (
    <Container className="main">
      <h1>Tic-Tac-Toe</h1>
      <div>
        {win ? (
          <h4 className="text-success text-uppercase text-center">{topMsg}</h4>
        ) : (
          <h4 className="text-center text-warning">
            {isCross ? "Cross" : "Circle"} turn
          </h4>
        )}
        <div className="grid">
          {itemArray.map((item, index) => (
            <Card className="box" onClick={() => changeItem(index)}>
              <CardContent>
                <Icon name={item} />
              </CardContent>
            </Card>
          ))} 
        </div>
        <div className="bottom_div">
          {win ? (
            <Button
              className="reaload_button"
              variant="contained"
              color="warning"
              onClick={reloadGame}
            >
              Reload the game
            </Button>
          ) : null}
          <Snackbar
            open={snackbar}
            autoHideDuration={6000}
            onClose={handleSnackClose}
          >
            <Alert onClose={handleSnackClose} severity={snackData.severity}>
              {snackData.messsage}
            </Alert>
          </Snackbar>
        </div>
      </div>
    </Container>
  );
};

export default App;
