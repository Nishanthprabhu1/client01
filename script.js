const video = document.querySelector("#giftVideo");
const startBtn = document.querySelector("#startBtn");
const loading = document.querySelector("#loading");
const sceneEl = document.querySelector("a-scene");

// YOUR NEW LOW-MB VIDEO ID
const fileID = "1dKxS0cUmXhUuonJjE7pmM9oO9AB07LRV";

// Direct link for streaming from Google Drive
video.src = `https://drive.google.com/uc?export=download&id=${fileID}`;

startBtn.addEventListener('click', () => {
    startBtn.style.display = "none";
    loading.style.display = "block";

    // "oncanplay" triggers as soon as enough data is buffered
    video.oncanplay = () => {
        video.play().then(() => {
            video.muted = false; // Enable audio
            // Start the AR camera engine
            if (sceneEl.systems["mindar-image-system"]) {
                sceneEl.systems["mindar-image-system"].start(); 
            }
            document.querySelector("#overlay").style.display = "none";
        });
    };

    // If there is an error (e.g., file not shared correctly)
    video.onerror = () => {
        alert("Video could not be loaded. Please check your Google Drive sharing settings.");
        startBtn.style.display = "block";
        loading.style.display = "none";
    };

    // Emergency start if video is already ready
    if (video.readyState >= 3) {
        video.oncanplay();
    }
});