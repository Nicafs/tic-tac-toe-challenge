import Tile from "./tile.js";

export default {
  name: "Board",
  template: `
    <div class="board">
      <template v-for="(item, indexX) in board">
        <Tile v-for="(tile, indexY) in item" :marker="board[indexX][indexY]" @click="turn(indexX, indexY)" />
      </template>
    </div>
  `,
  components: {
    Tile,
  },
  props: ["board", "disable"],
  watch: {
    board: {
      handler: function () {
        const check = (x1, x2, y1, y2, z1, z2) => {
          return (
            this.board[x1][x2] !== "" &&
            this.board[y1][y2] !== "" &&
            this.board[z1][z2] !== "" &&
            this.board[x1][x2] === this.board[y1][y2] &&
            this.board[y1][y2] === this.board[z1][z2]
          );
        };
        const exists = (arr) => {
          return arr.some((row) => row.includes(""));
        };

        const conditionArray = [
          check(0, 0, 0, 1, 0, 2),
          check(1, 0, 1, 1, 1, 2),
          check(2, 0, 2, 1, 2, 2),
          check(0, 0, 1, 0, 2, 0),
          check(0, 1, 1, 1, 2, 1),
          check(0, 2, 1, 2, 2, 2),
          check(0, 0, 1, 1, 2, 2),
          check(0, 2, 1, 1, 2, 0),
        ];

        if (conditionArray.includes(true)) {
          this.$emit("gameEnd", true);
        } else if (!exists(this.board)) {
          this.$emit("gameEnd");
        }
      },
      deep: true,
    },
  },
  methods: {
    turn(x, y) {
      if (this.disable) {
        return;
      }

      this.$emit("turn", { x, y });
    },
  },
};
