//Commentare la riga qua sotto dopo aver verificato che ci sia l' alert e che quindi sia tutto collegato
//alert("Test di collegamento")

//----VARIABILI----
var maxXBomb = 1100;
var maxYBomb = 100;
var count_life = 0;
var count_life2 = 0;
var score = 0;
var scoreText;
var increaseStar = 3000;
var increaseLife = 10;
var decraseWire = 1;
var decraseBomb = 100;
var lifeTot = 3;
var lifeTotText;
var level = 1;
var levelText;
var initialTime;
var timerText;
var timerEvent;
var startX = 0;
var startY = 550;
let life

//----FUNZIONE PLAY----
const play = () => {
    var name = document.querySelector("#name").value;
    let message = name + " Score: " + score;
    alert("Benvenuta/o " + name + "!\n\nREGOLE DEL GIOCO:\n----------------COMANDI----------------\nLEFT ARROW <-- (Lo sprite va a SX)\nRIGHT ARROW --> (Lo sprite va a DX)\nDOWN ARROW (Lo sprite si ferma)\nSPACE (Lo sprite salta)\n----------------OBBIETTIVO----------------\nRaggiungere per 3 volte la stella raccogliendo più cuoricini possibili ed evitando le bombe e il filo spinato, raccogli l'intera serie di cuori per ricevere un bonus! Raccogliendo la pozione potrai ristabilire il numero iniziale delle tue vite, fanne buon uso, ne hai solo 1 a disposizione!\n----------------ATTENZIONE----------------\nÈ sconsigliato saltare sul posto da fermi (fatta eccezzione sulla molla) in quanto si rischia di cadere attraverso la piattaforma, si consiglia quindi di impostare sempre una direzione di corsa (SX o DX) quando si salta!\n----------------MADE BY----------------\nMattia Bracco (3C INFO)\n\nQuando sei pronta/o premi 'OK' per giocare...");
    window.open('./game.html');
}

//---------------------------------------------------------------------
//------------------PHASER 3-------------------------------------------
//---------------------------------------------------------------------

//---------------------------------------------------------------------
//----CONFIG-----------------------------------------------------------
//---------------------------------------------------------------------
let config = {
    type: Phaser.AUTO,
    width: 1250,
    height: 800,
    backgroundColor: 0xff0000,
    parent: "game", //ID del div creato nel body!
    //pixelArt: true,
    //fisica
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 300 },
            debug: true,
        },
    },
    //ciclo di vita di phaser
    scene: {
        preload: mioPreload, //si caricano le immagini che verranno usate
        create: mioCreate, //gestisco collisioni, tastiera...
        update: mioUpdate, //update contiene un loop infinito
    },
}

//---------------------------------------------------------------------
//----START GAME-------------------------------------------------------
//---------------------------------------------------------------------
let gioco = new Phaser.Game(config)

