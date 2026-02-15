const video = document.querySelector("#giftVideo");
const startBtn = document.querySelector("#startBtn");
const loading = document.querySelector("#loading");
const sceneEl = document.querySelector("a-scene");

// NEW VIDEO ID INTEGRATION
const fileID = "14p_-ILD77zQljr4hERJtwfRZrYwd7SUB";

// Cache buster ensures the customer doesn't see the old video
video.src = `https://drive.google.com/uc?export=download&id=${fileID}&v=${new Date().getTime()}`;

startBtn.addEventListener('click', () => {
    startBtn.style.display = "none";
    loading.style.display = "block";

    // Start video and AR system
    video.play().then(() => {
        video.muted = false;
        sceneEl.systems["mindar-image-system"].start(); // Start camera
        document.querySelector("#overlay").classList.add("hidden");
    }).catch((err) => {
        console.error("Video play failed:", err);
        alert("Please ensure camera permissions are allowed.");
    });
});