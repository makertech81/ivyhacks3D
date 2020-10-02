var Player = function(playerID) {
  this.playerID = playerID;
  this.isMainPlayer = false;
  this.mesh;

  //player model
  var cube_geometry = new THREE.BoxGeometry( 1, 1, 1 );
	var cube_material = new THREE.MeshBasicMaterial( {color: 0x7777ff, wireframe: false} );

	var scope = this;


  this.init = function(){
    scope.mesh = new THREE.Mesh(cube_geometry, cube_material);
    scene.add(scope.mesh);

    if (scope.isMainPlayer) {
      //Give user control of their player
      controls = new THREE.PlayerControls(camera, scope.mesh);
      controls.init();
    }
  };

  //if they move, update their positions and rotations
  this.setOrientation = function( position, rotation ) {
		if ( scope.mesh ) {
			scope.mesh.position.copy( position );
			scope.mesh.rotation.x = rotation.x;
			scope.mesh.rotation.y = rotation.y;
			scope.mesh.rotation.z = rotation.z;

		}
	};
};
