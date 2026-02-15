const video = document.querySelector("#giftVideo");
const startBtn = document.querySelector("#startBtn");
const loading = document.querySelector("#loading");
const sceneEl = document.querySelector("a-scene");

// YOUR NEW REDUCED FILE ID
const fileID = "1N5YusQQxjOi6PJ_Iip808lUGtv_uh6nu";

// Direct stream link
video.src = `https://drive.google.com/uc?export=download&id=${fileID}`;

startBtn.addEventListener('click', () => {
    startBtn.style.display = "none";
    loading.style.display = "block";

    // Start AR immediately and let the video catch up
    const startAR = () => {
        video.play().catch(() => console.log("Video playback waiting for load..."));
        video.muted = false;
        
        if (sceneEl.systems["mindar-image-system"]) {
            sceneEl.systems["mindar-image-system"].start(); 
        }
        document.querySelector("#overlay").style.display = "none";
    };

    // If video is even slightly ready, go!
    if (video.readyState >= 2) {
        startAR();
    } else {
        // Fallback: Force start after 3 seconds even if loading message is still there
        video.addEventListener('loadeddata', startAR);
        setTimeout(startAR, 3000); 
    }
});