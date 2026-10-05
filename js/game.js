/* ==========================================================
   EVERWYN ONLINE
   MAIN GAME CONFIGURATION
========================================================== */


/* ==========================================================
   PHASER CONFIG
========================================================== */

const config = {

    type: Phaser.AUTO,

    parent: "everwyn-game",

    width: window.innerWidth,

    height: window.innerHeight,

    backgroundColor: "#10121b",


    /* ======================================================
       PHYSICS
    ====================================================== */

    physics: {

        default: "arcade",

        arcade: {

            gravity: {
                y: 0
            },

            debug: false

        }

    },


    /* ======================================================
       RESPONSIVE SCREEN
    ====================================================== */

    scale: {

        mode: Phaser.Scale.RESIZE,

        autoCenter: Phaser.Scale.CENTER_BOTH

    },


    /* ======================================================
       EVERWYN SCENES
    ====================================================== */

    scene: [

        MoonlightDistrict,
        MoonlightCafe

    ]

};


/* ==========================================================
   START EVERWYN
========================================================== */

const game =
    new Phaser.Game(config);
