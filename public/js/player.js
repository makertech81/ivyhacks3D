var Player = function(playerID) {
    this.playerID = playerID;
    this.isMainPlayer = false;
    this.mesh;

    var personMesh = this.mesh;
    var scope = this;
    this.init = function() {

        BABYLON.SceneLoader.ImportMesh("", "Assets/Woman/", "woman.babylon", scene, function(newMeshes, particleSystems, skeletons) {
            console.log("loaded woman")
            //var skeleton = skeletons[0];
            personMesh = newMeshes[0]
            //rotate the camera behind the player
            personMesh.checkCollisions = true;
            //personMesh.parent = base;
            //camera.lockedTarget = personMesh
            personMesh.scaling.scaleInPlace(6)

            //Third Person CamTarget
            if(scope.isMainPlayer) {
                var camTarg = BABYLON.Mesh.CreatePlane("ctarg", 1, scene);
                camTarg.rotation = new BABYLON.Vector3(Math.PI * 0, 0, 14.2);
                camTarg.visibility = 0;
                camTarg.parent = personMesh;
                camTarg.position = new BABYLON.Vector3(0.5, 0, -1.6);
                camera.lockedTarget = camTarg;
            }
            // personMesh = BABYLON.Mesh.MergeMeshes([
            //   newMeshes[0].getChildMeshes()[1], newMeshes[0].getChildMeshes()[2], newMeshes[0].getChildMeshes()[3], newMeshes[0].getChildMeshes()[4], newMeshes[0].getChildMeshes()[5]
            // ])
            // var childMeshLength = newMeshes[0].getChildMeshes().length;
            // personMesh = newMeshes[0].getChildMeshes()[childMeshLength]
            personMesh.position = new BABYLON.Vector3(20, 0, 0.15)
            personMesh.rotation.x = Math.PI / 2
            console.log("PERON MESH" + personMesh)

            scope.delete = function() {
                personMesh.dispose()
            }
            scope.updatePos = function(pos) {
                personMesh.locallyTranslate(new BABYLON.Vector3(pos.x, pos.y, pos.z));
            console.log(pos.x)
            }
            // personMesh.physicsImpostor = new BABYLON.PhysicsImpostor(personMesh, BABYLON.PhysicsEngine.BoxImpostor, {mass: 50, restitution: 0.1 }, scene)

            // if(personMesh.intersectMesh(wallTwo, false)){
            //   personMesh.material.emmisiveColor = new BABYLON.Color4(1, 0, 0, 1);
            // } else {
            //   personMesh.material.emmisiveColor = new BABYLON.Color4(1, 1, 1, 1);
            // }
            // newMeshes.forEach(function(mesh){
            //   personMesh = newMeshes[0]
            //   camera.lockedTarget = mesh
            //   mesh.position.x += 0.8
            //   mesh.position.y -= 0
            //   mesh.position.z -= 0.27
            //   // camera.lockedTarget = mesh;
            //
            // //   mesh.checkCollisions = true;
            //   mesh.applyGravity = true;
            // })
            if(scope.isMainPlayer) {
                //Give user control of their player
                var inputMap = {};

                scene.actionManager = new BABYLON.ActionManager(scene);
                scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function(evt) {
                    inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
                }));
                scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function(evt) {
                    inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
                }));
                scene.onBeforeRenderObservable.add(() => {});
                var keys = {
                    letft: 0,
                    right: 0,
                    forward: 0,
                    back: 0
                };

                engine.runRenderLoop(function() {

                    var cameraForwardRayPosition = camera.getForwardRay().direction;
                    var cameraForwardRayPositionWithoutY = new BABYLON.Vector3(cameraForwardRayPosition.x, -5, cameraForwardRayPosition.z);
                    // console.log(cameraForwardRayPosition.y)
                    if(keys) {
                        if(keys.left) {
                            personMesh.locallyTranslate(new BABYLON.Vector3(-0.02, 0, 0));
                        }

                        if(keys.right) {
                            personMesh.locallyTranslate(new BABYLON.Vector3(0.02, 0, 0));
                        }

                        if(keys.forward) {
                            personMesh.lookAt(
                                personMesh.position.add(cameraForwardRayPositionWithoutY),
                                0, 0, 0);

                            var v2 = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, 0), BABYLON.Matrix.RotationY(personMesh.rotation.y));
                            personMesh.position.addInPlace(v2);
                            personMesh.locallyTranslate(new BABYLON.Vector3(0, -0.02, 0));
                            personMesh.moveWithCollisions(personMesh.forward)

                        }

                        if(keys.back) {

                            personMesh.lookAt(
                                personMesh.position.add(cameraForwardRayPositionWithoutY),
                                0, 0, 0);

                            var v2 = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, 0), BABYLON.Matrix.RotationY(personMesh.rotation.y));
                            personMesh.position.addInPlace(v2);
                            personMesh.locallyTranslate(new BABYLON.Vector3(0, 0.02, 0));
                            personMesh.moveWithCollisions(personMesh.forward)

                        }

                    }
                });

                window.addEventListener("keydown", handleKeyDown, false);
                window.addEventListener("keyup", handleKeyUp, false);

                function handleKeyDown(evt) {
                    if(evt.keyCode == 65) { //A
                        keys.left = 1;
                    }
                    if(evt.keyCode == 68) { //D
                        keys.right = 1;
                    }
                    if(evt.keyCode == 87) { //W
                        keys.back = 1;
                    }
                    if(evt.keyCode == 83) { //S
                        keys.forward = 1;
                    }
                    db.collection("worlds").doc(roomIDD).collection("players").doc(playerID).set({
                 position: {
                   x: personMesh.position.x,
                   y: personMesh.position.y,
                   z: personMesh.position.z
                 },
                 rotation: {
                   x: personMesh.position.x,
                   y: personMesh.position.y,
                   z: personMesh.position.z
                 }
                });
                }

                function handleKeyUp(evt) {
                    if(evt.keyCode == 65) {
                        keys.left = 0;
                    }
                    if(evt.keyCode == 68) {
                        keys.right = 0;
                    }
                    if(evt.keyCode == 87) {
                        keys.back = 0;
                    }
                    if(evt.keyCode == 83) {
                        keys.forward = 0;
                    }
                }
                
                        //controls.init();
            }
        })
        console.log("MIN PLAYER??" + scope.isMainPlayer + playerID)

    }
    this.setOrientation = function(position) {
        console.log("Did it")
        scope.updatePos(position)
        
    }

    
}