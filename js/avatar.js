/* ==========================================================
   EVERWYN ONLINE
   AVATAR ENGINE
   Version 1
========================================================== */


/* ==========================================================
   DEFAULT CHARACTER APPEARANCE

   These values match the IDs stored in Supabase.
========================================================== */

const EVERWYN_DEFAULT_AVATAR = {

    character_name: "Traveler",

    species: "human",

    skin_tone: "skin_01",
    body_type: "body_01",

    eye_style: "eyes_01",
    eye_color: "brown",

    eyebrow_style: "brows_01",

    hair_style: "long_01",
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
   COLOR LIBRARY

   Temporary procedural colors.

   Later these IDs will point to actual illustrated
   sprite assets.
========================================================== */

const EVERWYN_AVATAR_COLORS = {

    skin: {

        skin_01: 0xf2d1bc,
        skin_02: 0xe8bc9f,
        skin_03: 0xd89c78,
        skin_04: 0xb97855,
        skin_05: 0x8e573d,
        skin_06: 0x603b2c,
        skin_07: 0x3e271f

    },


    hair: {

        black: 0x211d24,

        dark_brown: 0x3b2926,

        brown: 0x684536,

        chestnut: 0x874d3c,

        auburn: 0x8d4937,

        blonde: 0xcaa66d,

        platinum: 0xe2d8ca,

        silver: 0xbfc1ca,

        white: 0xeee9e4,

        rose: 0xb98292,

        lavender: 0x9b83b4,

        midnight: 0x303653

    },


    eyes: {

        brown: 0x654238,

        hazel: 0x81704b,

        green: 0x57735e,

        blue: 0x577b99,

        gray: 0x7d8289,

        violet: 0x76628f,

        gold: 0xb28a45

    },


    clothing: {

        starter_top_01: 0x62546f,

        starter_bottom_01: 0x363845,

        starter_shoes_01: 0x29262d

    }

};


/* ==========================================================
   GET COLOR
========================================================== */

function getAvatarColor(
    category,
    option,
    fallback
) {

    const collection =
        EVERWYN_AVATAR_COLORS[category];


    if (
        collection &&
        collection[option] !== undefined
    ) {

        return collection[option];

    }


    return fallback;

}


/* ==========================================================
   NORMALIZE CHARACTER DATA

   If Supabase is missing an option, Everwyn falls back
   to the starter appearance instead of breaking.
========================================================== */

function normalizeAvatarData(data = {}) {

    return {

        ...EVERWYN_DEFAULT_AVATAR,

        ...data

    };

}


/* ==========================================================
   CREATE EVERWYN AVATAR

   Version 1 uses Phaser graphics.

   Later the same appearance IDs will select sprite layers,
   meaning our database structure will not need to change.
========================================================== */

function createEverwynAvatar(
    scene,
    x,
    y,
    characterData = {}
) {

    const appearance =
        normalizeAvatarData(characterData);


    const avatar =
        scene.add.container(
            x,
            y
        );


    avatar.setDepth(10);


    /* ======================================================
       SHADOW
    ====================================================== */

    const shadow =
        scene.add.ellipse(
            0,
            25,
            38,
            13,
            0x000000,
            0.25
        );


    /* ======================================================
       AURA
    ====================================================== */

    const aura =
    scene.add.circle(
        0,
        -10,
        35,
        0xc9a7e8,
        0
    );


/* ======================================================
   SPECIES AURA
====================================================== */

if (
    appearance.species === "celestial"
) {

    aura.setFillStyle(
        0xe1c77d,
        0.16
    );

}


else if (
    appearance.species === "shadowkin"
) {

    aura.setFillStyle(
        0x76558f,
        0.18
    );

}


    /* ======================================================
       LEGS
    ====================================================== */

    const leftLeg =
        scene.add.rectangle(
            -7,
            13,
            9,
            21,

            getAvatarColor(
                "clothing",
                appearance.bottom_item,
                0x363845
            )
        );


    const rightLeg =
        scene.add.rectangle(
            7,
            13,
            9,
            21,

            getAvatarColor(
                "clothing",
                appearance.bottom_item,
                0x363845
            )
        );


    /* ======================================================
       SHOES
    ====================================================== */

    const leftShoe =
        scene.add.ellipse(
            -7,
            25,
            11,
            7,

            getAvatarColor(
                "clothing",
                appearance.shoes_item,
                0x29262d
            )
        );


    const rightShoe =
        scene.add.ellipse(
            7,
            25,
            11,
            7,

            getAvatarColor(
                "clothing",
                appearance.shoes_item,
                0x29262d
            )
        );


    /* ======================================================
       BODY / TOP
    ====================================================== */

    const torso =
        scene.add.rectangle(
            0,
            0,
            30,
            31,

            getAvatarColor(
                "clothing",
                appearance.top_item,
                0x62546f
            )
        );


    /* ======================================================
       HEAD
    ====================================================== */

    const skinColor =
        getAvatarColor(
            "skin",
            appearance.skin_tone,
            0xf2d1bc
        );


    const head =
        scene.add.circle(
            0,
            -25,
            18,
            skinColor
        );


    /* ======================================================
       EARS
    ====================================================== */

    /* ======================================================
   EARS
====================================================== */

let leftEar;
let rightEar;


/* ------------------------------------------------------
   FAE EARS
------------------------------------------------------ */

if (
    appearance.species === "fae"
) {

    leftEar =
        scene.add.triangle(
            -20,
            -25,
            8, 0,
            0, 5,
            8, 10,
            skinColor
        );


    rightEar =
        scene.add.triangle(
            20,
            -25,
            0, 0,
            8, 5,
            0, 10,
            skinColor
        );

}


/* ------------------------------------------------------
   ELF EARS
------------------------------------------------------ */

else if (
    appearance.species === "elf"
) {

    leftEar =
        scene.add.triangle(
            -23,
            -25,
            12, 0,
            0, 5,
            12, 10,
            skinColor
        );


    rightEar =
        scene.add.triangle(
            23,
            -25,
            0, 0,
            12, 5,
            0, 10,
            skinColor
        );

}


/* ------------------------------------------------------
   STANDARD EARS
------------------------------------------------------ */

else {

    leftEar =
        scene.add.circle(
            -18,
            -25,
            5,
            skinColor
        );


    rightEar =
        scene.add.circle(
            18,
            -25,
            5,
            skinColor
        );

}


    /* ======================================================
       EYES
    ====================================================== */

    const eyeColor =
        getAvatarColor(
            "eyes",
            appearance.eye_color,
            0x654238
        );


    const leftEye =
        scene.add.circle(
            -6,
            -25,
            2.5,
            eyeColor
        );


    const rightEye =
        scene.add.circle(
            6,
            -25,
            2.5,
            eyeColor
        );
/* ======================================================
   SPECIES MARKING
====================================================== */

let speciesMark;


/* ------------------------------------------------------
   WITCHBORN
------------------------------------------------------ */

if (
    appearance.species === "witchborn"
) {

    speciesMark =
        scene.add.rectangle(
            0,
            -35,
            5,
            5,
            0xa58bbb
        );


    speciesMark.setAngle(
        45
    );

}


/* ------------------------------------------------------
   CELESTIAL
------------------------------------------------------ */

else if (
    appearance.species === "celestial"
) {

    speciesMark =
        scene.add.circle(
            0,
            -35,
            4,
            0xe1c77d
        );

}


/* ------------------------------------------------------
   SHADOWKIN
------------------------------------------------------ */

else if (
    appearance.species === "shadowkin"
) {

    speciesMark =
        scene.add.ellipse(
            0,
            -35,
            11,
            3,
            0x76558f
        );

}


/* ------------------------------------------------------
   HUMAN / FAE / ELF

   Invisible placeholder keeps our layer system consistent.
------------------------------------------------------ */

else {

    speciesMark =
        scene.add.circle(
            0,
            -35,
            1,
            0xffffff,
            0
        );

}

    /* ======================================================
       HAIR

       This is our temporary starter hairstyle.
       Different hairstyles will become separate layers.
    ====================================================== */

    const hairColor =
        getAvatarColor(
            "hair",
            appearance.hair_color,
            0x3b2926
        );


    const hairBack =
        scene.add.ellipse(
            0,
            -29,
            39,
            38,
            hairColor
        );


    const hairTop =
        scene.add.ellipse(
            0,
            -40,
            36,
            20,
            hairColor
        );


    const hairLeft =
        scene.add.ellipse(
            -14,
            -20,
            10,
            28,
            hairColor
        );


    const hairRight =
        scene.add.ellipse(
            14,
            -20,
            10,
            28,
            hairColor
        );


    /* ======================================================
       FACIAL HIGHLIGHT
    ====================================================== */

    const faceHighlight =
        scene.add.ellipse(
            0,
            -18,
            8,
            3,
            0xffffff,
            0.10
        );


    /* ======================================================
       ASSEMBLE LAYERS

       Order matters: back layers first.
    ====================================================== */

    avatar.add([

        shadow,

        aura,

        hairBack,

        leftLeg,
        rightLeg,

        leftShoe,
        rightShoe,

        torso,

        leftEar,
        rightEar,

        head,

        leftEye,
        rightEye,
       speciesMark,
       
        faceHighlight,

        hairTop,
        hairLeft,
        hairRight

    ]);


    /* ======================================================
       PHYSICS
    ====================================================== */

    scene.physics.add.existing(
        avatar
    );


    avatar.body.setSize(
        28,
        32
    );


    avatar.body.setOffset(
        -14,
        0
    );


    avatar.body.setCollideWorldBounds(
        true
    );


    /* ======================================================
       CHARACTER INFORMATION
    ====================================================== */

    avatar.characterData =
        appearance;


    avatar.characterName =
        appearance.character_name;


    avatar.facing =
        "down";


    avatar.isMoving =
        false;


    /* ======================================================
       NAME LABEL
    ====================================================== */

    const nameText =
        scene.add.text(
            x,
            y + 40,
            appearance.character_name,
            {

                fontFamily:
                    "Georgia, serif",

                fontSize:
                    "11px",

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
        )
        .setDepth(11);


    avatar.nameText =
        nameText;


    /* ======================================================
       SAVE LAYER REFERENCES

       These allow the character creator to change individual
       pieces without rebuilding the entire character.
    ====================================================== */

    avatar.layers = {

        shadow,
        aura,

        leftLeg,
        rightLeg,

        leftShoe,
        rightShoe,

        torso,

        head,

        leftEar,
        rightEar,

        leftEye,
        rightEye,

       speciesMark,
        hairBack,
        hairTop,
        hairLeft,
        hairRight

    };
/* ======================================================
   APPLY SAVED HAIRSTYLE
====================================================== */

setAvatarHairStyle(
    avatar,
    appearance.hair_style
);

    return avatar;

}


/* ==========================================================
   UPDATE AVATAR NAME POSITION
========================================================== */

function updateAvatarLabel(avatar) {

    if (
        !avatar ||
        !avatar.nameText
    ) {
        return;
    }


    avatar.nameText.setPosition(
        avatar.x,
        avatar.y + 40
    );

}


/* ==========================================================
   CHANGE SKIN TONE
========================================================== */

function setAvatarSkinTone(
    avatar,
    skinTone
) {

    if (!avatar) {
        return;
    }


    const color =
        getAvatarColor(
            "skin",
            skinTone,
            0xf2d1bc
        );


    avatar.layers.head.setFillStyle(
        color
    );


    avatar.layers.leftEar.setFillStyle(
        color
    );


    avatar.layers.rightEar.setFillStyle(
        color
    );


    avatar.characterData.skin_tone =
        skinTone;

}


/* ==========================================================
   CHANGE HAIR COLOR
========================================================== */

function setAvatarHairColor(
    avatar,
    hairColor
) {

    if (!avatar) {
        return;
    }


    const color =
        getAvatarColor(
            "hair",
            hairColor,
            0x3b2926
        );


    avatar.layers.hairBack.setFillStyle(
        color
    );


    avatar.layers.hairTop.setFillStyle(
        color
    );


    avatar.layers.hairLeft.setFillStyle(
        color
    );


    avatar.layers.hairRight.setFillStyle(
        color
    );


    avatar.characterData.hair_color =
        hairColor;

}

/* ==========================================================
   CHANGE HAIRSTYLE
========================================================== */

function setAvatarHairStyle(
    avatar,
    hairStyle
) {

    if (
        !avatar ||
        !avatar.layers
    ) {

        return;

    }


    const hairBack =
        avatar.layers.hairBack;

    const hairTop =
        avatar.layers.hairTop;

    const hairLeft =
        avatar.layers.hairLeft;

    const hairRight =
        avatar.layers.hairRight;


    /* ======================================================
       RESET HAIR LAYERS
    ====================================================== */

    hairBack.setVisible(true);
    hairTop.setVisible(true);
    hairLeft.setVisible(true);
    hairRight.setVisible(true);


    hairBack.setPosition(
        0,
        -29
    );

    hairBack.setDisplaySize(
        39,
        38
    );


    hairTop.setPosition(
        0,
        -40
    );

    hairTop.setDisplaySize(
        36,
        20
    );


    hairLeft.setPosition(
        -14,
        -20
    );

    hairLeft.setDisplaySize(
        10,
        28
    );


    hairRight.setPosition(
        14,
        -20
    );

    hairRight.setDisplaySize(
        10,
        28
    );


    /* ======================================================
       LONG
    ====================================================== */

    if (
        hairStyle === "long_01"
    ) {

        hairBack.setPosition(
            0,
            -22
        );

        hairBack.setDisplaySize(
            42,
            54
        );


        hairLeft.setPosition(
            -15,
            -15
        );

        hairLeft.setDisplaySize(
            11,
            39
        );


        hairRight.setPosition(
            15,
            -15
        );

        hairRight.setDisplaySize(
            11,
            39
        );

    }


    /* ======================================================
       CURLS
    ====================================================== */

    else if (
        hairStyle === "curls_01"
    ) {

        hairBack.setPosition(
            0,
            -26
        );

        hairBack.setDisplaySize(
            48,
            46
        );


        hairTop.setPosition(
            0,
            -41
        );

        hairTop.setDisplaySize(
            42,
            25
        );


        hairLeft.setPosition(
            -17,
            -20
        );

        hairLeft.setDisplaySize(
            16,
            32
        );


        hairRight.setPosition(
            17,
            -20
        );

        hairRight.setDisplaySize(
            16,
            32
        );

    }


    /* ======================================================
       WAVES
    ====================================================== */

    else if (
        hairStyle === "waves_01"
    ) {

        hairBack.setPosition(
            0,
            -23
        );

        hairBack.setDisplaySize(
            43,
            51
        );


        hairTop.setPosition(
            -2,
            -40
        );

        hairTop.setDisplaySize(
            39,
            21
        );


        hairLeft.setPosition(
            -15,
            -17
        );

        hairLeft.setDisplaySize(
            12,
            37
        );


        hairRight.setPosition(
            15,
            -15
        );

        hairRight.setDisplaySize(
            14,
            40
        );

    }


    /* ======================================================
       SHORT
    ====================================================== */

    else if (
        hairStyle === "short_01"
    ) {

        hairBack.setPosition(
            0,
            -32
        );

        hairBack.setDisplaySize(
            38,
            27
        );


        hairTop.setPosition(
            0,
            -41
        );

        hairTop.setDisplaySize(
            37,
            20
        );


        hairLeft.setPosition(
            -15,
            -27
        );

        hairLeft.setDisplaySize(
            8,
            18
        );


        hairRight.setPosition(
            15,
            -27
        );

        hairRight.setDisplaySize(
            8,
            18
        );

    }


    /* ======================================================
       BRAIDS
    ====================================================== */

    else if (
        hairStyle === "braids_01"
    ) {

        hairBack.setPosition(
            0,
            -31
        );

        hairBack.setDisplaySize(
            38,
            31
        );


        hairTop.setPosition(
            0,
            -41
        );

        hairTop.setDisplaySize(
            36,
            20
        );


        hairLeft.setPosition(
            -16,
            -10
        );

        hairLeft.setDisplaySize(
            7,
            48
        );


        hairRight.setPosition(
            16,
            -10
        );

        hairRight.setDisplaySize(
            7,
            48
        );

    }


    /* ======================================================
       UPDO
    ====================================================== */

    else if (
        hairStyle === "updo_01"
    ) {

        hairBack.setPosition(
            0,
            -32
        );

        hairBack.setDisplaySize(
            37,
            30
        );


        hairTop.setPosition(
            0,
            -41
        );

        hairTop.setDisplaySize(
            35,
            19
        );


        /*
         * Hair-left becomes the bun.
         */

        hairLeft.setPosition(
            0,
            -53
        );

        hairLeft.setDisplaySize(
            19,
            17
        );


        hairRight.setVisible(
            false
        );

    }


    /* ======================================================
       UNKNOWN STYLE FALLBACK
    ====================================================== */

    else {

        hairStyle =
            "long_01";


        hairBack.setPosition(
            0,
            -22
        );

        hairBack.setDisplaySize(
            42,
            54
        );


        hairLeft.setPosition(
            -15,
            -15
        );

        hairLeft.setDisplaySize(
            11,
            39
        );


        hairRight.setPosition(
            15,
            -15
        );

        hairRight.setDisplaySize(
            11,
            39
        );

    }


    avatar.characterData.hair_style =
        hairStyle;

}
/* ==========================================================
   CHANGE EYE COLOR
========================================================== */

function setAvatarEyeColor(
    avatar,
    eyeColor
) {

    if (!avatar) {
        return;
    }


    const color =
        getAvatarColor(
            "eyes",
            eyeColor,
            0x654238
        );


    avatar.layers.leftEye.setFillStyle(
        color
    );


    avatar.layers.rightEye.setFillStyle(
        color
    );


    avatar.characterData.eye_color =
        eyeColor;

}


/* ==========================================================
   CHANGE TOP
========================================================== */

function setAvatarTop(
    avatar,
    topItem
) {

    if (!avatar) {
        return;
    }


    const color =
        getAvatarColor(
            "clothing",
            topItem,
            0x62546f
        );


    avatar.layers.torso.setFillStyle(
        color
    );


    avatar.characterData.top_item =
        topItem;

}


/* ==========================================================
   CHANGE BOTTOM
========================================================== */

function setAvatarBottom(
    avatar,
    bottomItem
) {

    if (!avatar) {
        return;
    }


    const color =
        getAvatarColor(
            "clothing",
            bottomItem,
            0x363845
        );


    avatar.layers.leftLeg.setFillStyle(
        color
    );


    avatar.layers.rightLeg.setFillStyle(
        color
    );


    avatar.characterData.bottom_item =
        bottomItem;

}


/* ==========================================================
   CHANGE SHOES
========================================================== */

function setAvatarShoes(
    avatar,
    shoesItem
) {

    if (!avatar) {
        return;
    }


    const color =
        getAvatarColor(
            "clothing",
            shoesItem,
            0x29262d
        );


    avatar.layers.leftShoe.setFillStyle(
        color
    );


    avatar.layers.rightShoe.setFillStyle(
        color
    );


    avatar.characterData.shoes_item =
        shoesItem;

}
