/* ==========================================================
   EVERWYN ONLINE
   PLAYER SYSTEM
========================================================== */

function createPlayer(scene, x, y) {

    const shadow = scene.add.ellipse(
        x,
        y + 18,
        38,
        15,
        0x000000,
        0.25
    );

    const glow = scene.add.circle(
        x,
        y,
        27,
        0xc7a7e8,
        0.08
    );

    const player = scene.add.circle(
        x,
        y,
        19,
        0xe5d9ee
    );

    player.setStrokeStyle(
        3,
        0xb99bd5,
        1
    );

    scene.physics.add.existing(player);

    player.body.setCollideWorldBounds(true);

    const nameText = scene.add.text(
        x,
        y + 31,
        "Yanola",
        {
            fontFamily: "Georgia, serif",
            fontSize: "12px",
            color: "#f8f2ea",
            backgroundColor: "#11131dcc",
            padding: {
                x: 6,
                y: 3
            }
        }
    ).setOrigin(0.5, 0);

    shadow.setDepth(4);
    glow.setDepth(5);
    player.setDepth(6);
    nameText.setDepth(7);

    player.shadow = shadow;
    player.glow = glow;
    player.nameText = nameText;

    return player;
}


/* ==========================================================
   CONTROLS
========================================================== */

function createControls(scene) {

    scene.cursors =
        scene.input.keyboard.createCursorKeys();

    scene.keys =
        scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            interact: Phaser.Input.Keyboard.KeyCodes.E
        });
}


/* ==========================================================
   MOVEMENT
========================================================== */

function updatePlayer(scene) {

    if (
        !scene.player ||
        !scene.player.body ||
        scene.transitioning
    ) {
        return;
    }

    const player = scene.player;
    const speed = 220;

    player.body.setVelocity(0, 0);

    if (
        scene.cursors.left.isDown ||
        scene.keys.left.isDown
    ) {
        player.body.setVelocityX(-speed);
    }

    else if (
        scene.cursors.right.isDown ||
        scene.keys.right.isDown
    ) {
        player.body.setVelocityX(speed);
    }

    if (
        scene.cursors.up.isDown ||
        scene.keys.up.isDown
    ) {
        player.body.setVelocityY(-speed);
    }

    else if (
        scene.cursors.down.isDown ||
        scene.keys.down.isDown
    ) {
        player.body.setVelocityY(speed);
    }

    if (
        player.body.velocity.x !== 0 ||
        player.body.velocity.y !== 0
    ) {
        player.body.velocity
            .normalize()
            .scale(speed);
    }

    player.shadow.setPosition(
        player.x,
        player.y + 18
    );

    player.glow.setPosition(
        player.x,
        player.y
    );

    player.nameText.setPosition(
        player.x,
        player.y + 31
    );
}
