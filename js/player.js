/* ==========================================================
   EVERWYN ONLINE
   PLAYER SYSTEM
   Loads saved character customization from Supabase
========================================================== */


/* ==========================================================
   SUPABASE CONNECTION
========================================================== */

const EVERWYN_SUPABASE_URL =
    "https://iajvwhrjutqkqqvbknth.supabase.co";

const EVERWYN_SUPABASE_KEY =
    "sb_publishable_5zhAgTZggC_EnEc0o834_g_8h9yudIz";


/* ==========================================================
   FALLBACK CHARACTER

   Used only if Everwyn cannot load the saved character.
========================================================== */

const EVERWYN_FALLBACK_CHARACTER = {

    player_id: 3,

    character_name: "Traveler",

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
   CURRENT CHARACTER DATA

   This starts with the fallback character.

   Once Supabase responds, it is replaced with the player's
   actual saved customization.
========================================================== */

let CURRENT_PLAYER_CHARACTER = {

    ...EVERWYN_FALLBACK_CHARACTER

};


/* ==========================================================
   GET CURRENT PLAYER ID

   The Character Creator stores the player's ID in
   localStorage before sending them into Everwyn.

   Player 3 remains the development fallback for now.
========================================================== */

function getCurrentPlayerId() {

    const savedPlayerId =
        localStorage.getItem(
            "everwyn_player_id"
        );


    if (savedPlayerId) {

        const parsedId =
            Number(
                savedPlayerId
            );


        if (
            Number.isInteger(parsedId) &&
            parsedId > 0
        ) {

            return parsedId;

        }

    }


    return 3;

}


/* ==========================================================
   LOAD CHARACTER FROM SUPABASE
========================================================== */

async function loadPlayerCharacter() {

    const playerId =
        getCurrentPlayerId();


    try {

        const response =
            await fetch(

                EVERWYN_SUPABASE_URL +
                "/rest/v1/player_characters" +
                "?player_id=eq." +
                encodeURIComponent(
                    playerId
                ) +
                "&select=*",

                {

                    method:
                        "GET",

                    headers: {

                        "apikey":
                            EVERWYN_SUPABASE_KEY,

                        "Authorization":
                            "Bearer " +
                            EVERWYN_SUPABASE_KEY,

                        "Accept":
                            "application/json"

                    }

                }

            );


        if (!response.ok) {

            const errorText =
                await response.text();


            throw new Error(
                "HTTP " +
                response.status +
                " — " +
                errorText
            );

        }


        const characters =
            await response.json();


        if (
            !characters ||
            characters.length === 0
        ) {

            throw new Error(
                "No character was found for player " +
                playerId +
                "."
            );

        }


        CURRENT_PLAYER_CHARACTER = {

            ...EVERWYN_FALLBACK_CHARACTER,

            ...characters[0]

        };


        console.log(
            "Everwyn character loaded:",
            CURRENT_PLAYER_CHARACTER
        );


        return CURRENT_PLAYER_CHARACTER;

    }

    catch (error) {

        console.error(
            "Everwyn could not load the saved character:",
            error
        );


        CURRENT_PLAYER_CHARACTER = {

            ...EVERWYN_FALLBACK_CHARACTER,

            player_id:
                playerId

        };


        return CURRENT_PLAYER_CHARACTER;

    }

}


/* ==========================================================
   CREATE PLAYER

   This remains synchronous so our existing Moonlight
   District and Moonlight Cafe scenes do not need to be
   rebuilt.

   game.js will load the character before Phaser starts.
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
     * Smaller collision body around the character's feet.
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
       PROCEDURAL WALK ANIMATION
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
