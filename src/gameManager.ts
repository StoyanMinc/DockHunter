import type { GameObj } from "kaplay";
import k from "./kaplayCtx";

function makeGameManager() {
    return k.add([
        k.state('menu', [
            'menu',
            'cutscene',
            'round-start',
            'round-end',
            'hunt-start',
            'hunt-end',
            'duck-shooted',
            'duck-missed',
        ]),
        {
            isGamePaused: false,
            currentScore: 0,
            currentRound: 0,
            currentHund: 0,
            bulletsLeft: 3,
            ducksShotInRound: 0,
            gameSpeed: 100,
            resetGame(this: GameObj) {
                this.currentScore = 0;
                this.currentRound = 0;
                this.currentHund = 0;
                this.bulletsLeft = 3;
                this.ducksShotInRound = 0;
                this.gameSpeed = 100;
            }
        }
    ]);
};

const gameManager = makeGameManager();
export default gameManager