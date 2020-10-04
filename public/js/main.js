var container;
var scene;
var engine;
var camera;
var vrHelper;
var isFullScreen = false;
function getUUIDDirectoryByFullURL(url) {
    url = url.split('/'); //url = ["serverName","app",...,"bb65efd50ade4b3591dcf7f4c693042b"]
    url = url.pop();
    console.log(url) //url = "bb65efd50ade4b3591dcf7f4c693042b"
    return url; //return "bb65efd50ade4b3591dcf7f4c693042b"
}
document.addEventListener("fullscreenchange", onFullScreenChange, false);
document.addEventListener("mozfullscreenchange", onFullScreenChange, false);
document.addEventListener("webkitfullscreenchange", onFullScreenChange, false);
document.addEventListener("msfullscreenchange", onFullScreenChange, false);
// var rtcOpts = {
//     room: 'test-room',
//     signaller: 'https://switchboard.rtc.io'
//   };
// // call RTC module
// var rtc = RTC(rtcOpts);
// // A div element to show our local video stream
// var localVideo = document.getElementById('l-video');
// // A div element to show our remote video streams
// var remoteVideo = document.getElementById('r-video');
// // A contenteditable element to show our messages


// // Bind to events happening on the data channel
// function bindDataChannelEvents(id, channel, attributes, connection) {


//   // Send message
//   messageWindow.onkeyup = function () {
//     channel.send(this.innerHTML);
//   };
// }

// // Start working with the established session
// function init(session) {
//   session.createDataChannel('chat');
//   session.on('channel:opened:chat', bindDataChannelEvents);
// }

// // Display local and remote video streams
// localVideo.appendChild(rtc.local);
// remoteVideo.appendChild(rtc.remote);

// // Detect when RTC has established a session
// rtc.on('ready', init);

function onFullScreenChange() {
    if (document.fullscreen !== undefined) {
        isFullScreen = document.fullscreen;
    } else if (document.mozFullScreen !== undefined) {
        isFullScreen = document.mozFullScreen;
    } else if (document.webkitIsFullScreen !== undefined) {
        isFullScreen = document.webkitIsFullScreen;
    } else if (document.msIsFullScreen !== undefined) {
        isFullScreen = document.msIsFullScreen;
    }
}

switchFullscreen = function () {
    if (!isFullScreen) {
        BABYLON.Tools.RequestFullscreen(renderingZone);
    }
    else {
        BABYLON.Tools.ExitFullscreen();
    }
};

init(getUUIDDirectoryByFullURL(document.URL))

async function init(roomID) {
    container = document.getElementById('container');

    engine = new BABYLON.Engine(container, true);
    scene = new BABYLON.Scene(engine);
    engine.enableOfflineSupport = false;
    scene.enablePhysics(null, new BABYLON.OimoJSPlugin());
    scene.collisionsEnabled = true;
    camera = new BABYLON.FollowCamera("camera1", new BABYLON.Vector3(0, 5, -20), scene);
    camera.heightOffset = 0; //how high up from the object to place the camera
    camera.radius = 15; // how far from the object to follow
    camera.rotationOffset = 160; //rotate around the object (if it's imported strangely or you want to follow from the front)
    camera.lowerRadiusLimit = 10;
    camera.upperRadiusLimit = 25;
    

    vrHelper = scene.createDefaultVRExperience();
    var isFullScreen = false;

document.addEventListener("fullscreenchange", onFullScreenChange, false);
document.addEventListener("mozfullscreenchange", onFullScreenChange, false);
document.addEventListener("webkitfullscreenchange", onFullScreenChange, false);
document.addEventListener("msfullscreenchange", onFullScreenChange, false);

function onFullScreenChange() {
    if (document.fullscreen !== undefined) {
        isFullScreen = document.fullscreen;
    } else if (document.mozFullScreen !== undefined) {
        isFullScreen = document.mozFullScreen;
    } else if (document.webkitIsFullScreen !== undefined) {
        isFullScreen = document.webkitIsFullScreen;
    } else if (document.msIsFullScreen !== undefined) {
        isFullScreen = document.msIsFullScreen;
    }
}

switchFullscreen = function () {
    if (!isFullScreen) {
        BABYLON.Tools.RequestFullscreen(renderingZone);
    }
    else {
        BABYLON.Tools.ExitFullscreen();
    }
};
    scene.activeCamera = camera; //set the active camera
    camera.attachControl(container);
    engine.runRenderLoop(function() {
        scene.render();
    });
    console.log(roomID)
    loadGame(roomID);



    //window.addEventListener("resize", onWindowResize, false);



    //document.body.appendChild(container)
}
// function onWindowResize(){
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectMatrix();

//   render.setSize(window.innerWidth, window.innerHeight);
// }