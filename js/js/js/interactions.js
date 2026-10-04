/* ==========================================================
   EVERWYN ONLINE
   INTERACTION SYSTEM
========================================================== */


/* ==========================================================
   UI REFERENCES
========================================================== */

const interactionPrompt =
    document.getElementById(
        "interaction-prompt"
    );

const interactionText =
    document.getElementById(
        "interaction-text"
    );

const locationName =
    document.getElementById(
        "location-name"
    );

const locationSubtitle =
    document.getElementById(
        "location-subtitle"
    );

const emergencyReturn =
    document.getElementById(
        "emergency-return"
    );


let notificationTimer;

let currentScene = null;


/* ==========================================================
   NOTIFICATIONS
========================================================== */

function showMessage(message) {

    const notification =
        document.getElementById(
            "notification"
        );


    if (!notification) {
        return;
    }


    notification.textContent =
        message;


    notification.classList.add(
        "show"
    );


    clearTimeout(
        notificationTimer
    );


    notificationTimer =
        setTimeout(
            () => {

                notification.classList.remove(
                    "show"
                );

            },
            2600
        );
}


/* ==========================================================
   INTERACTION PROMPT
========================================================== */

function showPrompt(text) {

    if (
        !interactionPrompt ||
        !interactionText
    ) {
        return;
    }


    interactionText.textContent =
        text;


    interactionPrompt.style.display =
        "flex";
}


function hidePrompt() {

    if (!interactionPrompt) {
        return;
    }


    interactionPrompt.style.display =
        "none";
}


/* ==========================================================
   LOCATION HUD
========================================================== */

function setLocation(
    name,
    subtitle
) {

    if (locationName) {

        locationName.textContent =
            name;

    }


    if (locationSubtitle) {

        locationSubtitle.textContent =
            subtitle;

    }
}


/* ==========================================================
   GOALS
========================================================== */

function completeGoal(id) {

    const element =
        document.getElementById(
            id
        );


    if (!element) {
        return;
    }


    if (
        element.classList.contains(
            "complete"
        )
    ) {
        return;
    }


    element.classList.add(
        "complete"
    );


    element.textContent =
        "✓ " +
        element.textContent.replace(
            "◇ ",
            ""
        );
}


/* ==========================================================
   SCENE CHANGING
========================================================== */

function changeScene(
    scene,
    targetScene,
    data = {}
) {

    if (
        !scene ||
        scene.transitioning
    ) {
        return;
    }


    scene.transitioning =
        true;


    hidePrompt();


    /*
        Stop Yanola before changing maps.
    */

    if (
        scene.player &&
        scene.player.body
    ) {

        scene.player.body.setVelocity(
            0,
            0
        );

    }


    /*
        IMPORTANT:

        We intentionally switch scenes
        directly.

        Do NOT add camera fade transitions
        here yet.

        The previous fade system caused
        Moonlight Cafe to remain covered
        by a dark screen.
    */

    scene.scene.start(
        targetScene,
        data
    );
}


/* ==========================================================
   INTERACTION DETECTION
========================================================== */

function checkInteractions(scene) {

    if (
        !scene ||
        !scene.player ||
        !scene.interactions ||
        scene.transitioning
    ) {

        hidePrompt();

        return;

    }


    let nearest =
        null;


    let nearestDistance =
        Infinity;


    scene.interactions.forEach(
        interaction => {

            const distance =
                Phaser.Math.Distance.Between(
                    scene.player.x,
                    scene.player.y,
                    interaction.x,
                    interaction.y
                );


            if (
                distance <
                    interaction.radius &&
                distance <
                    nearestDistance
            ) {

                nearest =
                    interaction;


                nearestDistance =
                    distance;

            }

        }
    );


    /*
        Nothing nearby.
    */

    if (!nearest) {

        hidePrompt();

        return;

    }


    /*
        Show interaction prompt.
    */

    showPrompt(
        nearest.text
    );


    /*
        Perform interaction when
        player presses E.
    */

    if (
        scene.keys &&
        scene.keys.interact &&
        Phaser.Input.Keyboard.JustDown(
            scene.keys.interact
        )
    ) {

        nearest.action();

    }
}


/* ==========================================================
   DEVELOPMENT RETURN BUTTON
========================================================== */

if (emergencyReturn) {

    emergencyReturn.addEventListener(
        "click",
        () => {

            if (!currentScene) {
                return;
            }


            /*
                Already outside.
            */

            if (
                currentScene.scene.key ===
                "MoonlightDistrict"
            ) {

                return;

            }


            hidePrompt();


            /*
                Return Yanola to the district
                outside Moonlight Cafe.
            */

            currentScene.scene.start(
                "MoonlightDistrict",
                {
                    fromCafe:
                        true
                }
            );

        }
    );

}
