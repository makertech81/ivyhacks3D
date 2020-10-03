var container;
var scene;
var engine;
var camera;

function getUUIDDirectoryByFullURL(url){
    url = url.split('/'); //url = ["serverName","app",...,"bb65efd50ade4b3591dcf7f4c693042b"]
    url = url.pop();
    console.log(url)      //url = "bb65efd50ade4b3591dcf7f4c693042b"
    return url;           //return "bb65efd50ade4b3591dcf7f4c693042b"
}
init(getUUIDDirectoryByFullURL(document.URL))

function init(roomID){
  container = document.getElementById('container');

  engine = new BABYLON.Engine(container, true);
  scene = new BABYLON.Scene(engine);

  camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, -8, -20), scene);
  camera.attachControl(container, true);

  engine.runRenderLoop(function () {
        scene.render();
  });
  console.log(roomID)
  loadGame(roomID);

  window.addEventListener("resize", onWindowResize, false);



  document.body.appendChild(container)
}
function onWindowResize(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectMatrix();

  render.setSize(window.innerWidth, window.innerHeight);
}