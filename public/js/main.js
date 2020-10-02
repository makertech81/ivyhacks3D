//LOAD THE WHOLE SITE

var container;
var scene;
var camera;
var renderer;
var controls;


//a step by step breakdown
function getUUIDDirectoryByFullURL(url){
    url = url.split('/'); //url = ["serverName","app",...,"bb65efd50ade4b3591dcf7f4c693042b"]
    url = url.pop();      //url = "bb65efd50ade4b3591dcf7f4c693042b"
    return url;           //return "bb65efd50ade4b3591dcf7f4c693042b"
}
init(getUUIDDirectoryByFullURL(document.URL))
animate()

function init(roomID){
  // Setting up three.js Scene
  container = document.getElementById( 'container' );

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer( { alpha: true} );
  renderer.setSize( window.innerWidth, window.innerHeight);

  //load the game world
  loadGame(roomID);

  //Event Handlers
  window.addEventListener("resize", onWindowResize, false);

  container.appendChild(renderer.domElement);

  document.body.appendChild(container)
}

function animate(){
  requestAnimationFrame(animate);
  render()

  if (controls) {
    controls.update();
  }
}

function render(){
  renderer.clear();
  renderer.render(scene, camera);
}

function onWindowResize(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectMatrix();

  render.setSize(window.innerWidth, window.innerHeight);
}
