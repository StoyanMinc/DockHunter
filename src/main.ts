import { COLORS } from './constants';
import gameManager from './gameManager';
import k from './kaplayCtx';
import { formatScore } from './utils';

k.loadFont('nes', './fonts/nintendo-nes-font.ttf');

k.loadSprite('menu', './graphics/menu.png');
k.loadSprite('background', './graphics/background.png');
k.loadSprite('cursor', './graphics/cursor.png');
k.loadSprite('text-box', './graphics/text-box.png');

k.loadSound('gun-shot', './sounds/gun-shot.wav');
k.loadSound('ui-appear', './sounds/ui-appear.wav');

k.scene('main-menu', () => {
    k.add([k.sprite('menu')]);
    k.add([k.text('CLICK TO START', { font: 'nes', size: 8 }),
    k.anchor('center'),
    k.pos(k.center().x, k.center().y + 40)]);
    k.add([k.text('LEGENDARY GAME', { font: 'nes', size: 8 }),
    k.z(2),
    k.pos(10, 215),
    k.color(COLORS.BLUE),
    k.opacity(0.5)
    ]);
    let bestScore: number = k.getData('best-score') || 12 // getData() get data from locale storage
    if (!bestScore) {
        bestScore = 0;
        k.setData('best-score', 0);
    }
    k.add([k.text(`TOP SCORE = ${formatScore(bestScore, 6)}`, { font: 'nes', size: 6 }),
    k.pos(69, 166),
    k.color(COLORS.RED),
    k.opacity(0.8)
    ]);
    k.onClick(() => {
        k.go('game-on')
    })
});

k.scene('game-on', () => {
    k.add([k.rect(k.width(), k.height()), k.color(COLORS.BLUE), 'sky']);
    k.add([k.sprite('background'), k.pos(0, -10), k.z(2)]);
    const score = k.add([
        k.text(formatScore(0, 6), { font: 'nes', size: 8 }),
        k.pos(192, 197),
        k.z(2)
    ]);
    document.querySelector('canvas')!.style.cursor = 'none';
    const roundCount = k.add([
        k.text('1', { font: 'nes', size: 7 }),
        k.color(COLORS.RED),
        k.pos(42, 182),
        k.z(2)
    ]);
    let duckIcons = k.add([k.pos(95, 198)]);
    let duckInconsPosX = 1;
    for (let i = 0; i < 10; i++) {
        duckIcons.add([k.rect(7, 8), k.pos(duckInconsPosX, 0), `duckIcon-${i}`]);
        duckInconsPosX += 8
    };
    const bulletHideElement = k.add([
        k.rect(0, 8),
        k.pos(25, 198),
        k.color(COLORS.BLACK),
        k.z(2)
    ]);

    const roundStartController = gameManager.onStateEnter(
        'round-start',
        async (isFirstRound: boolean) => {
            if (!isFirstRound) { gameManager.gameSpeed += 50 }
            k.play('ui-appear', { volume: 1 });
            gameManager.currentRound++;
            roundCount.text = gameManager.currentRound.toString();

            const textBox = k.add([
                k.sprite('text-box'),
                k.anchor('center'),
                k.pos(k.center().x, k.center().y - 50),
                k.z(3)
            ]);
            textBox.add([
                k.text('ROUND', { font: 'nes', size: 8 }),
                k.anchor('center'),
                k.pos(0, -7)
            ]);
            textBox.add([
                k.text(gameManager.currentRound.toString(), { font: 'nes', size: 8 }),
                k.anchor('center'),
                k.pos(0, 5)
            ]);
            await k.wait(1);
            k.destroy(textBox);
            gameManager.enterState('hunt-start');
        });

    const cursor = k.add([
        k.sprite('cursor'),
        k.pos(),
        k.anchor('center'),
        k.z(3)
    ]);

    k.onUpdate(() => {
        score.text = formatScore(gameManager.currentScore, 6);

        if (gameManager.bulletsLeft === 3) {
            bulletHideElement.width = 0
        } else if (gameManager.bulletsLeft === 2) {
            bulletHideElement.width = 8
        } else if (gameManager.bulletsLeft === 1) {
            bulletHideElement.width = 16
        } else {
            bulletHideElement.width = 24
        }
        cursor.moveTo(k.mousePos());
    });

    k.onClick(() => {
        if (gameManager.state === 'hunt-start' && gameManager.bulletsLeft > 0) {
            k.play('gun-shot', { volume: 0.5 });
        }
        gameManager.bulletsLeft--;
    })

});

k.scene('game-over', () => {
    k.setCursor('none');
    k
});

k.go('main-menu');