/* ==========================================================
   EVERWYN ONLINE
   MOONLIGHT CAFE
========================================================== */

class MoonlightCafe extends Phaser.Scene {

    constructor() {
        super("MoonlightCafe");
    }


    create() {

        currentScene = this;
        this.transitioning = false;

        hidePrompt();


        if (emergencyReturn) {
            emergencyReturn.style.display = "block";
        }


        setLocation(
            "Moonlight Cafe",
            "MOONLIGHT DISTRICT · INTERIOR"
        );


        /* ==================================================
           CAMERA SAFETY
        ================================================== */

        this.cameras.main.resetFX();
        this.cameras.main.setAlpha(1);
        this.cameras.main.setVisible(true);

        this.cameras.main.setBackgroundColor(
            "#1d1822"
        );


        /* ==================================================
           WORLD
        ================================================== */

        this.physics.world.setBounds(
            0,
            0,
            1400,
            950
        );


        this.cameras.main.setBounds(
            0,
            0,
            1400,
            950
        );


        /* ==================================================
           FLOOR
        ================================================== */

        this.add.rectangle(
            700,
            475,
            1320,
            870,
            0x302933
        )
        .setStrokeStyle(
            6,
            0x725b72,
            0.65
        )
        .setDepth(0);


        /* Wood floor lines */

        for (let y = 170; y <= 830; y += 45) {

            this.add.rectangle(
                700,
                y,
                1240,
                2,
                0x76606b,
                0.16
            ).setDepth(1);

        }


        /* Central runner */

        this.add.rectangle(
            700,
            525,
            220,
            650,
            0x49394b,
            0.80
        )
        .setStrokeStyle(
            2,
            0xb79dc8,
            0.25
        )
        .setDepth(2);


        /* ==================================================
           BACK WALL
        ================================================== */

        this.add.rectangle(
            700,
            110,
            1320,
            150,
            0x49394b
        ).setDepth(2);


        this.add.rectangle(
            700,
            177,
            1320,
            8,
            0xd0b376,
            0.42
        ).setDepth(3);


        /* ==================================================
           WINDOWS
        ================================================== */

        const windows = [
            260,
            480,
            920,
            1140
        ];


        windows.forEach(x => {

            this.add.rectangle(
                x,
                105,
                130,
                90,
                0xa88dcc,
                0.08
            ).setDepth(3);


            this.add.rectangle(
                x,
                105,
                105,
                76,
                0x22273b
            )
            .setStrokeStyle(
                4,
                0xb69bd0,
                0.60
            )
            .setDepth(4);


            this.add.rectangle(
                x,
                105,
                3,
                72,
                0xb69bd0,
                0.35
            ).setDepth(5);


            this.add.rectangle(
                x,
                105,
                101,
                3,
                0xb69bd0,
                0.35
            ).setDepth(5);

        });


        /* ==================================================
           CAFE SIGN
        ================================================== */

        this.add.text(
            700,
            105,
            "MOONLIGHT",
            {
                fontFamily: "Georgia, serif",
                fontSize: "29px",
                color: "#f4eadc",
                letterSpacing: 5
            }
        )
        .setOrigin(0.5)
        .setDepth(6);


        this.add.text(
            700,
            142,
            "C A F E",
            {
                fontFamily: "Georgia, serif",
                fontSize: "12px",
                color: "#d5b975"
            }
        )
        .setOrigin(0.5)
        .setDepth(6);


        /* ==================================================
           CAFE COUNTER
        ================================================== */

        this.add.rectangle(
            250,
            320,
            320,
            105,
            0x624b48
        )
        .setStrokeStyle(
            4,
            0xb08a6b,
            0.75
        )
        .setDepth(4);


        this.add.rectangle(
            250,
            272,
            340,
            18,
            0x9a7965
        ).setDepth(5);


        /* Display case */

        this.add.rectangle(
            355,
            320,
            80,
            55,
            0x342f39
        )
        .setStrokeStyle(
            2,
            0xd6ba7c,
            0.55
        )
        .setDepth(5);


        this.add.circle(
            335,
            320,
            8,
            0xd4a98c
        ).setDepth(6);


        this.add.circle(
            355,
            320,
            8,
            0xd7c092
        ).setDepth(6);


        this.add.circle(
            375,
            320,
            8,
            0xc59fa4
        ).setDepth(6);


        this.add.text(
            250,
            320,
            "MOONLIGHT BAR",
            {
                fontFamily: "Georgia, serif",
                fontSize: "13px",
                color: "#f5efe4"
            }
        )
        .setOrigin(0.5)
        .setDepth(6);


        /* ==================================================
           SHELVES
        ================================================== */

        for (let y = 220; y <= 350; y += 65) {

            this.add.rectangle(
                105,
                y,
                90,
                8,
                0x765d50
            ).setDepth(4);


            for (let x = 75; x <= 135; x += 30) {

                this.add.rectangle(
                    x,
                    y - 12,
                    10,
                    22,
                    0x8a6c76
                ).setDepth(5);

            }

        }


        /* ==================================================
           TABLES
        ================================================== */

        this.tableColliders = [];


        const tables = [

            [500, 365],
            [790, 365],
            [500, 620],
            [790, 620]

        ];


        tables.forEach(position => {

            /* Shadow */

            this.add.ellipse(
                position[0],
                position[1] + 15,
                125,
                55,
                0x000000,
                0.18
            ).setDepth(2);


            /* Table */

            this.add.circle(
                position[0],
                position[1],
                58,
                0x705652
            )
            .setStrokeStyle(
                4,
                0xb18c73,
                0.60
            )
            .setDepth(4);


            /* Candle */

            this.add.circle(
                position[0],
                position[1],
                7,
                0xf1d393,
                0.95
            ).setDepth(6);


            this.add.circle(
                position[0],
                position[1],
                25,
                0xf1d393,
                0.07
            ).setDepth(5);


            /* Chairs */

            this.add.circle(
                position[0] - 78,
                position[1],
                20,
                0x51434c
            ).setDepth(4);


            this.add.circle(
                position[0] + 78,
                position[1],
                20,
                0x51434c
            ).setDepth(4);


            /* Collision */

            const collider =
                this.add.zone(
                    position[0],
                    position[1],
                    116,
                    116
                );


            this.physics.add.existing(
                collider,
                true
            );


            this.tableColliders.push(
                collider
            );

        });


        /* ==================================================
           SOCIAL LOUNGE
        ================================================== */

        this.add.rectangle(
            1130,
            500,
            350,
            430,
            0xa98dcc,
            0.05
        ).setDepth(2);


        this.add.rectangle(
            1130,
            500,
            320,
            400,
            0x44394f
        )
        .setStrokeStyle(
            4,
            0x9f83bd,
            0.60
        )
        .setDepth(3);


        this.add.text(
            1130,
            340,
            "✦",
            {
                fontSize: "42px",
                color: "#ead9ae"
            }
        )
        .setOrigin(0.5)
        .setDepth(6);


        this.add.text(
            1130,
            395,
            "CAFE SOCIAL HOUR",
            {
                fontFamily: "Georgia, serif",
                fontSize: "19px",
                color: "#f5efe4"
            }
        )
        .setOrigin(0.5)
        .setDepth(6);


        this.add.text(
            1130,
            425,
            "Meet · Chat · Connect",
            {
                fontFamily: "Georgia, serif",
                fontSize: "11px",
                color: "#c8bdce"
            }
        )
        .setOrigin(0.5)
        .setDepth(6);


        /* Lounge seating */

        this.add.rectangle(
            1130,
            585,
            190,
            65,
            0x695469
        )
        .setStrokeStyle(
            3,
            0x94759a,
            0.60
        )
        .setDepth(4);


        this.add.rectangle(
            1030,
            500,
            65,
            155,
            0x695469
        ).setDepth(4);


        this.add.rectangle(
            1230,
            500,
            65,
            155,
            0x695469
        ).setDepth(4);


        /* ==================================================
           PLANTS
        ================================================== */

        this.createPlant(
            90,
            760
        );


        this.createPlant(
            1310,
            760
        );


        this.createPlant(
            1000,
            240
        );


        /* ==================================================
           OTHER PLAYERS
        ================================================== */

        this.createOtherPlayer(
            650,
            250,
            "Test Player",
            0x8fa594
        );


        this.createOtherPlayer(
            1110,
            520,
            "Cafe Guest",
            0xc09bb9
        );


        this.createOtherPlayer(
            1180,
            600,
            "Night Owl",
            0x8799b8
        );


        /* ==================================================
           EXIT
        ================================================== */

        this.add.rectangle(
            700,
            875,
            150,
            35,
            0xd6ba7c,
            0.16
        ).setDepth(3);


        this.add.rectangle(
            700,
            875,
            105,
            24,
            0xd6ba7c
        ).setDepth(4);


        this.add.text(
            700,
            835,
            "EXIT TO MOONLIGHT DISTRICT",
            {
                fontFamily: "Georgia, serif",
                fontSize: "11px",
                color: "#ead9ae"
            }
        )
        .setOrigin(0.5)
        .setDepth(5);


        /* ==================================================
           PLAYER
        ================================================== */

        this.player =
            createPlayer(
                this,
                700,
                775
            );


        createControls(this);


        /* ==================================================
           COLLISION
        ================================================== */

        this.tableColliders.forEach(
            collider => {

                this.physics.add.collider(
                    this.player,
                    collider
                );

            }
        );


        /* ==================================================
           CAMERA
        ================================================== */

        this.cameras.main.startFollow(
            this.player,
            true,
            0.08,
            0.08
        );


        this.cameras.main.centerOn(
            this.player.x,
            this.player.y
        );


        /* ==================================================
           INTERACTIONS
        ================================================== */

        this.interactions = [

            {
                x: 700,
                y: 865,
                radius: 105,

                text:
                    "Leave Moonlight Cafe",

                action: () => {

                    changeScene(
                        this,
                        "MoonlightDistrict",
                        {
                            fromCafe: true
                        }
                    );

                }
            },


            {
                x: 1130,
                y: 500,
                radius: 180,

                text:
                    "Join Cafe Social Hour",

                action: () => {

                    completeGoal(
                        "goal-social"
                    );


                    showMessage(
                        "Yanola joined Cafe Social Hour ✦"
                    );

                }
            },


            {
                x: 650,
                y: 250,
                radius: 95,

                text:
                    "Talk to Test Player",

                action: () => {

                    showMessage(
                        "Test Player · Acquaintance — friendships, gifts, activities, and relationship progression will connect here."
                    );

                }
            },


            {
                x: 250,
                y: 320,
                radius: 170,

                text:
                    "Visit Cafe Counter",

                action: () => {

                    showMessage(
                        "The menu smells like moonberry pastries and dark-roast coffee. Ordering and cafe jobs will connect here."
                    );

                }
            }

        ];


        showMessage(
            "Entered Moonlight Cafe"
        );

    }


