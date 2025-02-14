const buildingArea = document.getElementById("building-area");
const finalMessage = document.getElementById("final-message");
const guidanceText = document.getElementById("guidance");
const musicButton = document.getElementById("music-button");
const loveMusic = document.getElementById("love-music");

let placedPieces = 0;
const steps = ["foundation", "wall1", "wall2", "roof"];
const relationshipSteps = [
    "Step 1: Lay the Foundation (Friendship)\n" +
    "Every great structure starts with a strong foundation—just like our love, sweetie. Before anything else, we built a bond crafted with laughter, patience, and care our MYSTERY 🥰.",

    "Step 2: Add the First Wall (Trust)\n" +
    "A home isn’t complete without walls, just as love isn’t complete without trust. This wall stands tall, holding us together with unwavering belief and understanding.",

    "Step 3: Add the Second Wall (Strength)\n" +
    "Strength is the courage to chase dreams together, lift each other in doubt, and weather every storm hand in hand. This wall makes our love unshakable.",

    "Step 4: Place the Roof (Love)\n" +
    "Love is the roof that shelters us, keeping us safe and warm. Under this roof, we don’t just exist—we belong. Will you stay under this roof with me, forever?💚 "
];

// Show all pieces from the start
steps.forEach(id => document.getElementById(id).style.display = "block");

// Make all pieces draggable anytime
document.querySelectorAll(".draggable").forEach(piece => {
    piece.addEventListener("mousedown", startDrag);
    piece.addEventListener("touchstart", startDrag);
});

function startDrag(e) {
    let draggedElement = e.target;

    draggedElement.style.position = "absolute";
    draggedElement.style.zIndex = 1000;

    function moveElement(event) {
        let x = event.clientX || event.touches[0].clientX;
        let y = event.clientY || event.touches[0].clientY;

        draggedElement.style.left = `${x - draggedElement.offsetWidth / 2}px`;
        draggedElement.style.top = `${y - draggedElement.offsetHeight / 2}px`;
    }

    function stopDrag() {
        let rect = draggedElement.getBoundingClientRect();
        let areaRect = buildingArea.getBoundingClientRect();

        if (rect.left >= areaRect.left && rect.right <= areaRect.right && rect.top >= areaRect.top && rect.bottom <= areaRect.bottom) {
            if (!draggedElement.dataset.placed) {
                draggedElement.dataset.placed = "true";
                placedPieces++;

                if (placedPieces < steps.length) {
                    guidanceText.textContent = relationshipSteps[placedPieces];
                } else {
                    setTimeout(() => {
                        finalMessage.classList.remove("hidden");
                        finalMessage.style.display = "block";
                        setTimeout(() => {
                            finalMessage.style.opacity = "1";
                            finalMessage.style.transform = "scale(1)";
                        }, 100);
                        startPetalAnimation();
                        setTimeout(showQuestionWindow, 3000);
                    }, 500);
                }
            }
        }

        document.removeEventListener("mousemove", moveElement);
        document.removeEventListener("mouseup", stopDrag);
    }

    document.addEventListener("mousemove", moveElement);
    document.addEventListener("mouseup", stopDrag);
}

// Create a falling petal
function createPetal() {
    const petal = document.createElement("div");
    petal.classList.add("petal");

    petal.style.left = Math.random() * window.innerWidth + "px";
    petal.style.animationDuration = (Math.random() * 3 + 2) + "s";

    document.body.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, 5000);
}

// Start petals animation
function startPetalAnimation() {
    setInterval(createPetal, 300);
}

// Show question window
function showQuestionWindow() {
    const questionWindow = document.getElementById("question-window");
    questionWindow.classList.remove("hidden");
    questionWindow.style.display = "block";
}

// "Yes" button action (directly plays music)
// "Yes" button action (plays music & opens PPT)
// "Yes" button action (plays music & opens PPT in slideshow mode)
document.getElementById("yes-button").addEventListener("click", function() {
    loveMusic.play(); // Play love music
    window.open("https://paruluniversityacin-my.sharepoint.com/:p:/g/personal/2303051240332_paruluniversity_ac_in/EWobR8_wKd5PrMP2zR6X5KMBzIoZ03mb6ADLNXmoQjGjPg?e=MaTcGC", "_blank"); // Open PPT in slideshow mode
});

// "No" button moves randomly
document.getElementById("no-button").addEventListener("mouseover", function() {
    let x = Math.random() * 200 - 100;
    let y = Math.random() * 100 - 50;
    this.style.transform = `translate(${x}px, ${y}px) scale(1.1)`;
});

document.getElementById("no-button").addEventListener("mouseout", function() {
    this.style.transform = "";
});

document.getElementById("no-button").addEventListener("click", function() {
    this.style.transform = `translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px)`;
    setTimeout(() => {
        this.style.transform = "";
    }, 500);
});

// Music toggle button
musicButton.addEventListener("click", function() {
    if (loveMusic.paused) {
        loveMusic.play();
        musicButton.textContent = "🔇 Music Off";
    } else {
        loveMusic.pause();
        musicButton.textContent = "🎵 Music";
    }
});

// "Let's Go" button (moves to blueprint page)
document.getElementById("lets-go-button").addEventListener("click", function() {
    document.getElementById("intro-page").style.display = "none";
    document.getElementById("blueprint-page").style.display = "block"; // Show blueprint page
});
