import kaplay from 'kaplay';

const k = kaplay({
    width: 256,
    height: 224,
    letterbox: true, // scales on big screens
    touchToMouse: true, // for mobile screens
    scale: 4,
    pixelDensity: devicePixelRatio, // for 4k feeling...
    debug: true, // set to false in production
    debugKey: 'f1', // set key for debug
    background: [0, 0, 0], // background of the game page
    global: false // k fns only be called in k constant
});

export default k;