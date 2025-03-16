// script.js
function slowPrint(text, delay = 1) {
    return new Promise((resolve) => {
        const storyOutput = document.getElementById('story-output');
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                storyOutput.innerHTML += text[i];
                storyOutput.scrollTop = storyOutput.scrollHeight; // Auto-scroll
                i++;
            } else {
                clearInterval(interval);
                storyOutput.innerHTML += '<br>'; // New line after text is printed
                storyOutput.scrollTop = storyOutput.scrollHeight; // Auto-scroll
                resolve();
            }
        }, delay);
    });
}

function getPlayerChoice(options) {
    return new Promise((resolve) => {
        const choicesContainer = document.getElementById('choices-container');
        choicesContainer.innerHTML = ''; // Clear previous choices

        options.forEach((option, index) => {
            const button = document.createElement('button');
            button.classList.add('choice-button');
            button.textContent = option;
            button.addEventListener('click', () => {
                // Disable all buttons after one is clicked
                const allButtons = choicesContainer.querySelectorAll('.choice-button');
                allButtons.forEach(btn => {
                    btn.disabled = true;
                    btn.style.opacity = '0.5'; // Reduce opacity to indicate disabled state
                    btn.style.cursor = 'default'; // Change cursor to default
                });
                resolve(index);
            });
            choicesContainer.appendChild(button);
        });
    });
}

// Function to wait for a key press (or any click)
function waitForContinue() {
    return new Promise((resolve) => {
        const storyOutput = document.getElementById('story-output');
        const choicesContainer = document.getElementById('choices-container');
        const continueMessage = document.createElement('p');
        continueMessage.textContent = "Press any key or click to continue...";
        continueMessage.style.fontWeight = "bold";
        continueMessage.style.marginTop = "10px";
        storyOutput.appendChild(continueMessage);

        const handleContinue = () => {
            document.removeEventListener('keydown', handleContinue);
            document.removeEventListener('click', handleContinue);
            storyOutput.removeChild(continueMessage);
            choicesContainer.innerHTML = ''; // Clear choices when continuing
            resolve();
        };

        document.addEventListener('keydown', handleContinue);
        document.addEventListener('click', handleContinue);
    });
}

const backgroundImages = [
    "url('Day1.png')",  // Image file paths as strings
    "url('Day2.png')",
    "url('Day3.png')",
    "url('Day4.png')",
    "url('Day3.png')", 
    "url('Day6.png')",
    "url('Day7.png')",
    "url('Day8.png')",
    "url('Day9.png')",
    "url('Day10.png')"
];

// Function to change the background image
function changeBackgroundImage(dayNumber) {
    const body = document.body;
    if (dayNumber >= 1 && dayNumber <= backgroundImages.length) {
        body.style.backgroundImage = backgroundImages[dayNumber - 1];
        //body.style.backgroundSize = "cover"; // Ensure the image covers the whole background
        body.style.backgroundPosition = "center"; // Center the image
        body.style.backgroundRepeat = "no-repeat";
        body.style.backgroundAttachment = "fixed"; // Optional: keep the background fixed while scrollingback
        body.style.backgroundSize = " 2000px";
        body.style.backgroundBorderradius = "20px";
    } else {
        // Default background if no image for the day
        body.style.backgroundImage = "none";
        body.style.backgroundColor = "black";
    }
}

