import Score from "./score.js";
import Board from "./board.js";
import Message from "./message.js";
import PlayAgain from "./playAgain.js";

export default {
  name: "game",
  template: `
    <div class="game">
      <Score :player1="player1Wins" :player2="player2Wins" />
      <Board :board="board" @gameEnd="onGameEnd" @turn="onTurn" />
      <Message :text="msgEndGame" />
      <PlayAgain v-if="disable" @newGame="onNewGame" />
    </div>
  `,
  components: {
    Score,
    Board,
    Message,
    PlayAgain,
  },
  data: () => {
    return {
      currentPlayer: 0,
      board: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
      player1Wins: 0,
      player2Wins: 0,
      player1Value: "O",
      player2Value: "X",
      msgEndGame: "",
      disable: false,
    };
  },
  mounted: function () {
    this.currentPlayer = Math.floor(Math.random() * (2 - 1 + 1) + 1);
    this.msgEndGame = `It's player ${this.currentPlayer}'s turn`;
  },
  methods: {
    onTurn({ x, y }) {
      if (this.board[x][y] || this.disable) {
        return;
      }

      if (this.currentPlayer === 1) {
        this.board[x][y] = this.player1Value;
        this.currentPlayer = 2;
        this.msgEndGame = "It's player 2's turn";
      } else {
        this.board[x][y] = this.player2Value;
        this.currentPlayer = 1;
        this.msgEndGame = "It's player 1's turn";
      }
    },
    onGameEnd(hasWinner) {
      if (hasWinner) {
        if (this.currentPlayer === 1) {
          this.player1Wins += 1;
          this.msgEndGame = "Player 1 wins";
        }

        if (this.currentPlayer === 2) {
          this.player2Wins += 1;
          this.msgEndGame = "Player 2 wins";
        }
      } else {
        this.msgEndGame = "It's a draw";
      }

      this.disable = true;
    },
    onNewGame() {
      this.board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ];
      this.disable = false;
      this.currentPlayer = Math.floor(Math.random() * (2 - 1 + 1) + 1);
      this.msgEndGame = `It's player ${this.currentPlayer}'s turn`;
    },
  },
};
