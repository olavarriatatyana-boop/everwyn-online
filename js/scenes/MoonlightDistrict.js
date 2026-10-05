/* ==========================================================
   EVERWYN ONLINE
   MOONLIGHT DISTRICT
========================================================== */

class MoonlightDistrict extends Phaser.Scene {

    constructor() {
        super("MoonlightDistrict");
    }


    init(data) {

        this.spawnFromCafe =
            Boolean(data && data.fromCafe);

    }


    create() {

        currentScene = this;
        this.transitioning = false;

        hidePrompt();

        if (emergencyReturn) {
            emergencyReturn.style.display = "none";
        }

        setLocation(
            "Moonlight District",
            "EVERWYN · AFTER DUSK"
        );

        completeGoal("goal-explore");


        /* ==================================================
           WORLD
        ================================================== */

        this.physics.world.setBounds(
            0,
            0,
            2000,
            1400
        );

        this.cameras.main.resetFX();

        this.cameras.main.setBackgroundColor(
            "#111722"
        );


        /* Outer district */

        this.add.rectangle(
            1000,
            700,
            2000,
            1400,
            0x17221f
        ).setDepth(0);


        this.add.rectangle(
            1000,
            720,
            1850,
            1250,
            0x26332d
        ).setDepth(1);


        /* ==================================================
           ROADS
        ================================================== */

        this.add.rectangle(
            1000,
            700,
            1650,
            220,
            0x34333f
        ).setDepth(2);


        this.add.rectangle(
            930,
            700,
            220,
            1050,
            0x34333f
        ).setDepth(2);


        for (let x = 260; x <= 1740; x += 95) {

            this.add.rectangle(
                x,
                700,
                48,
                3,
                0x756b80,
                0.22
            ).setDepth(3);

        }


        for (let y = 220; y <= 1180; y += 90) {

            this.add.rectangle(
                930,
                y,
                3,
                44,
                0x756b80,
                0.20
            ).setDepth(3);

        }


        /* ==================================================
           SIDEWALKS
        ================================================== */

        this.add.rectangle(
            1000,
            565,
            1650,
            34,
            0x77716f
        ).setDepth(3);


        this.add.rectangle(
            1000,
            835,
            1650,
            34,
            0x77716f
        ).setDepth(3);


        this.add.rectangle(
            795,
            700,
            34,
            1050,
            0x77716f
        ).setDepth(3);


        this.add.rectangle(
            1065,
            700,
            34,
            1050,
            0x77716f
        ).setDepth(3);


        /* ==================================================
           CENTRAL PLAZA
        ================================================== */

        this.add.circle(
            930,
            700,
            245,
            0x44404d
        )
        .setStrokeStyle(
            6,
            0x8d8294,
            0.45
        )
        .setDepth(3);


        this.add.circle(
            930,
            700,
            205,
            0x000000,
            0
        )
        .setStrokeStyle(
            2,
            0xb7a1d3,
            0.16
        )
        .setDepth(4);


        this.add.circle(
            930,
            700,
            165,
            0x000000,
            0
        )
        .setStrokeStyle(
            2,
            0xd6ba7c,
            0.12
        )
        .setDepth(4);


        /* ==================================================
           MOONLIGHT FOUNTAIN
        ================================================== */

        this.add.circle(
            930,
            700,
            112,
            0xb9a1df,
            0.08
        ).setDepth(4);


        this.add.circle(
            930,
            700,
            88,
            0x6e7d8e
        )
        .setStrokeStyle(
            7,
            0xc7b7dc,
            0.75
        )
        .setDepth(5);


        this.add.circle(
            930,
            700,
            58,
            0x759eaa
        ).setDepth(5);


        this.add.circle(
            930,
            700,
            24,
            0xa9d3dc
        ).setDepth(6);


        this.add.circle(
            930,
            700,
            8,
            0xe6eff2
        ).setDepth(7);


        this.add.text(
            930,
            810,
            "MOONLIGHT FOUNTAIN",
            {
                fontFamily: "Georgia, serif",
                fontSize: "11px",
                color: "#cfc3dc",
                letterSpacing: 2
            }
        )
        .setOrigin(0.5)
        .setDepth(8);


        this.fountainCollider =
            this.add.zone(
                930,
                700,
                170,
                170
            );


        this.physics.add.existing(
            this.fountainCollider,
            true
        );


        /* ==================================================
           BUILDINGS
        ================================================== */

        this.buildingColliders = [];


        this.createBuilding(
            1510,
            330,
            330,
            235,
            0x4f3d52,
            0x72556c,
            "MOONLIGHT CAFE",
            "Coffee · Pastries · Social",
            0xe0bd79
        );


        this.createBuilding(
            430,
            325,
            315,
            225,
            0x344b52,
            0x47656a,
            "MOONVEIL",
            "Boutique",
            0xc4a8d8
        );


        this.createBuilding(
            410,
            1080,
            365,
            255,
            0x414251,
            0x555669,
            "LUNARIS HOUSE",
            "Moonlight Apartments",
            0xd8c49d
        );


        this.createBuilding(
            1530,
            1060,
            340,
            245,
            0x3e5046,
            0x53675b,
            "THE ATELIER",
            "Craft · Create · Enchant",
            0xb6d0b8
        );


        /* ==================================================
           NIGHT MARKET + GROVE
        ================================================== */

        this.createNightMarket();
        this.createGrove();


        /* ==================================================
           STREET LAMPS
        ================================================== */

        const lamps = [

            [650, 560],
            [1210, 560],
            [650, 840],
            [1210, 840],
            [790, 360],
            [1070, 360],
            [790, 1040],
            [1070, 1040],
            [1370, 560],
            [1650, 560],
            [250, 560],
            [500, 560]

        ];


        lamps.forEach(lamp => {

            this.createLamp(
                lamp[0],
                lamp[1]
            );

        });


        /* ==================================================
           BENCHES
        ================================================== */

        this.createBench(700, 650);
        this.createBench(1160, 650);
        this.createBench(700, 755);
        this.createBench(1160, 755);


        /* ==================================================
           FLOWERS
        ================================================== */

        this.createFlowerBed(
            655,
            470,
            170,
            55
        );


        this.createFlowerBed(
            1205,
            470,
            170,
            55
        );


        this.createFlowerBed(
            655,
            930,
            170,
            55
        );


        this.createMagicLights();


        /* ==================================================
           PLAYER
        ================================================== */

        let spawnX = 930;
        let spawnY = 1040;


        if (this.spawnFromCafe) {

            spawnX = 1510;
            spawnY = 500;

        }


        this.player =
            createPlayer(
                this,
                spawnX,
                spawnY
            );


        createControls(this);


        /* ==================================================
           COLLISIONS
        ================================================== */

        this.physics.add.collider(
            this.player,
            this.fountainCollider
        );


        this.buildingColliders.forEach(
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

        this.cameras.main.setBounds(
            0,
            0,
            2000,
            1400
        );


        this.cameras.main.startFollow(
            this.player,
            true,
            0.08,
            0.08
        );


        this.cameras.main.setZoom(1);


        /* ==================================================
           INTERACTIONS
        ================================================== */

        this.interactions = [

            {
                x: 1510,
                y: 485,
                radius: 115,

                text:
                    "Enter Moonlight Cafe",

                action: () => {

                    completeGoal(
                        "goal-cafe"
                    );

                    changeScene(
                        this,
                        "MoonlightCafe"
                    );

                }
            },


            {
                x: 430,
                y: 475,
                radius: 120,

                text:
                    "Visit Moonveil Boutique",

                action: () => {

                    showMessage(
                        "Moonveil's enchanted displays shimmer behind the glass."
                    );

                }
            },


            {
                x: 410,
                y: 915,
                radius: 120,

                text:
                    "Enter Lunaris House",

                action: () => {

                    showMessage(
                        "Player apartments and homes will eventually be accessible here."
                    );

                }
            },


            {
                x: 1530,
                y: 900,
                radius: 120,

                text:
                    "Visit The Atelier",

                action: () => {

                    showMessage(
                        "The Atelier will support crafting, enchanting, and creative professions."
                    );

                }
            },


            {
                x: 930,
                y: 700,
                radius: 155,

                text:
                    "Inspect Moonlight Fountain",

                action: () => {

                    showMessage(
                        "Silver-violet light moves beneath the water as if the fountain is breathing."
                    );

                }
            },


            {
                x: 1370,
                y: 710,
                radius: 180,

                text:
                    "Explore Night Market",

                action: () => {

                    showMessage(
                        "Merchants, player businesses, food stalls, and unusual goods will fill the Night Market."
                    );

                }
            },


            {
                x: 1750,
                y: 1170,
                radius: 175,

                text:
                    "Enter The Grove",

                action: () => {

                    showMessage(
                        "The Grove feels quieter than the rest of Moonlight District. Something magical lives here."
                    );

                }
            }

        ];


        showMessage(
            "Moonlight District · After Dusk"
        );

    }


    /* ======================================================
       BUILDING
    ====================================================== */

    createBuilding(
        x,
        y,
        width,
        height,
        wallColor,
        trimColor,
        name,
        subtitle,
        glowColor
    ) {

        this.add.rectangle(
            x + 12,
            y + 15,
            width,
            height,
            0x000000,
            0.25
        ).setDepth(3);


        this.add.rectangle(
            x,
            y,
            width,
            height,
            wallColor
        )
        .setStrokeStyle(
            5,
            trimColor,
            0.95
        )
        .setDepth(4);


        this.add.rectangle(
            x,
            y - height / 2 + 18,
            width + 18,
            42,
            trimColor
        ).setDepth(5);


        this.add.rectangle(
            x,
            y - 20,
            width * 0.72,
            54,
            0x171923,
            0.92
        )
        .setStrokeStyle(
            2,
            glowColor,
            0.65
        )
        .setDepth(6);


        this.add.text(
            x,
            y - 30,
            name,
            {
                fontFamily: "Georgia, serif",
                fontSize: "18px",
                color: "#f6efe5"
            }
        )
        .setOrigin(0.5)
        .setDepth(7);


        this.add.text(
            x,
            y - 7,
            subtitle,
            {
                fontFamily: "Georgia, serif",
                fontSize: "10px",
                color: "#c9c1ca"
            }
        )
        .setOrigin(0.5)
        .setDepth(7);


        const windowY = y + 55;
        const windowSpacing = width / 4;


        for (let i = -1; i <= 1; i++) {

            const windowX =
                x + i * windowSpacing;


            this.add.rectangle(
                windowX,
                windowY,
                60,
                62,
                glowColor,
                0.10
            ).setDepth(5);


            this.add.rectangle(
                windowX,
                windowY,
                45,
                50,
                0x27283b
            )
            .setStrokeStyle(
                3,
                glowColor,
                0.70
            )
            .setDepth(6);


            this.add.rectangle(
                windowX,
                windowY,
                34,
                39,
                glowColor,
                0.30
            ).setDepth(6);

        }


        const doorY =
            y + height / 2 + 5;


        this.add.rectangle(
            x,
            doorY,
            68,
            24,
            glowColor,
            0.20
        ).setDepth(5);


        this.add.rectangle(
            x,
            doorY,
            50,
            20,
            glowColor
        ).setDepth(6);


        const collider =
            this.add.zone(
                x,
                y,
                width,
                height
            );


        this.physics.add.existing(
            collider,
            true
        );


        this.buildingColliders.push(
            collider
        );

    }


    /* ======================================================
       STREET LAMP
    ====================================================== */

    createLamp(x, y) {

        this.add.circle(
            x,
            y - 35,
            48,
            0xf1d28e,
            0.08
        ).setDepth(4);


        this.add.rectangle(
            x,
            y,
            7,
            75,
            0x24242b
        ).setDepth(5);


        this.add.rectangle(
            x,
            y - 42,
            22,
            28,
            0x332d31
        )
        .setStrokeStyle(
            2,
            0xd6ba7c,
            0.7
        )
        .setDepth(6);


        this.add.circle(
            x,
            y - 42,
            7,
            0xf4d993,
            0.95
        ).setDepth(7);

    }


    /* ======================================================
       BENCH
    ====================================================== */

    createBench(x, y) {

        this.add.rectangle(
            x,
            y,
            85,
            18,
            0x5d4b43
        )
        .setStrokeStyle(
            2,
            0x8b7160,
            0.8
        )
        .setDepth(5);


        this.add.rectangle(
            x - 30,
            y + 15,
            6,
            25,
            0x302b2b
        ).setDepth(4);


        this.add.rectangle(
            x + 30,
            y + 15,
            6,
            25,
            0x302b2b
        ).setDepth(4);

    }


    /* ======================================================
       FLOWER BED
    ====================================================== */

    createFlowerBed(
        x,
        y,
        width,
        height
    ) {

        this.add.rectangle(
            x,
            y,
            width,
            height,
            0x34483c
        )
        .setStrokeStyle(
            2,
            0x53695a,
            0.7
        )
        .setDepth(4);


        const flowers = [
            0xc8a9d8,
            0xd8bdcf,
            0xb8c9a9,
            0xe0c894
        ];


        for (let i = 0; i < 12; i++) {

            const flowerX =
                x -
                width / 2 +
                12 +
                Math.random() *
                (width - 24);


            const flowerY =
                y -
                height / 2 +
                10 +
                Math.random() *
                (height - 20);


            const flowerColor =
                Phaser.Utils.Array.GetRandom(
                    flowers
                );


            this.add.circle(
                flowerX,
                flowerY,
                4,
                flowerColor,
                0.85
            ).setDepth(5);

        }

    }


    /* ======================================================
       NIGHT MARKET
    ====================================================== */

    createNightMarket() {

        this.add.text(
            1370,
            610,
            "NIGHT MARKET",
            {
                fontFamily: "Georgia, serif",
                fontSize: "17px",
                color: "#e4cf9d"
            }
        )
        .setOrigin(0.5)
        .setDepth(7);


        const stalls = [

            [1280, 680, 0x6d4c5f],
            [1380, 680, 0x53614d],
            [1480, 680, 0x5e4e70],
            [1280, 770, 0x4b5f66],
            [1380, 770, 0x765b49],
            [1480, 770, 0x4f5f50]

        ];


        stalls.forEach(stall => {

            this.add.rectangle(
                stall[0],
                stall[1],
                78,
                52,
                stall[2]
            )
            .setStrokeStyle(
                2,
                0xd6ba7c,
                0.45
            )
            .setDepth(5);


            this.add.rectangle(
                stall[0],
                stall[1] - 31,
                90,
                18,
                0x282833
            ).setDepth(6);


            this.add.circle(
                stall[0],
                stall[1] - 38,
                6,
                0xf0d18b
            ).setDepth(7);

        });

    }


    /* ======================================================
       GROVE
    ====================================================== */

    createGrove() {

        this.add.circle(
            1740,
            1160,
            220,
            0x1f3329,
            0.85
        ).setDepth(2);


        this.add.text(
            1740,
            1040,
            "THE GROVE",
            {
                fontFamily: "Georgia, serif",
                fontSize: "18px",
                color: "#c8d8c7"
            }
        )
        .setOrigin(0.5)
        .setDepth(7);


        const trees = [

            [1600, 1100],
            [1660, 1180],
            [1710, 1090],
            [1780, 1160],
            [1850, 1090],
            [1900, 1180],
            [1660, 1280],
            [1760, 1270],
            [1860, 1270]

        ];


        trees.forEach(tree => {

            this.add.ellipse(
                tree[0],
                tree[1] + 22,
                70,
                28,
                0x000000,
                0.22
            ).setDepth(3);


            this.add.rectangle(
                tree[0],
                tree[1] + 12,
                13,
                48,
                0x57443a
            ).setDepth(4);


            this.add.circle(
                tree[0],
                tree[1] - 10,
                38,
                0x3f604d
            ).setDepth(5);


            this.add.circle(
                tree[0] - 20,
                tree[1],
                25,
                0x52705b
            ).setDepth(5);


            this.add.circle(
                tree[0] + 18,
                tree[1] - 2,
                27,
                0x4b6954
            ).setDepth(5);

        });

    }


    /* ======================================================
       MAGIC LIGHTS
    ====================================================== */

    createMagicLights() {

        for (let i = 0; i < 35; i++) {

            const x =
                Phaser.Math.Between(
                    180,
                    1850
                );


            const y =
                Phaser.Math.Between(
                    180,
                    1280
                );


            const light =
                this.add.circle(
                    x,
                    y,
                    Phaser.Math.Between(
                        2,
                        4
                    ),
                    0xd7c2ee,
                    Phaser.Math.FloatBetween(
                        0.18,
                        0.55
                    )
                )
                .setDepth(8);


            this.tweens.add({

                targets: light,

                alpha: {
                    from: 0.12,
                    to: 0.75
                },

                duration:
                    Phaser.Math.Between(
                        1200,
                        3000
                    ),

                yoyo: true,
                repeat: -1,

                delay:
                    Phaser.Math.Between(
                        0,
                        1500
                    )

            });

        }

    }


    /* ======================================================
       UPDATE
    ====================================================== */

    update() {

        updatePlayer(this);

        checkInteractions(this);

    }

}