//---------------------------------------------------------------------
//----FUNCTION PRELOAD-------------------------------------------------
//---------------------------------------------------------------------
function mioPreload() {
    //BACKGROUND - FLOOR
    this.load.image("background", "./assets/background.png");
    this.load.image("floor", "./assets/floor.png");
    //PLATFORMS
    this.load.image("platform", "./assets/platform.png");
    this.load.image("platformShort", "./assets/platform_short.png");
    this.load.image("platformMedium", "./assets/platform_medium.png");
    //SPRITE ZOMBIE
    this.load.image("spriteZombie", "./assets/Zombie1/animation/Walk1.png");
    //TUBE
    this.load.image("tube", "./assets/tube.png");
    this.load.image("tubeExit", "./assets/tubeExit.png");
    //WALL - BARBED WIRE
    this.load.image("wall", "./assets/wall.png");
    this.load.image("wire", "./assets/wire.png");
    //OBJECTS
    this.load.image("spring", "./assets/spring.png");
    this.load.image("star", "./assets/star.png");
    this.load.image("life", "./assets/life.png");
    this.load.image("bomb", "./assets/bomb.png");
    this.load.image("potion", "./assets/potion.png");
    //IMG RUN DX Animation
    this.load.image("run4_DX", "./assets/Zombie1/animation/Run4_DX.png");
    this.load.image("run5_DX", "./assets/Zombie1/animation/Run5_DX.png");
    this.load.image("run6_DX", "./assets/Zombie1/animation/Run6_DX.png");
    this.load.image("run7_DX", "./assets/Zombie1/animation/Run7_DX.png");
    this.load.image("run8_DX", "./assets/Zombie1/animation/Run8_DX.png");
    this.load.image("run9_DX", "./assets/Zombie1/animation/Run9_DX.png");
    this.load.image("run10_DX", "./assets/Zombie1/animation/Run10_DX.png");
    //IMG RUN SX Animation
    this.load.image("run4_SX", "./assets/Zombie1/animation/Run4_SX.png");
    this.load.image("run5_SX", "./assets/Zombie1/animation/Run5_SX.png");
    this.load.image("run6_SX", "./assets/Zombie1/animation/Run6_SX.png");
    this.load.image("run7_SX", "./assets/Zombie1/animation/Run7_SX.png");
    this.load.image("run8_SX", "./assets/Zombie1/animation/Run8_SX.png");
    this.load.image("run9_SX", "./assets/Zombie1/animation/Run9_SX.png");
    this.load.image("run10_SX", "./assets/Zombie1/animation/Run10_SX.png");
    //IMG JUMP Animation
    this.load.image("jump1", "./assets/Zombie1/animation/Jump1.png");
    this.load.image("jump2", "./assets/Zombie1/animation/Jump2.png");
    this.load.image("jump3", "./assets/Zombie1/animation/Jump3.png");
    this.load.image("jump4", "./assets/Zombie1/animation/Jump4.png");
    this.load.image("jump5", "./assets/Zombie1/animation/Jump5.png");
    this.load.image("jump6", "./assets/Zombie1/animation/Jump6.png");
    this.load.image("jump7", "./assets/Zombie1/animation/Jump7.png");
    //IMG STOP Animation
    this.load.image("stop1", "./assets/Zombie1/animation/Walk1.png");
    this.load.image("stop2", "./assets/Zombie1/animation/Walk1.png");
    this.load.image("stop3", "./assets/Zombie1/animation/Walk1.png");
    //IMG DIED Animation
    this.load.image("dead1", "./assets/Zombie1/animation/Dead1.png");
    this.load.image("dead2", "./assets/Zombie1/animation/Dead2.png");
    this.load.image("dead3", "./assets/Zombie1/animation/Dead3.png");
    this.load.image("dead4", "./assets/Zombie1/animation/Dead4.png");
    this.load.image("dead5", "./assets/Zombie1/animation/Dead5.png");
    this.load.image("dead6", "./assets/Zombie1/animation/Dead6.png");
    this.load.image("dead7", "./assets/Zombie1/animation/Dead7.png");
    this.load.image("dead8", "./assets/Zombie1/animation/Dead8.png");
    //IMG HURT Animation
    this.load.image("hurt1", "./assets/Zombie1/animation/Hurt1.png");
    this.load.image("hurt2", "./assets/Zombie1/animation/Hurt2.png");
    this.load.image("hurt3", "./assets/Zombie1/animation/Hurt3.png");
    this.load.image("hurt4", "./assets/Zombie1/animation/Hurt4.png");
    this.load.image("hurt5", "./assets/Zombie1/animation/Hurt5.png");
    //AUDIO
    this.load.audio("game_over", "./assets/game_over.mp3");
    this.load.audio("move", "./assets/move.mp3");
    this.load.audio("collect", "./assets/collect.mp3");
    this.load.audio("level_up", "./assets/level_up.mp3");
    this.load.audio("hit", "./assets/hit.mp3");
    this.load.audio("bonus", "./assets/bonus.mp3");
    this.load.audio("potion", "./assets/potion.mp3");
    this.load.audio("tube", "./assets/tube.mp3")
    this.load.audio("soundtrack", "./assets/soundtrack.mp3");
}

