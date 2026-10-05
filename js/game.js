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

   Before Phaser starts, Everwyn loads the player's saved
   character customization from Supabase.

   This prevents the game from spawning the default avatar
   before the saved character data is available.
========================================================== */

async function startEverwyn() {

    try {

        console.log(
            "Loading Everwyn character..."
        );


        await loadPlayerCharacter();


        console.log(
            "Character loaded. Starting Everwyn..."
        );


        window.everwynGame =
            new Phaser.Game(
                config
            );

    }

    catch (error) {

        /*
         * loadPlayerCharacter already has its own fallback,
         * but this protects the game if another unexpected
         * startup error occurs.
         */

        console.error(
            "Everwyn startup error:",
            error
        );


        window.everwynGame =
            new Phaser.Game(
                config
            );

    }

}


/* ==========================================================
   BEGIN
========================================================== */

startEverwyn();
