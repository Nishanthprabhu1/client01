const video = document.querySelector("#giftVideo");
const startBtn = document.querySelector("#startBtn");
const loading = document.querySelector("#loading");
const sceneEl = document.querySelector("a-scene");

// Use your latest low-KB video ID
const fileID = "1N5YusQQxjOi6PJ_Iip808lUGtv_uh6nu";
video.src = `https://drive.google.com/uc?export=download&id=${fileID}`;

startBtn.addEventListener('click', () => {
    // Show loading text
    startBtn.style.display = "none";
    loading.style.display = "block";

    // 1. Force the AR System to start (This triggers the camera popup)
    const arSystem = sceneEl.systems["mindar-image-system"];
    if (arSystem) {
        arSystem.start(); 
    }

    // 2. Start the video
    video.play().then(() => {
        video.muted = false; // Unmute after user interaction
    }).catch(err => console.log("Video waiting for track..."));

    // 3. Hide the overlay to show the camera feed
    document.querySelector("#overlay").style.display = "none";
});