//---------------------------------------------------------------------
//----FUNCTION CREATE--------------------------------------------------
//---------------------------------------------------------------------
function mioCreate() {
    //background
    this.add.image(620, 365, "background").setScale(2);
    //floor
    this.floor = this.physics.add.staticGroup({
        key: "floor",
        repeat: 2,
        setXY: { x: 290, y: 770, stepX: 400 },
        setScale: { x: 1, y: 1 },
    });
    //sprite zombie
    this.spriteZombie = this.physics.add.sprite(startX, startY, 'spriteZombie').setScale(0.3).setCollideWorldBounds(true);
    //tube
    this.tubeExit = this.add.image(1200, 50, "tubeExit").setScale(0.3);
    this.tube = this.physics.add.staticGroup({
        key: "tube",
        repeat: 0,
        setXY: { x: 1040, y: 38, stepY: 120 },
        setScale: { x: 1, y: 1 },
    })
    //wall
    this.wall = this.physics.add.staticGroup({
        key: "wall",
        repeat: 2,
        setXY: { x: 1120, y: 190, stepY: 200 },
        setScale: { x: 1, y: 1 },
    })

    //life
    life = this.physics.add.group({
        key: "life",
        repeat: 20,
        setXY: { x: 25, y: 100, stepX: 50 },
        setScale: { x: 2, y: 2 },
    })
    life2 = this.physics.add.group({
        key: "life",
        repeat: 15,
        setXY: { x: 200, y: 400, stepX: 50 },
        setScale: { x: 2, y: 2 },
    })
    //star
    this.star = this.physics.add.sprite(1200, 400, "star").setScale(0.2);
    //potion
    this.potion = this.physics.add.sprite(1050, 400, "potion").setScale(0.1);
    
    //bomb
    this.bomb = this.physics.add.group({
        key: "bomb",
        repeat: 2,
        setXY: { x: 300, y: 0, stepX: 200 },
        setScale: { x: 1, y: 1 },
    });
    //barbed wire
    this.wire = this.physics.add.staticGroup({
        key: "wire",
        repeat: 1,
        setXY: { x: 100, y: 5, stepX: 600 },
        setScale: { x: 1, y: 1 },
    })

    //PIATTAFORME BASSE
    this.platformLow1 = this.physics.add.staticGroup({
        key: "platformShort",
        repeat: 0,
        setXY: { x: 670, y: 690, stepX: 500 },
        setScale: { x: 1, y: 1 },
    })
    this.spring = this.physics.add.staticGroup({
        key: "spring",
        repeat: 0,
        setXY: { x: 670, y: 640, stepX: 500 },
        setScale: { x: 1, y: 1 },
    })
    //PIATTAFORME CENTRALI
    this.platformCenter = this.physics.add.staticGroup({
        key: "platformMedium",
        repeat: 1,
        setXY: { x: 390, y: 570, stepX: 550 },
        setScale: { x: 1, y: 1 },
    })
    this.platformCenter2 = this.physics.add.staticGroup({
        key: "platformShort",
        repeat: 0,
        setXY: { x: 1035, y: 500, stepX: 300 },
        setScale: { x: 1, y: 1 },
    })
    this.platformCenterScale = this.physics.add.staticGroup({
        key: "platformShort",
        repeat: 1,
        setXY: { x: 250, y: 480, stepX: -120, stepY: -80 },
        setScale: { x: 1, y: 1 },
    })
    //PIATTAFORME ALTE
    this.platfromHigh = this.physics.add.staticGroup({
        key: "platformMedium",
        repeat: 1,
        setXY: { x: 945, y: 240, stepX: -400 },
        setScale: { x: 1, y: 1 },
    })
    this.platfromHighScale = this.physics.add.staticGroup({
        key: "platformShort",
        repeat: 1,
        setXY: { x: 345, y: 280, stepX: -320, stepY: 50 },
        setScale: { x: 1, y: 1 },
    })
    
    //----TEXT----
    scoreText = this.add.text(16, 760, 'Score: 0', { fontSize: '32px', fill: 'white', backgroundColor: 'black' });
    lifeTotText = this.add.text(316, 760, 'Life: 3', { fontSize: '32px', fill: 'white', backgroundColor: 'black' });
    levelText = this.add.text(616, 760, 'Level: 1', { fontSize: '32px', fill: 'white', backgroundColor: 'black' });
    timerText = this.add.text(850, 760, 'Time: NO', { fontSize: '32px', fill: 'white', backgroundColor: 'black' });
    timerEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, loop: true });
    
    //----BUTTON----
    this.mioTasto = this.input.keyboard.createCursorKeys(); //memorizza il tasto premuto nella variabile "mioTasto", posso controllare solo UP ARROW, DOWN ARROW, LEFT ARROW, RIGHT ARROW, TAB e SPACE. 

    //----SOUND----
    this.sound.add('game_over');
    this.sound.add('move');
    this.sound.add('collect');
    this.sound.add('level_up');
    this.sound.add('hit');
    this.sound.add('bonus');
    this.sound.add('potion');
    this.sound.add('tube');
    this.sound.add('soundtrack');
    this.sound.play('soundtrack');

    //----COLLISIONI GRAVITÀ----
    //collisione zombie/star/life/life2/potion - floor
    this.physics.add.collider(this.floor, [this.spriteZombie, this.star, life, life2, this.potion]);
    //collisione zombie/life/life2/potion - muro/platform
    this.physics.add.collider([this.wall, this.platformLow1, this.platformCenter, this.platformCenter2, this.platformCenterScale, this.platfromHigh, this.platfromHighScale], [this.spriteZombie, life, life2, this.potion]);
    //collsione bomb - floor/wall/platform
    this.physics.add.collider([this.floor, this.wall, this.platformLow1, this.platformCenter, this.platformCenter2, this.platformCenterScale, this.platfromHigh, this.platfromHighScale], this.bomb, bombBunce);

    //----COLLISIONI GIOCO----
    //collisione zombie - star
    this.physics.add.overlap(this.spriteZombie, this.star, collectStar, null, this);
    //collsione zombie - life
    this.physics.add.overlap(this.spriteZombie, life, collectLife, null, this);
    //collsione zombie - life2
    this.physics.add.overlap(this.spriteZombie, life2, collectLife2, null, this);
    //collisione zombie - potion
    this.physics.add.overlap(this.spriteZombie, this.potion, collectPotion, null, this);
    //collsione zombie - bomb
    this.physics.add.collider(this.spriteZombie, this.bomb, hitBomb, null, this);
    //collisione zombie - tubo
    this.physics.add.overlap(this.spriteZombie, this.tube, tube, null, this);
    //collisione zombie - spring
    this.physics.add.overlap(this.spring, this.spriteZombie, jump, null, this);
    //collsione zombie - barbed wire
    this.physics.add.overlap(this.spriteZombie, this.wire, wire, null, this);

    //----ANIMAZIONI----
    this.anims.create({
        key: 'runDX',
        frames: [
            { key: 'run4_DX' },
            { key: 'run5_DX' },
            { key: 'run6_DX' },
            { key: 'run7_DX' },
            { key: 'run8_DX' },
            { key: 'run9_DX' },
            { key: 'run10_DX', duration: 50 }
        ],
        frameRate: 8,
        repeat: -1
    });
    this.anims.create({
        key: 'runSX',
        frames: [
            { key: 'run4_SX' },
            { key: 'run5_SX' },
            { key: 'run6_SX' },
            { key: 'run7_SX' },
            { key: 'run8_SX' },
            { key: 'run9_SX' },
            { key: 'run10_SX', duration: 50 }
        ],
        frameRate: 8,
        repeat: -1
    });
    this.anims.create({
        key: 'jump',
        frames: [
            { key: 'jump1' },
            { key: 'jump2' },
            { key: 'jump3' },
            { key: 'jump4' },
            { key: 'jump5' },
            { key: 'jump6' },
            { key: 'jump7', duration: 60 }
        ],
        frameRate: 8,
        repeat: -1
    });
    this.anims.create({
        key: 'stop',
        frames: [
            { key: 'stop1' },
            { key: 'stop2' },
            { key: 'stop3', duration: 50 }
        ],
        frameRate: 8,
        repeat: -1
    });
    this.anims.create({
        key: 'dead',
        frames: [
            { key: 'dead1' },
            { key: 'dead2' },
            { key: 'dead3' },
            { key: 'dead4' },
            { key: 'dead5' },
            { key: 'dead7' },
            { key: 'dead7' },
            { key: 'dead8', duration: 50 }
        ],
        frameRate: 8,
    });
    this.anims.create({
        key: 'hurt',
        frames: [
            { key: 'hurt1' },
            { key: 'hurt2' },
            { key: 'hurt3' },
            { key: 'hurt4' },
            { key: 'hurt5', duration: 50 }
        ],
        frameRate: 8,
        repeat: -1
    });
}