async function dayStart(dayNumber) {
    // Clear the story output at the start of each day
    document.getElementById('story-output').innerHTML = '';

    // Change the background image at the start of each day
    changeBackgroundImage(dayNumber);

    await slowPrint(`--- Day ${dayNumber} ---`);

    if (dayNumber === 1) {
        await slowPrint(
            "You wake up in your small apartment. The morning light filters through the blinds. It's a familiar routine, but a sense of unease hangs in the air."
        );
        await slowPrint(
            "You've been struggling to make ends meet lately. Your job barely covers the bills, and the rent keeps going up. You're worried about the future."
        );
        await slowPrint(`Lucky, your loyal dog, nudges your hand, seeking attention. He's your best friend and the only family you have.`);

        // Day 1 Choices
        await slowPrint("What do you do first?");
        const options = [
            "Check your bank account.",
            "Go for a walk with Lucky.",
            "Start preparing for work.",
        ];
        const choice = await getPlayerChoice(options);

        if (choice === 0) {
            await slowPrint("You check your bank account. It's even lower than you expected. Panic starts to set in.");
        } else if (choice === 1) {
            await slowPrint("You decide to take Lucky for a walk. The fresh air helps clear your head, but the financial worries remain.");
        } else {
            await slowPrint("You start preparing for work, trying to push your worries aside. You hope today will be a good day.");
        }
    } else if (dayNumber === 2) {
        await slowPrint(
            "You open the mail and your heart sinks. Another notice. The rent is going up again, and this time, you know you can't afford it."
        );
        await slowPrint(
            "Panic sets in. You try to think of a solution, but there's nothing you can do. You're going to lose your home."
        );

        // Day 2 Choices
        await slowPrint("What do you do?");
        const options = [
            "Try to negotiate with the landlord.",
            "Start packing your belongings.",
            "Look for a new place to live.",
        ];
        const choice = await getPlayerChoice(options);

        if (choice === 0) {
            await slowPrint("You call your landlord, but they are unwilling to negotiate. They need the money.");
        } else if (choice === 1) {
            await slowPrint("You start packing your belongings. It's a painful process, but you know you have to be prepared.");
        } else {
            await slowPrint("You start looking for a new place to live, but everything is too expensive. You feel hopeless.");
        }
        await slowPrint("You pack what little you can carry. The apartment, once a safe haven, now feels like a trap. You take one last look around, tears welling up in your eyes.");
        await slowPrint("Lucky senses your distress and stays close to you, his tail tucked between his legs.");
        await slowPrint("You step out of the apartment, the door closing behind you with a finality that chills you to the bone. You are now homeless.");
    } else if (dayNumber === 3) {
        await slowPrint(
            "You managed to keep your car, and it's become your new home. It's cramped, but it's better than nothing. You park it in a quiet spot each night."
        );
        await slowPrint(`Lucky seems to like the car. He curls up on the passenger seat.`);
        // Day 3 Choices
        await slowPrint("What do you do today?");
        const options = [
            "Try to find a job.",
            "Spend the day looking for food.",
            "Try to find a safe place to park for tonight.",
        ];
        const choice = await getPlayerChoice(options);

        if (choice === 0) {
            await slowPrint("You try to find a job, but no one is hiring. You feel hopeless.");
        } else if (choice === 1) {
            await slowPrint("You spend the day looking for food. You manage to find some scraps, but it's not much.");
        } else {
            await slowPrint("You spend the day looking for a safe place to park. You find a quiet alley, but you don't feel safe.");
        }
    } else if (dayNumber === 4) {
        await slowPrint("You wake up to a loud banging on your car window. It's a police officer.");
        await slowPrint("They tell you that you can't park here overnight and that you need to move your car.");
        await slowPrint("You try to explain your situation, but they don't care. They tell you to move it or they will tow it.");
        await slowPrint("You start the car, but it sputters and dies. You try again, but it won't start.");
        await slowPrint("The officer sighs and calls a tow truck. You watch helplessly as your car, your home, is taken away.");
        await slowPrint("You are now homeless and carless.");
        await slowPrint(`Lucky whimpers, sensing your distress.`);

        // Day 4 Choices - New Options
        await slowPrint("With your car gone, what's your priority today?");
        const options = [
            "Find a place to sleep tonight.",
            "Try to find a way to get some money.",
            "Search for a place where you can get help.",
        ];
        const choice = await getPlayerChoice(options);

        if (choice === 0) {
            await slowPrint("You decide that finding shelter is the most important thing right now. You start looking for a safe place to sleep tonight.");
        } else if (choice === 1) {
            await slowPrint("You decide that you need money to survive. You start thinking about ways you could earn some.");
        } else {
            await slowPrint("You realize you can't do this alone. You start looking for places where you might be able to get some help.");
        }
    } else {

        // Day 5
        if (dayNumber === 5) {
            // Day 5 Choices
            await slowPrint("What do you do today?");
            const options = [
                "Try to find food.",
                "Try to find shelter.",
                "Try to find help.",
            ];
            const choice = await getPlayerChoice(options);

            if (choice === 0) {
                await slowPrint("You spend the day looking for food. You manage to find some scraps, but it's not much.");
                if (Math.random() < 0.4) {
                    await slowPrint("Unfortunately, the food was bad. You and Lucky feel sick.");
                }
            } else if (choice === 1) {
                await slowPrint("You spend the day looking for a safe place to sleep. You find a quiet alley, but you don't feel safe.");
                if (Math.random() < 0.3) {
                    await slowPrint(
                        "You are woken up by the police and told to move along. Lucky whimpers as you are forced to leave."
                    );
                }
            } else {
                await slowPrint("You spend the day looking for help. You ask people for help, but they ignore you.");
                if (Math.random() < 0.6) {
                    await slowPrint("A man yells at you to get a job. You feel ashamed and Lucky barks at him.");
                }
            }
        }
        //Day 6
        if (dayNumber === 6) {
            await slowPrint("You and Lucky are incredibly hungry. You haven't eaten a proper meal in days.");
            await slowPrint("You see a bakery with fresh bread in the window. The smell is intoxicating.");

            // Day 6 Choices
            await slowPrint("What do you do?");
            const options = [
                "Try to steal some bread from the bakery.",
                "Beg for food outside the bakery.",
                "Keep searching for scraps in the trash.",
            ];
            const choice = await getPlayerChoice(options);

            if (choice === 0) {
                await slowPrint("You decide to try to steal some bread. You sneak into the bakery when the baker isn't looking.");
                if (Math.random() < 0.5) {
                    await slowPrint("You manage to grab a loaf of bread and escape! You and Lucky eat it quickly.");
                } else {
                    await slowPrint("The baker sees you! He yells and chases you out of the bakery. You didn't get any bread.");
                }
            } else if (choice === 1) {
                await slowPrint("You stand outside the bakery, begging for food. Most people ignore you.");
                if (Math.random() < 0.3) {
                    await slowPrint("A kind woman comes out and gives you a small loaf of bread. You and Lucky share it gratefully.");
                } else {
                    await slowPrint("No one gives you any food. You and Lucky remain hungry.");
                }
            } else {
                await slowPrint("You continue searching for scraps in the trash. It's disgusting, but you're desperate.");
                if (Math.random() < 0.7) {
                    await slowPrint("You find a half-eaten sandwich. It's not much, but it's something. You and Lucky share it.");
                    if (Math.random() < 0.4) {
                        await slowPrint("Unfortunately, the sandwich was bad. You and Lucky feel sick.");
                    }
                } else {
                    await slowPrint("You find nothing edible. You and Lucky remain hungry.");
                }
            }
        }
        //Day 7
        if (dayNumber === 7) {
            await slowPrint("You wake up and notice that Lucky is acting strange. He's lethargic and doesn't seem interested in food.");
            await slowPrint("He's also panting heavily and seems to be in pain.");
            await slowPrint("You realize that Lucky is very sick. You feel a surge of panic.");
            // Day 7 Choices
            await slowPrint("What do you do?");
            const options = [
                "Try to find a vet.",
                "Try to find food for Lucky.",
                "Try to find a safe place to rest.",
            ];
            const choice = await getPlayerChoice(options);

            if (choice === 0) {
                await slowPrint("You decide that Lucky needs professional help. You start desperately searching for a vet.");
            } else if (choice === 1) {
                await slowPrint("You think that maybe Lucky just needs food. You start looking for something he might eat.");
            } else {
                await slowPrint("You think that maybe Lucky just needs rest. You start looking for a safe place to rest.");
            }
        }
        //Day 8
        if (dayNumber === 8) {
            await slowPrint("You wake up to find Lucky lying still beside you. He's not breathing.");
            await slowPrint("You try to shake him awake, but he doesn't respond. His body is cold.");
            await slowPrint("Your heart shatters. Lucky, your loyal companion, your best friend, is gone.");
            await slowPrint("You bury Lucky in a quiet spot in the park, tears streaming down your face.");
            await slowPrint("You are truly alone now.");
        }


        if (dayNumber === 9) {
            await slowPrint("Another day begins, but the world feels different now. Empty.");
            await slowPrint("The spot where Lucky used to sleep is cold and vacant. The silence is deafening.");
            await slowPrint("You feel a heavy weight in your chest, a constant ache that won't go away.");
            await slowPrint("The energy you once had is gone, replaced by a deep, gnawing emptiness.");
            await slowPrint("Everywhere you look, you see reminders of Lucky. A familiar path, a favorite spot, a shared meal.");
            await slowPrint("The memories are both comforting and agonizing. You miss him more than words can express.");

            // Day 9 Choices
            await slowPrint("What do you do today?");
            const options = [
                "Try to find a way to honor Lucky's memory.",
                "Just try to get through the day.",
                "Give up.",
            ];
            const choice = await getPlayerChoice(options);

            if (choice === 0) {
                await slowPrint("You decide to do something to honor Lucky's memory. You try to find a way to make his memory live on.");
                if (Math.random() < 0.5) {
                    await slowPrint("You find a small, smooth stone and carve Lucky's name into it. You place it where you buried him.");
                } else {
                    await slowPrint("You spend the day trying to find a way to honor Lucky, but nothing feels right.");
                }
            } else if (choice === 1) {
                await slowPrint("You decide that the best you can do is just try to get through the day. You try to push the pain aside and focus on survival.");
                if (Math.random() < 0.3) {
                    await slowPrint("You find yourself crying uncontrollably. You miss Lucky so much.");
                } else {
                    await slowPrint("You manage to get through the day, but the pain is still there.");
                }
            } else {
                await slowPrint("The weight of your loss is too much to bear. You feel like giving up.");
                if (Math.random() < 0.7) {
                    await slowPrint("You sit down and cry. You dont move for hours.");
                } else {
                    await slowPrint("You decide to keep going. You know Lucky would want you to.");
                }
            }
        }


        if (dayNumber === 10) {
                await slowPrint("You wake up shivering. The cold has seeped into your bones, and you feel weaker than ever.");
                await slowPrint("Your stomach is gnawing with hunger, a constant reminder of the days you've gone without food.");
                await slowPrint("You try to stand, but your legs feel like lead. Your vision blurs, and you stumble.");
                await slowPrint("The world around you fades in and out. You see flashes of Lucky, his happy face, his wagging tail.");
                await slowPrint("A wave of exhaustion washes over you. You can't fight it anymore.");
                await slowPrint("You close your eyes, and everything goes dark. You are gone.");
        }

    }
}

