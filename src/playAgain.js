export default {
  name: "playAgain",
  template: `
    <button class="play-again" @click="nextGame()">
      Play Again
    </button>
  `,
  methods: {
    nextGame() {
      this.$emit("newGame");
    },
  },
};
