/* ==========================================================
   EVERWYN ONLINE
   INTERACTION + HUD SYSTEM
========================================================== */

let currentScene = null;

let notificationTimer = null;


/* ==========================================================
   HUD ELEMENTS
========================================================== */

const interactionPrompt =
    document.getElementById("interaction-prompt");

const interactionText =
    document.getElementById("interaction-text");

const notification =
    document.getElementById("notification");

const locationName =
    document.getElementById("location-name");

const locationSubtitle =
    document.getElementById("location-subtitle");

const emergencyReturn =
    document.getElementById("emergency-return");


/* ==========================================================
   LOCATION HUD
========================================================== */

function setLocation(name, subtitle) {

    if (locationName) {
        locationName.textContent = name;
    }

    if (locationSubtitle) {
        locationSubtitle.textContent = subtitle;
    }

}


/* ==========================================================
   INTERACTION PROMPT
========================================================== */

function showPrompt(text) {

    if (!interactionPrompt) {
        return;
    }

    if (interactionText) {
        interactionText.textContent = text;
    }

    interactionPrompt.style.display = "flex";

}


function hidePrompt() {

    if (!interactionPrompt) {
        return;
    }

    interactionPrompt.style.display = "none";

}


/* ==========================================================
   NOTIFICATIONS
========================================================== */

function showMessage(message) {

    if (!notification) {
        return;
    }

    notification.textContent = message;

    notification.classList.add("show");


    if (notificationTimer) {
        clearTimeout(notificationTimer);
    }


    notificationTimer =
        setTimeout(
            () => {

                notification.classList.remove("show");

            },
            2600
        );

}


/* ==========================================================
   GOALS
========================================================== */

function completeGoal(goalId) {

    const goal =
        document.getElementById(goalId);


    if (!goal) {
        return;
    }


    goal.classList.add("complete");


    if (
        goal.textContent.trim().startsWith("◇")
    ) {

        goal.textContent =
            goal.textContent.replace(
                "◇",
                "◆"
            );

    }

}


/* ==========================================================
   SCENE CHANGING
========================================================== */

function changeScene(
    scene,
    sceneName,
    data = {}
) {

    if (
        !scene ||
        scene.transitioning
    ) {
        return;
    }


    scene.transitioning = true;

    hidePrompt();


    scene.cameras.main.fadeOut(
        250,
        10,
        10,
        18
    );


    scene.time.delayedCall(
        280,
        () => {

            scene.scene.start(
                sceneName,
                data
            );

        }
    );

}


/* ==========================================================
   INTERACTION CHECKER
========================================================== */

function checkInteractions(scene) {

    if (
        !scene.player ||
        !scene.interactions
    ) {

        hidePrompt();

        return;

    }


    let nearestInteraction = null;

    let nearestDistance = Infinity;


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
                distance <= interaction.radius &&
                distance < nearestDistance
            ) {

                nearestInteraction =
                    interaction;

                nearestDistance =
                    distance;

            }

        }
    );


    if (!nearestInteraction) {

        hidePrompt();

        return;

    }


    showPrompt(
        nearestInteraction.text
    );


    if (
        Phaser.Input.Keyboard.JustDown(
            scene.keys.interact
        )
    ) {

        nearestInteraction.action();

    }

}


/* ==========================================================
   EMERGENCY RETURN BUTTON

   Useful while we're developing interiors.
========================================================== */

if (emergencyReturn) {

    emergencyReturn.addEventListener(
        "click",
        () => {

            if (!currentScene) {
                return;
            }


            hidePrompt();


            currentScene.scene.start(
                "MoonlightDistrict",
                {
                    fromCafe: true
                }
            );

        }
    );

}