async function dayEnd(dayNumber) {
    await slowPrint(`--- End of Day ${dayNumber} ---`);
    if (dayNumber <= 2) {
        await slowPrint(
            "As the day ends, you try to find a place to rest. You reflect on the day's events."
        );
        if (dayNumber === 1) {
            await slowPrint(`Lucky curls up at the foot of your bed, his presence a small comfort.`);
        } else {
            await slowPrint(`Lucky snuggles close to you, seeking warmth.`);
        }
    } else if (dayNumber === 3) {
        await slowPrint(
            "As the sun sets, you park your car in a quiet spot. You reflect on the day's events."
        );
        await slowPrint(`Lucky snuggles close to you, seeking warmth.`);
    } else if (dayNumber < 8){
        await slowPrint(
            "As the sun sets, you find a place to rest for the night. You reflect on the day's events."
        );
        await slowPrint(`Lucky snuggles close to you, seeking warmth.`);
    } else {

    }
}



async function main() {
    await slowPrint("Welcome to 'The Streets,' a story about the harsh realities of life.");
    await slowPrint(
        "Your choices will shape your experience, but there are no right or wrong answers. This is about survival, loss, and the human spirit."
    );
    changeBackgroundImage(1);

    const numDays = 10; // Changed to 10 days
    for (let day = 1; day <= numDays; day++) {
        await waitForContinue(); // Break before the day
        await dayStart(day);
        if (day === 10) {
            await waitForContinue();
        }
        await dayEnd(day);
    }

    await slowPrint("\n--- Epilogue ---");
    await slowPrint("Thank you for experiencing 'Rent is overrated'");
}



main();