    /* ======================================================
       PLANT
    ====================================================== */

    createPlant(x, y) {

        this.add.ellipse(
            x,
            y + 25,
            55,
            20,
            0x000000,
            0.18
        ).setDepth(2);


        this.add.rectangle(
            x,
            y + 15,
            34,
            38,
            0x6b514b
        ).setDepth(3);


        this.add.ellipse(
            x - 15,
            y - 8,
            22,
            55,
            0x486650
        )
        .setAngle(-25)
        .setDepth(4);


        this.add.ellipse(
            x + 15,
            y - 8,
            22,
            55,
            0x55745d
        )
        .setAngle(25)
        .setDepth(4);


        this.add.ellipse(
            x,
            y - 20,
            24,
            65,
            0x5e8067
        ).setDepth(5);

    }


    /* ======================================================
       OTHER PLAYER
    ====================================================== */

    createOtherPlayer(
        x,
        y,
        name,
        color
    ) {

        this.add.ellipse(
            x,
            y + 18,
            38,
            14,
            0x000000,
            0.22
        ).setDepth(4);


        this.add.circle(
            x,
            y,
            19,
            color
        )
        .setStrokeStyle(
            3,
            0xe4dce8,
            0.75
        )
        .setDepth(6);


        this.add.text(
            x,
            y + 30,
            name,
            {
                fontFamily: "Georgia, serif",
                fontSize: "11px",
                color: "#f5efe4",
                backgroundColor: "#11131dcc",

                padding: {
                    x: 5,
                    y: 2
                }
            }
        )
        .setOrigin(
            0.5,
            0
        )
        .setDepth(7);

    }


    /* ======================================================
       UPDATE
    ====================================================== */

    update() {

        updatePlayer(this);

        checkInteractions(this);

    }

}
