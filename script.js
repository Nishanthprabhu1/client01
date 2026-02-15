const video = document.querySelector("#giftVideo");
const startBtn = document.querySelector("#startBtn");
const loading = document.querySelector("#loading");
const sceneEl = document.querySelector("a-scene");

// Use this exact ID from your Google Drive
const fileID = "14p_-ILD77zQljr4hERJtwfRZrYwd7SUB";
video.src = `https://drive.google.com/uc?export=download&id=${fileID}`;

startBtn.addEventListener('click', () => {
    startBtn.style.display = "none";
    loading.style.display = "block";

    // This function starts the AR camera even if the video is slow
    const runAR = () => {
        video.play().catch(() => console.log("Waiting for user..."));
        video.muted = false;
        if (sceneEl.systems["mindar-image-system"]) {
            sceneEl.systems["mindar-image-system"].start(); 
        }
        document.querySelector("#overlay").style.display = "none";
    };

    // If video is ready, start. If not, wait 3 seconds and force start.
    if (video.readyState >= 2) {
        runAR();
    } else {
        video.addEventListener('canplay', runAR);
        setTimeout(runAR, 3000); // 3-second timeout to force the camera on
    }
});