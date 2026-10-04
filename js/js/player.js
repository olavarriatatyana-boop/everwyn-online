/* ==========================================================
   EVERWYN ONLINE
   PLAYER SYSTEM
   Yanola movement + controls
========================================================== */

function createPlayer(scene, x, y) {

    /*
        Player shadow
    */

    const shadow =
        scene.add.ellipse(
            x,
            y + 18,
            38,
            15,
            0x000000,
            0.25
        );


    /*
        Temporary Yanola character.

        Later this circle will be replaced
        with Yanola's actual character sprite.
    */

    const player =
        scene.add.circle(
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


    /*
        Add physics
    */

    scene.physics.add.existing(
        player
    );


    player.body.setCollideWorldBounds(
        true
    );


    /*
        Store shadow on player so it
        follows Yanola automatically.
    */

    player.shadow =
        shadow;


    /*
        Player name
    */

    player.nameText =
        scene.add.text(
            x,
            y + 31,
            "Yanola",
            {
                fontFamily:
                    "Georgia, serif",

                fontSize:
                    "12px",

                color:
                    "#f8f2ea",

                backgroundColor:
                    "#11131dcc",

                padding: {
                    x: 6,
                    y: 3
                }
            }
        )
        .setOrigin(
            0.5,
            0
        );


    /*
        Small magical glow
    */

    player.glow =
        scene.add.circle(
            x,
            y,
            27,
            0xc7a7e8,
            0.08
        );


    /*
        Keep player above glow/shadow
    */

    shadow.setDepth(4);

    player.glow.setDepth(5);

    player.setDepth(6);

    player.nameText.setDepth(7);


    return player;
}


/* ==========================================================
   KEYBOARD CONTROLS
========================================================== */

function createControls(scene) {

    scene.cursors =
        scene.input.keyboard
            .createCursorKeys();


    scene.keys =
        scene.input.keyboard
            .addKeys({

                up:
                    Phaser.Input.Keyboard
                        .KeyCodes.W,

                down:
                    Phaser.Input.Keyboard
                        .KeyCodes.S,

                left:
                    Phaser.Input.Keyboard
                        .KeyCodes.A,

                right:
                    Phaser.Input.Keyboard
                        .KeyCodes.D,

                interact:
                    Phaser.Input.Keyboard
                        .KeyCodes.E

            });
}


/* ==========================================================
   PLAYER MOVEMENT
========================================================== */

function updatePlayer(scene) {

    if (
        !scene.player ||
        !scene.player.body ||
        scene.transitioning
    ) {
        return;
    }


    const player =
        scene.player;


    const speed =
        220;


    player.body.setVelocity(
        0,
        0
    );


    /*
        Horizontal movement
    */

    if (
        scene.cursors.left.isDown ||
        scene.keys.left.isDown
    ) {

        player.body.setVelocityX(
            -speed
        );

    }

    else if (
        scene.cursors.right.isDown ||
        scene.keys.right.isDown
    ) {

        player.body.setVelocityX(
            speed
        );

    }


    /*
        Vertical movement
    */

    if (
        scene.cursors.up.isDown ||
        scene.keys.up.isDown
    ) {

        player.body.setVelocityY(
            -speed
        );

    }

    else if (
        scene.cursors.down.isDown ||
        scene.keys.down.isDown
    ) {

        player.body.setVelocityY(
            speed
        );

    }


    /*
        Prevent diagonal movement from
        being faster than straight movement.
    */

    if (
        player.body.velocity.x !== 0 ||
        player.body.velocity.y !== 0
    ) {

        player.body.velocity
            .normalize()
            .scale(
                speed
            );

    }


    /*
        Move decorative player elements.
    */

    player.nameText.setPosition(
        player.x,
        player.y + 31
    );


    player.shadow.setPosition(
        player.x,
        player.y + 18
    );


    player.glow.setPosition(
        player.x,
        player.y
    );

}
