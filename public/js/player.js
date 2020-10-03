var Player = function(playerID) {
  this.playerID = playerID;
  this.isMainPlayer = false;
  this.mesh;

  var scope = this;

  this.init = function(){
    scope.mesh = new BABYLON.Mesh.CreateBox("crate", 2, scene);
    scope.mesh.material = new BABYLON.StandardMaterial("Mat", scene);
    scope.mesh.material.diffuseTexture = new BABYLON.Texture("textures/crate.png", scene);
    scope.mesh.material.diffuseTexture.hasAlpha = true;
    scope.mesh.position = new BABYLON.Vector3(5, -9, -10);
    if (scope.isMainPlayer) {
      //Give user control of their player
      controls = new BABYLON.PlayerControls(camera, scope.mesh);
      controls.init();
    }
  };

  this.setOrientation = function( position, rotation ) {
    if ( scope.mesh ) {
      scope.mesh.position = position ;
      scope.mesh.rotation.x = rotation.x;
      scope.mesh.rotation.y = rotation.y;
      scope.mesh.rotation.z = rotation.z;

    }
  };
}