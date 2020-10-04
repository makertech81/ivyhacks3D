BABYLON.PlayerControls = function(camera, player, domElement) {
    this.camera = camera;
    this.player = player;
    this.domElement = (domElement !== undefined) ? domElement : document;

    this.enabled = true;

    //this.center = this.center = new BABYLON.Vector3(player.position.x, player.position.y, player.position.z);
    var scope = this;
    
    var inputMap ={};
    scene.actionManager = new BABYLON.ActionManager(scene);
    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
        inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    }));
    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
        inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    }));
    scene.onBeforeRenderObservable.add(()=>{
    });
    var keys = {
        letft: 0,
        right: 0,
        forward: 0,
        back: 0
    };

    engine.runRenderLoop(function () {

      var cameraForwardRayPosition = camera.getForwardRay().direction;
      var cameraForwardRayPositionWithoutY = new BABYLON.Vector3(cameraForwardRayPosition.x, -5, cameraForwardRayPosition.z);
      // console.log(cameraForwardRayPosition.y)
      if (keys) {
            if (keys.left) {
                scope.player.locallyTranslate(new BABYLON.Vector3(-0.02, 0, 0));
            }

            if (keys.right) {
                scope.player.locallyTranslate(new BABYLON.Vector3(0.02, 0, 0));
            }

            if (keys.forward) {
                scope.player.lookAt(
                    scope.player.position.add(cameraForwardRayPositionWithoutY),
                    0, 0, 0);

                var v2 = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, 0), BABYLON.Matrix.RotationY(scope.player.rotation.y));
                scope.player.position.addInPlace(v2);
                scope.player.locallyTranslate(new BABYLON.Vector3(0, -0.02, 0));
                scope.player.moveWithCollisions(scope.player.forward)

            }

            if (keys.back) {

                this.player.lookAt(
                    scope.player.position.add(cameraForwardRayPositionWithoutY),
                    0, 0, 0);

                var v2 = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, 0), BABYLON.Matrix.RotationY(scope.player.rotation.y));
                scope.player.position.addInPlace(v2);
                scope.player.locallyTranslate(new BABYLON.Vector3(0, 0.02, 0));
                scope.player.moveWithCollisions(scope.player.forward)

            }

        }
    });

    window.addEventListener("keydown", handleKeyDown, false);
    window.addEventListener("keyup", handleKeyUp, false);

    function handleKeyDown(evt) {
        if (evt.keyCode == 65) { //A
            keys.left = 1;
        }
        if (evt.keyCode == 68) { //D
            keys.right = 1;
        }
        if (evt.keyCode == 87) { //W
            keys.back = 1;
        }
        if (evt.keyCode == 83) { //S
            keys.forward = 1;
        }
    }

    function handleKeyUp(evt) {
        if (evt.keyCode == 65) {
            keys.left = 0;
        }
        if (evt.keyCode == 68) {
            keys.right = 0;
        }
        if (evt.keyCode == 87) {
            keys.back = 0;
        }
        if (evt.keyCode == 83) {
            keys.forward = 0;
        }
    }
};

// BABYLON.PlayerControls.prototype = Object.create( BABYLON.EventDispatcher.prototype );