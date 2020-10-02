var fbRef = new Firebase("https://virtual-classroom-f1d06.firebaseio.com/data");
var otherPlayers = {};

var playerID;
var player;

//load the whole game
function loadGame(){
  //load the environment
  loadEnvironment();

  //load the player
  initMainPlayer();

  //load other playerss
  listenToOtherPlayers();

  //When they leave, remove their IDs from  FireBase
  window.onunload = function(){
    fbRef.child("Players").child(playerID).remove();
  }
  window.onbeforeunload = function(){
    fbRef.child("Players").child(playerID).remove();
  }


}

//record and update the player positions
function listenToPlayer(playerData){
  if ( playerData.val() ) {
		otherPlayers[playerData.key()].setOrientation( playerData.val().orientation.position, playerData.val().orientation.rotation);
	}
}

//record when a play joins the room
function listenToOtherPlayers(){
  //when a player is added, show them on the screen
  fbRef.child( "Players" ).on( "child_added", function( playerData ) {
		if ( playerData.val() ) {
			if ( playerID != playerData.key() && !otherPlayers[playerData.key()] ) {
				otherPlayers[playerData.key()] = new Player( playerData.key() );
				otherPlayers[playerData.key()].init();
				fbRef.child( "Players").child(playerData.key()).on( "value", listenToPlayer );
			}
		}
	});

  //when a player is removed, kick  them out
  fbRef.child("Players").on("child_removed", function(playerData){
    if(playerData.val()){
      fbRef.child("Players").child(playerData.key()).off( "value", listenToPlayer );
			scene.remove( otherPlayers[playerData.key()].mesh );
			delete otherPlayers[playerData.key()];
    }
  })
}

//initiate the main player
function initMainPlayer(){
  playerID = fbRef.child("Players").push().key();

  player = new Player(playerID);
  player.isMainPlayer = true;
  player.init();
}

//load the game environemnt
function loadEnvironment(){
  // var sphere_geometry = new THREE.SphereGeometry( 1 );
	// var sphere_material = new THREE.MeshNormalMaterial();
	// var sphere = new THREE.Mesh( sphere_geometry, sphere_material );

floor = new THREE.Mesh(
  new THREE.PlaneGeometry(100,75,10,10),
  new THREE.MeshBasicMaterial({color: 0xffffff, wireframe:true})
);

floor.rotation.x -= Math.PI / 2;
floor.position.y -= 0.5;
	scene.add(floor);

//WALL FRONT
wallFront = new THREE.Mesh(
    new THREE.PlaneGeometry(100,50,10,10),
    new THREE.MeshBasicMaterial({color: 0xccffcc, wireframe:false})
);

wallFront.position.z = -37;
wallFront.position.y += 24;
//wallRight.rotation.y = THREE.Math.degToRad( 90 );;
scene.add(wallFront);

// //Plane
// var planeGeoemtry = new THREE.PlaneGeoemtry(70,30,1,1);
// var planeMaterial = new THREE.MeshBasicMaterial({color: green});
//
// var plane = new Physijs.BoxMesh(planeGeoemtry, planeMaterial);
// scene.add(plane);
//
// var material = new THREE.MeshBasicMaterial({
//     color: 0xccffcc,
//     side: THREE.FrontSide,
//     //wireframe:true
// });
//
// var geometryLateral = new THREE.BoxGeometry(1, 40, 10);//thickness, height, length
// var wall1 = new Physijs.BoxMesh(geometryLateral, material);
// scene.add(wall1);
// wall1.position.x=-20;
// var wall2 = new Physijs.BoxMesh(geometryLateral, material);
// scene.add(wall2);
// wall2.position.x=10;
//
// var geo = new THREE.BoxGeometry(60, 40, 5);
// var wall3 = new Physijs.BoxMesh(geo, material);
// scene.add(wall3);
// wall3.position.x=0;
// wall3.position.y=0;
// wall3.position.z=20;

}
