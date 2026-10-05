/* ==========================================================
   EVERWYN ONLINE
   PLAYER SYSTEM
   Connected to the Everwyn Avatar Engine
========================================================== */


/* ==========================================================
   TEMPORARY PLAYER DATA

   This matches Yanola's current Supabase character record.

   NEXT:
   We will replace this object with data loaded directly
   from Supabase.
========================================================== */

const CURRENT_PLAYER_CHARACTER = {

    player_id: 3,

    character_name: "Yanola",

    species: "human",

    skin_tone: "skin_01",
    body_type: "body_01",

    eye_style: "eyes_01",
    eye_color: "brown",

    eyebrow_style: "brows_01",

    hair_style: "hair_01",
    hair_color: "dark_brown",

    top_item: "starter_top_01",
    bottom_item: "starter_bottom_01",
    shoes_item: "starter_shoes_01",

    outerwear_item: null,

    head_accessory: null,
    face_accessory: null,
    accessory_item: null,

    ear_style: null,
    horn_style: null,
    wing_style: null,
    tail_style: null,

    marking_style: null,
    aura_style: null

};


/* ==========================================================
   CREATE PLAYER
========================================================== */

function createPlayer(
    scene,
    x,
    y
) {

    const player =
        createEverwynAvatar(
            scene,
            x,
            y,
            CURRENT_PLAYER_CHARACTER
        );


    /*
     * Give the avatar a smaller collision body.
     *
     * This lets the visible character overlap objects
     * naturally while the feet determine collision.
     */

    if (player.body) {

        player.body.setSize(
            26,
            24
        );


        player.body.setOffset(
            -13,
            4
        );


        player.body.setCollideWorldBounds(
            true
        );

    }


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

            up:
                Phaser.Input.Keyboard.KeyCodes.W,

            down:
                Phaser.Input.Keyboard.KeyCodes.S,

            left:
                Phaser.Input.Keyboard.KeyCodes.A,

            right:
                Phaser.Input.Keyboard.KeyCodes.D,

            interact:
                Phaser.Input.Keyboard.KeyCodes.E

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


    let velocityX =
        0;


    let velocityY =
        0;


    /* ======================================================
       HORIZONTAL MOVEMENT
    ====================================================== */

    if (
        scene.cursors.left.isDown ||
        scene.keys.left.isDown
    ) {

        velocityX =
            -speed;


        player.facing =
            "left";

    }


    else if (
        scene.cursors.right.isDown ||
        scene.keys.right.isDown
    ) {

        velocityX =
            speed;


        player.facing =
            "right";

    }


    /* ======================================================
       VERTICAL MOVEMENT
    ====================================================== */

    if (
        scene.cursors.up.isDown ||
        scene.keys.up.isDown
    ) {

        velocityY =
            -speed;


        player.facing =
            "up";

    }


    else if (
        scene.cursors.down.isDown ||
        scene.keys.down.isDown
    ) {

        velocityY =
            speed;


        player.facing =
            "down";

    }


    /* ======================================================
       NORMALIZE DIAGONAL MOVEMENT
    ====================================================== */

    if (
        velocityX !== 0 &&
        velocityY !== 0
    ) {

        const diagonalSpeed =
            speed /
            Math.sqrt(2);


        velocityX =
            velocityX > 0
                ? diagonalSpeed
                : -diagonalSpeed;


        velocityY =
            velocityY > 0
                ? diagonalSpeed
                : -diagonalSpeed;

    }


    player.body.setVelocity(
        velocityX,
        velocityY
    );


    player.isMoving =
        velocityX !== 0 ||
        velocityY !== 0;


    /* ======================================================
       WALK ANIMATION

       This is procedural for now.

       Once we have illustrated sprite layers,
       the same movement state will control their frames.
    ====================================================== */

    if (player.isMoving) {

        const walkTime =
            scene.time.now /
            95;


        const bob =
            Math.sin(
                walkTime
            ) * 1.5;


        const legSwing =
            Math.sin(
                walkTime
            ) * 3;


        player.layers.leftLeg.y =
            13 + legSwing;


        player.layers.rightLeg.y =
            13 - legSwing;


        player.layers.leftShoe.y =
            25 + legSwing;


        player.layers.rightShoe.y =
            25 - legSwing;


        player.layers.torso.y =
            bob;


        player.layers.head.y =
            -25 + bob;


        player.layers.leftEar.y =
            -25 + bob;


        player.layers.rightEar.y =
            -25 + bob;


        player.layers.leftEye.y =
            -25 + bob;


        player.layers.rightEye.y =
            -25 + bob;


        player.layers.hairBack.y =
            -29 + bob;


        player.layers.hairTop.y =
            -40 + bob;


        player.layers.hairLeft.y =
            -20 + bob;


        player.layers.hairRight.y =
            -20 + bob;

    }

    else {

        resetAvatarPose(
            player
        );

    }


    /* ======================================================
       DIRECTION

       For this first procedural avatar, turning left/right
       slightly mirrors the character.

       The illustrated sprite system will later use true
       front/back/left/right frames.
    ====================================================== */

    if (
        player.facing === "left"
    ) {

        player.setScale(
            -1,
            1
        );


        if (player.nameText) {

            player.nameText.setScale(
                -1,
                1
            );

        }

    }

    else {

        player.setScale(
            1,
            1
        );


        if (player.nameText) {

            player.nameText.setScale(
                1,
                1
            );

        }

    }


    /* ======================================================
       NAME LABEL
    ====================================================== */

    updateAvatarLabel(
        player
    );

}


/* ==========================================================
   RESET IDLE POSE
========================================================== */

function resetAvatarPose(
    player
) {

    if (
        !player ||
        !player.layers
    ) {

        return;

    }


    player.layers.leftLeg.y =
        13;


    player.layers.rightLeg.y =
        13;


    player.layers.leftShoe.y =
        25;


    player.layers.rightShoe.y =
        25;


    player.layers.torso.y =
        0;


    player.layers.head.y =
        -25;


    player.layers.leftEar.y =
        -25;


    player.layers.rightEar.y =
        -25;


    player.layers.leftEye.y =
        -25;


    player.layers.rightEye.y =
        -25;


    player.layers.hairBack.y =
        -29;


    player.layers.hairTop.y =
        -40;


    player.layers.hairLeft.y =
        -20;


    player.layers.hairRight.y =
        -20;

}
