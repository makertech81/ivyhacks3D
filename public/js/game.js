var fbRef;
var otherPlayers = {};
var playerID;
var player;

function loadGame(roomID){
  fbRef = new Firebase("https://virtual-classroom-f1d06.firebaseio.com/data/worlds/"+roomID);
  loadEnvironment();

  initMainPlayer();

  listenToOtherPlayers();

  window.onunload = function(){
    fbRef.child("Players").child(playerID).remove();

  }
  window.onbeforeunload = function(){
    fbRef.child("Players").child(playerID).remove();
  }
}

function listenToPlayer(playerData){
  if (playerData.val()){
    otherPlayers[playerData.key()].setOrientation( playerData.val().orientation.position, playerData.val().orientation.rotation);
  }
  console.log("Player")
}

function listenToOtherPlayers(){
  //when a player is added, show them on the screen
  console.log("Playerssss")
  fbRef.child( "Players" ).on( "child_added", function( playerData ) {
    console.log("happened?")
    if ( playerData.val() ) {
      if ( playerID != playerData.key() && !otherPlayers[playerData.key()] ) {
        otherPlayers[playerData.key()] = new Player( playerData.key() );
        otherPlayers[playerData.key()].init();
        fbRef.child( "Players").child(playerData.key()).on( "value", listenToPlayer );
        console.log("dwdwd?")
      }
      console.log("dwdqwdqwdwd?")
    }
  });

  //when a player is removed, kick  them out
  fbRef.child("Players").on("child_removed", function(playerData){
    if(playerData.val()){
      fbRef.child("Players").child(playerData.key()).off( "value", listenToPlayer );
      otherPlayers[playerData.key()].mesh.dispose();
      delete otherPlayers[playerData.key()];
    }
  })
}
function initMainPlayer(){
  playerID = fbRef.child("Players").push().key();
  console.log(playerID)
  player = new Player(playerID);
  player.isMainPlayer = true;
  player.init();
}

function loadEnvironment(){
  ground = BABYLON.Mesh.CreatePlane("ground", 20.0, scene);
  ground.material = new BABYLON.StandardMaterial("groundMat", scene);
  ground.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
  ground.material.backFaceCulling = false;
  ground.position = new BABYLON.Vector3(5, -10, -15);
  ground.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);
}