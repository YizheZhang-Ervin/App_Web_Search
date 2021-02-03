function getMedia() {
    let video = document.getElementById("video");
    let constraints = {
        video: { width: 350, height: 350 },
        audio: true
    };
    if (navigator.mediaDevices.getUserMedia(constraints) == 'undefined') {
        alert("can't use media devices!");
    } else {
        var promise = navigator.mediaDevices.getUserMedia(constraints);
    }
    promise.then(function (MediaStream) {
        video.srcObject = MediaStream;
        video.play();
    }).catch(function (PermissionDeniedError) {
        console.log(PermissionDeniedError);
    })
}
function takePhoto() {
    let video = document.getElementById("video");
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, 240, 240);
}

export {getMedia,takePhoto}