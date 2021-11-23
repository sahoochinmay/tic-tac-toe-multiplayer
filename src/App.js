import React, { useState, useEffect } from "react";
import {
  Card,
  Snackbar,
  CardContent,
  Container,
  Button,
  Modal,
  Fade,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import useSound from "use-sound";
import "./App.scss";
// components
import Icon from "./components/Icon";
import bgSong from "./audios/bgSong.mp3";
import click from "./audios/click.mp3";
import winner from "./audios/winner.mp3";
import draw from "./audios/draw.mp3";

const itemArray = new Array(9).fill("empty");

const App = () => {
  const [playerModal, setPlayerModal] = useState(true);
  const [player1, set_player1] = useState("");
  const [player2, set_player2] = useState("");
  const [p1Point, set_p1Point] = useState(0);
  const [p2Point, set_p2Point] = useState(0);
  const [snackbar, set_snackbar] = useState(false);
  const [snackData, set_snackData] = useState({
    messsage: "",
    severity: "success",
  });
  const [isCross, setIsCross] = useState(false);
  const [win, set_win] = useState(false);
  const [crossIndexes, set_crossIndexes] = useState([]);
  const [crossAngle, set_crossAngle] = useState("");
  const [topMsg, set_topMsg] = useState("");
  const [bgPlay] = useSound(bgSong, {
    volume: 0.1,
  });
  const [clickPlay] = useSound(click, {
    volume: 1,
  });
  const [winnerPlay] = useSound(winner, {
    volume: 1,
  });
  const [drawPlay] = useSound(draw, {
    volume: 1,
  });
  useEffect(() => {
    bgPlay();
  }, []);
  
  const handleStart = () => {
    if (player1 !== "" && player2 !== "") {
      return setPlayerModal(false);
    } else {
      console.log("start");
      set_snackData({
        messsage: "Please fill all the fields.",
        severity: "info",
      });
      return set_snackbar(true);
    }
  };
  const handleSnackClose = () => {
    set_snackbar(false);
  };
  const reloadGame = () => {
    setIsCross(false);
    set_win(false);
    itemArray.fill("empty", 0, 9);
    set_crossIndexes([]);
    set_crossAngle("");
  };

  const checkIsWinner = () => {
    //  checking  winner of the game
    if (
      itemArray[0] === itemArray[1] &&
      itemArray[0] === itemArray[2] &&
      itemArray[0] !== "empty"
    ) {
      showWinner(itemArray[0]);
      set_crossIndexes([0, 1, 2]);
    } else if (
      itemArray[3] !== "empty" &&
      itemArray[3] === itemArray[4] &&
      itemArray[4] === itemArray[5]
    ) {
      showWinner(itemArray[3]);
      set_crossIndexes([3, 4, 5]);
    } else if (
      itemArray[6] !== "empty" &&
      itemArray[6] === itemArray[7] &&
      itemArray[7] === itemArray[8]
    ) {
      showWinner(itemArray[6]);
      set_crossIndexes([6, 7, 8]);
    } else if (
      itemArray[0] !== "empty" &&
      itemArray[0] === itemArray[3] &&
      itemArray[3] === itemArray[6]
    ) {
      showWinner(itemArray[0]);
      set_crossIndexes([0, 3, 6]);
    } else if (
      itemArray[1] !== "empty" &&
      itemArray[1] === itemArray[4] &&
      itemArray[4] === itemArray[7]
    ) {
      showWinner(itemArray[1]);
      set_crossIndexes([1, 4, 7]);
    } else if (
      itemArray[2] !== "empty" &&
      itemArray[2] === itemArray[5] &&
      itemArray[5] === itemArray[8]
    ) {
      showWinner(itemArray[2]);
      set_crossIndexes([2, 5, 8]);
    } else if (
      itemArray[0] !== "empty" &&
      itemArray[0] === itemArray[4] &&
      itemArray[4] === itemArray[8]
    ) {
      showWinner(itemArray[0]);
      set_crossIndexes([0, 4, 8]);
    } else if (
      itemArray[2] !== "empty" &&
      itemArray[2] === itemArray[4] &&
      itemArray[4] === itemArray[6]
    ) {
      showWinner(itemArray[2]);
      set_crossIndexes([2, 4, 6]);
    } else if (
      itemArray.every((val) => {
        return val !== "empty";
      })
    ) {
      set_topMsg(`Match Tie`);
      set_win(true);
      drawPlay();
    }
  };

  const changeItem = (itemNumber) => {
    clickPlay();
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
  const showWinner = (val) => {
    winnerPlay();
    set_topMsg(`${val === "circle" ? player1 : player2} won`);
    set_win(true);
    val === "circle" ? set_p1Point(p1Point + 1) : set_p2Point(p2Point + 1);
  };
  useEffect(() => {
    let dif = crossIndexes[1] - crossIndexes[0];
    switch (dif) {
      case 1:
        set_crossAngle("horizontal");
        break;
      case 2:
        set_crossAngle("down_left");
        break;
      case 3:
        set_crossAngle("vertical");
        break;
      case 4:
        set_crossAngle("down_right");
        break;
    }
  }, [crossIndexes]);
  return (
    <Container className="main">
      <h1>Tic-Tac-Toe</h1>
      {/* MODAL: Player name input modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="modal"
        open={playerModal}
        disableEnforceFocus
      >
        <Fade in={playerModal}>
          <div className="modal_body">
            <lable>Player 1&nbsp;&nbsp;</lable>
            <input
              className="input_box"
              value={player1}
              onChange={(e) => set_player1(e.target.value)}
              type="text"
            />
            <br />
            <br />
            <lable>Player 1&nbsp;&nbsp;</lable>
            <input
              className="input_box"
              value={player2}
              onChange={(e) => set_player2(e.target.value)}
              type="text"
            />
            <Button
              className="button"
              variant="contained"
              onClick={handleStart}
            >
              Start
            </Button>
          </div>
        </Fade>
      </Modal>

      <div>
        {win ? (
          <h4 className="win_msg">{topMsg}</h4>
        ) : (
          <>
            {playerModal ? null : (
              <h4 className="text-center text-warning">
                {isCross ? player2 : player1}'s turn
              </h4>
            )}
          </>
        )}
        <div className="grid">
          {itemArray.map((item, index) => (
            <Card className="box" onClick={() => changeItem(index)}>
              <CardContent>
                <div
                  className={`${
                    crossIndexes.includes(index) ? "cross" : null
                  } ${crossAngle}`}
                ></div>
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
      <div className="result_div">
        <section className="player1">
          <span>{p1Point}</span>
          {player1}
        </section>
        <section dir="rtl" className="player2">
          {player2}
          <span>{p2Point}</span>
        </section>
      </div>
    </Container>
  );
};

export default App;
