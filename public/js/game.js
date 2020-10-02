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
  var sphere_geometry = new THREE.SphereGeometry( 1 );
	var sphere_material = new THREE.MeshNormalMaterial();
	var sphere = new THREE.Mesh( sphere_geometry, sphere_material );

	scene.add( sphere );
}