//---------------------------------------------------------------------
//----FUNCTION UPDATE--------------------------------------------------
//---------------------------------------------------------------------
function mioUpdate() {
    //RIGHT ARROW
    if (this.mioTasto.right.isDown) {
        this.spriteZombie.setVelocityX(200).play('runDX');
    }
    //LEFT ARROW
    if (this.mioTasto.left.isDown) {
        this.spriteZombie.setVelocityX(-200).play('runSX');
    }
    //DOWN ARROW
    if (this.mioTasto.down.isDown) {
        this.spriteZombie.setVelocityX(0).play('stop');
    }
    //SPACE
    if (Phaser.Input.Keyboard.JustDown(this.mioTasto.space)) {
        this.spriteZombie.setVelocityY(-230).play('jump');
    }
}

//---------------------------------------------------------------------
//-------FUNZIONI------------------------------------------------------
//---------------------------------------------------------------------
//funzione random
function random(min, max) {
    return Math.random() * (max - min) + min;
}
//funzione tube --> move zombie
function tube(spriteZombie, tube) {
    this.sound.play('tube');
    this.spriteZombie.x = 1200;
    this.spriteZombie.y = 50;
}
//funzione collectLife --> add score
function collectLife(spriteZombie, life) {
    this.sound.play('collect');
    count_life++;
    life.disableBody(true, true);
    score += increaseLife;
    scoreText.setText('Score: ' + score);
    if (count_life === 21) {
        console.log("-- Raccolto tutte le life1 --> +300 --");
        score += 300;
        scoreText.setText('Score: ' + score);
        count_life = 0;
        this.sound.play('bonus');
    }
}
//funzione collectLife2 --> add score
function collectLife2(spriteZombie, life2) {
    this.sound.play('collect');
    count_life2++;
    life2.disableBody(true, true);
    score += increaseLife;
    scoreText.setText('Score: ' + score);
    if (count_life2 === 16) {
        console.log("-- Raccolto tutte le life2 --> +300 --");
        score += 300;
        scoreText.setText('Score: ' + score);
        count_life2 = 0;
        this.sound.play('bonus');
    }
}
//funzione collectStar --> add score
function collectStar(spriteZombie, star) {
    this.sound.play('level_up');
    score += increaseStar;
    scoreText.setText('Score: ' + score);
    this.spriteZombie.x = startX;
    this.spriteZombie.y = startY;
    nextLevel();
}
//funzione collectPotion --> restore life
function collectPotion(spriteZombie, potion) {
    this.sound.play('potion');
    potion.disableBody(true, true);
    lifeTot = 3;
    lifeTotText.setText('Life: ' + lifeTot);
}
//funzione hitBomb --> remove life
function hitBomb(spriteZombie, bomb) {
    this.sound.play('hit');
    if (lifeTot > 1) {
        spriteZombie.play('hurt');
        lifeTot -= 1;
        lifeTotText.setText('Life: ' + lifeTot);
        bombBunce(spriteZombie, bomb);
    } else {
        spriteZombie.play('dead');
        lifeTotText.setText('GAME OVER!');
        gameOver();
    }
}
//funzione bombBunce --> move bomb
function bombBunce(floor, bomb) {
    var deltaX = random(1, maxXBomb);
    bomb.x = deltaX;
    bomb.y = maxYBomb;
    bomb.setVelocityY(-250);
}
//funzione jump (quando passo sulla molla)
function jump(spriteZombie, spring) {
    this.spriteZombie.setVelocityY(-230)
}
//funzione wire --> add score
function wire(spriteZombie, wire) {
    if (score > 0) {
        score -= decraseWire;
        scoreText.setText('Score: ' + score);
    }
}
//funzione next level --> set
function nextLevel() {
    //se sono già al LIV. 3 --> WIN, altrimenti --> incrementa LIV. 3
    if (level === 3) {
        levelText.setText('HAI VINTO!');
        alert("COMPLIMENTI, HAI VINTO!\nTotal Score: " + score);
        window.open('./index.html');
    } else {
        level++;
        levelText.setText('Level: ' + level);
        if (level === 2) {
            initialTime = 40;
        }
        if (level === 3) {
            initialTime = 20;
        }
    }
    count_life = 0;
    count_life2 = 0;
    life.children.iterate((cuore)=>{
        cuore.setVisible(true)
    })
    life2.children.iterate((cuore2)=>{
        cuore2.setVisible(true)
    })
}
//funzione gameOver
function gameOver() {
    alert("Game Over!\nScore: " + score);
    window.open('./index.html');
    this.sound.play('game_over');
}
//funzione formatta timer
function formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var partInSeconds = seconds % 60;
    partInSeconds = partInSeconds.toString().padStart(2, '0');
    return `${minutes}:${partInSeconds}`;
}
//funzione aggiorna timer
function onEvent() {
    initialTime -= 1;
    if (initialTime === 0) {
        gameOver();
    }
    if (level === 1) {
        timerText.setText('Time: NO');
    }
    if (level === 2) {
        timerText.setText('Time: ' + formatTime(initialTime));
    }
    if (level === 3) {
        timerText.setText('Time: ' + formatTime(initialTime));
    }
}