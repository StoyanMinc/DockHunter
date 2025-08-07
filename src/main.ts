import { COLORS } from './constants';
import k from './kaplayCtx';
import { formatScore } from './utils';

k.loadSprite('menu', './graphics/menu.png');
k.loadFont('nes', './fonts/nintendo-nes-font.ttf');

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

});

k.scene('game-over', () => {
    k.setCursor('none');
    k
});

k.go('main-menu');