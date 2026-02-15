let mediaRecorder;
let recordedChunks = [];

async function startRecording() {
    // Capture the stream from the AR canvas
    const stream = document.querySelector('canvas').captureStream(30); // 30 FPS
    mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });

    mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) recordedChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'My-JewelsAI-Video.webm';
        a.click();
        recordedChunks = [];
    };

    mediaRecorder.start();
    console.log("Recording started...");
}

function stopRecording() {
    mediaRecorder.stop();
    console.log("Recording stopped and saved.");
}