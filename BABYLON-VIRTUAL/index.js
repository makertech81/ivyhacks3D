window.addEventListener('DOMContentLoaded', function () {
    var canvas = document.getElementById('canvas');
    var engine = new BABYLON.Engine(canvas, true);

    var createScene = function () {
    engine.enableOfflineSupport = false;
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = BABYLON.Color3.White();

    scene.enablePhysics(null, new BABYLON.OimoJSPlugin());
    scene.collisionsEnabled = true;
    // // //Set gravity for the scene (G force like, on Y-axis)
    //  scene.gravity = new BABYLON.Vector3(0, -0.9, 0);
    // //
    // // // Enable Collisions
    // scene.collisionsEnabled = true;



    // Lights
    var light0 = new BABYLON.DirectionalLight("Omni", new BABYLON.Vector3(-2, -5, 2), scene);
    var light1 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(2, -5, -2), scene);
    var light2 = new BABYLON.DirectionalLight("Omni", new BABYLON.Vector3(200, -50, -200), scene);

    // // Need a free camera for collisions
    // var camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, -8, -20), scene);
    // camera.attachControl(canvas, true);

    // Camera
    var camera = new BABYLON.FollowCamera("camera1", new BABYLON.Vector3(0, 5, -20), scene);
    camera.heightOffset = 0; //how high up from the object to place the camera
    camera.radius = 15; // how far from the object to follow
    camera.rotationOffset = 160; //rotate around the object (if it's imported strangely or you want to follow from the front)
    camera.lowerRadiusLimit = 10;
    camera.upperRadiusLimit = 25;
    scene.activeCamera = camera; //set the active camera
    camera.attachControl(canvas);

    //RightWall
    var wallOne = BABYLON.Mesh.CreateBox("wallOne", 110.0, scene);
    wallOne.visibility = 0;
    wallOne.scaling.y = 0.1
    wallOne.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);
    wallOne.material = new BABYLON.StandardMaterial("groundMat", scene);
    wallOne.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
    wallOne.material.backFaceCulling = false;
    wallOne.position = new BABYLON.Vector3(30, 10, -35);
    wallOne.checkCollisions = true;
    wallOne.physicsImpostor = new BABYLON.PhysicsImpostor(wallOne, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, scene);

    //LeftWall
    var wallTwo = BABYLON.Mesh.CreateBox("wallTwo", 110.0, scene);
    wallTwo.visibility = 0;
    wallTwo.scaling.y = 0.1
    wallTwo.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);
    wallTwo.material = new BABYLON.StandardMaterial("groundMat", scene);
    wallTwo.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
    wallTwo.material.backFaceCulling = false;
    wallTwo.position = new BABYLON.Vector3(30, 10, 41);
    wallTwo.checkCollisions = true;
    wallTwo.physicsImpostor = new BABYLON.PhysicsImpostor(wallTwo, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, scene);

    //frontWall
    var wallThree = BABYLON.Mesh.CreateBox("wallThree", 110.0, scene);
    wallThree.visibility = 0;
    wallThree.scaling.y = 0.1
    wallThree.rotation = new BABYLON.Vector3(Math.PI * 0, 0, 14.2);
    wallThree.material = new BABYLON.StandardMaterial("groundMat", scene);
    wallThree.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
    wallThree.material.backFaceCulling = false;
    wallThree.position = new BABYLON.Vector3(85, 0, 0);
    wallThree.checkCollisions = true;
    wallThree.physicsImpostor = new BABYLON.PhysicsImpostor(wallThree, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, scene);

    //backWall
    var wallFour = BABYLON.Mesh.CreateBox("wallFour", 110.0, scene);
    wallFour.visibility = 0;
    wallFour.scaling.y = 0.1
    wallFour.rotation = new BABYLON.Vector3(Math.PI * 0, 0, 14.2);
    wallFour.material = new BABYLON.StandardMaterial("groundMat", scene);
    wallFour.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
    wallFour.material.backFaceCulling = false;
    wallFour.position = new BABYLON.Vector3(-24, 0, 0);
    wallFour.checkCollisions = true;
    wallFour.physicsImpostor = new BABYLON.PhysicsImpostor(wallFour, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, scene);



    //Ground
    var ground = BABYLON.Mesh.CreateBox("ground", 110.0, scene);
    ground.visibility = 0;
    ground.scaling.y = 0.01;
    ground.material = new BABYLON.StandardMaterial("groundMat", scene);
    ground.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
    ground.material.backFaceCulling = false;
    ground.position = new BABYLON.Vector3(30, -0.75, -15);
    ground.checkCollisions = true;
    ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, scene);
    // ground.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);




    //Simple crate
    var box = new BABYLON.Mesh.CreateBox("crate", 2, scene);
    //camera.lockedTarget = box
    box.checkCollisions = true;
    box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsEngine.BoxImpostor, {mass: 1, restitution: 0.1 }, scene)
    box.material = new BABYLON.StandardMaterial("Mat", scene);
    box.material.diffuseTexture = new BABYLON.Texture("textures/crate.png", scene);
    box.material.diffuseTexture.hasAlpha = true;
    box.position = new BABYLON.Vector3(5, 10, -10);

    // var camera = new BABYLON.FollowCamera("camera1", box.position.clone(), scene);
    // camera.attachControl(canvas, true);

    // The first parameter can be used to specify which mesh to import. Here we import all meshes
    BABYLON.SceneLoader.ImportMesh("", "Assets/classroom/", "untitled.babylon", scene, function (newMeshes) {
      console.log("loaded Classrooom")
      newMeshes.forEach(function(mesh){
        mesh.checkCollisions = true;
        mesh.position.x += 5
        //mesh.physicsImpostor = new BABYLON.PhysicsImpostor(mesh, BABYLON.PhysicsEngine.BoxImpostor, {mass: 0, restitution: 0.1 }, scene)
        mesh.applyGravity = true;
        })
        // scene.createDefaultCameraOrLight(true);
        // scene.activeCamera.attachControl(canvas, false);
        // scene.activeCamera.alpha += Math.PI; // camera +180°
    });

    // //base
    // var base = BABYLON.Mesh.CreateBox("ground", 10.0, scene);
    // base.scaling.y = 0.01;
    // base.material = new BABYLON.StandardMaterial("groundMat", scene);
    // base.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
    // base.material.backFaceCulling = false;
    // base.position = new BABYLON.Vector3(20, 2, 0);
    // base.checkCollisions = true;
    // base.physicsImpostor = new BABYLON.PhysicsImpostor(base, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 30, friction: 0.5, restitution: 0.7 }, scene);

    var personMesh;
    BABYLON.SceneLoader.ImportMesh("", "Assets/Woman/", "woman.babylon", scene, function(newMeshes, particleSystems, skeletons){
      console.log("loaded woman")
      //var skeleton = skeletons[0];
      personMesh = newMeshes[0]
      //rotate the camera behind the player
      personMesh.checkCollisions = true;
      //personMesh.parent = base;
      //camera.lockedTarget = personMesh
      personMesh.scaling.scaleInPlace(6)

      //Third Person CamTarget
      var camTarg = BABYLON.Mesh.CreatePlane("ctarg", 1, scene);
      camTarg.rotation = new BABYLON.Vector3(Math.PI * 0, 0, 14.2);
      camTarg.visibility = 0;
      camTarg.parent = personMesh;
      camTarg.position = new BABYLON.Vector3(0.5, 0, -1.6);
      camera.lockedTarget = camTarg;
      // personMesh = BABYLON.Mesh.MergeMeshes([
      //   newMeshes[0].getChildMeshes()[1], newMeshes[0].getChildMeshes()[2], newMeshes[0].getChildMeshes()[3], newMeshes[0].getChildMeshes()[4], newMeshes[0].getChildMeshes()[5]
      // ])
      // var childMeshLength = newMeshes[0].getChildMeshes().length;
      // personMesh = newMeshes[0].getChildMeshes()[childMeshLength]
      personMesh.position = new BABYLON.Vector3(20, 0, 0.15)
      personMesh.rotation.x = Math.PI/2
      console.log(personMesh)


      personMesh.physicsImpostor = new BABYLON.PhysicsImpostor(personMesh, BABYLON.PhysicsEngine.BoxImpostor, {mass: 50, restitution: 0.1 }, scene)

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
    });







    // //follow camera
    // camera = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(0, -8, -20), scene);
	  //    camera.target = box; // target any mesh or object with a "position" Vector3
	  //    camera.radius = 20; // how far from the object to follow
	  //    camera.heightOffset = 80; // how high above the object to place the camera
    //    camera.attachControl(canvas, true);
	  //    // camera.rotationOffset = 180; // the viewing angle
	  //    // camera.cameraAcceleration = 0.01 // how fast to move
	  //    // camera.maxCameraSpeed = 20 // speed limit
    //    //
	  //    // scene.activeCamera = camera; // remember to notify your scene about a new active camera

    // //Set the ellipsoid around the camera (e.g. your player's size)
    // camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
    //
    // //Then apply collisions and gravity to the active camera
    // camera.checkCollisions = true;
    // camera.applyGravity = true;
    //camera.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsEngine.BoxImpostor, {mass: 1, restitution: 0 }, scene)



    //finally, say which mesh will be collisionable
    //ground.checkCollisions = true;
    //box.checkCollisions = true;

    // Keyboard events
    var inputMap ={};
    scene.actionManager = new BABYLON.ActionManager(scene);
    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
        inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    }));
    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
        inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    }));

    // Game/Render loop
    scene.onBeforeRenderObservable.add(()=>{
      // personMesh.rotationQuaternion.x = 0;
      // personMesh.rotationQuaternion.z = 0;
    //     if(inputMap["w"] || inputMap["ArrowUp"]){
    //       personMesh.position.z += 0.5
    //       personMesh.moveWithCollisions(personMesh.forward)
    //       console.log("w was pressed")
    //       console.log(personMesh.position)
    //     }
    //     if(inputMap["a"] || inputMap["ArrowLeft"]){
    //         personMesh.position.x-=0.5
    //         personMesh.moveWithCollisions(personMesh.forward)
    //     }
    //     if(inputMap["s"] || inputMap["ArrowDown"]){
    //       personMesh.position.z -= 0.5
    //       personMesh.moveWithCollisions(personMesh.forward)
    //     }
    //     if(inputMap["d"] || inputMap["ArrowRight"]){
    //       personMesh.position.x+=0.5
    //       personMesh.moveWithCollisions(personMesh.forward)
    //     }
    //     if(inputMap["q"] || inputMap["ArrowRight"]){
    //         personMesh.rotation.z= -Math.PI/2
    //         personMesh.moveWithCollisions(personMesh.forward)
    //     }
    //     if(inputMap["e"] || inputMap["ArrowRight"]){
    //         box.rotation.x-=0.1
    //     }

        // camera.position = box.position.clone();
        // let ray = camera.getForwardRay();
        //
        // box.rotation.y = Math.atan2(ray.direction.x, ray.direction.z);
        // camera.position = box.position.clone().add(ray.direction.multiplyByFloats(-10,-10,-10));

    })


    //PLAYER MOVEMENT
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
                personMesh.locallyTranslate(new BABYLON.Vector3(-0.02, 0, 0));
            }

            if (keys.right) {
                personMesh.locallyTranslate(new BABYLON.Vector3(0.02, 0, 0));
            }

            if (keys.forward) {
                personMesh.lookAt(
                    personMesh.position.add(cameraForwardRayPositionWithoutY),
                    0, 0, 0);

                var v2 = BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, 0), BABYLON.Matrix.RotationY(personMesh.rotation.y));
                personMesh.position.addInPlace(v2);
                personMesh.locallyTranslate(new BABYLON.Vector3(0, -0.02, 0));
                personMesh.moveWithCollisions(personMesh.forward)

            }

            if (keys.back) {

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



    return scene;
}

// var createScene = function () {
//     var scene = new BABYLON.Scene(engine);
//     scene.clearColor = BABYLON.Color3.Purple();
//
//     var camera = new BABYLON.FreeCamera("Camera", new BABYLON.Vector3(0, 0, -20), scene);
//     camera.attachControl(canvas, true);
//     camera.checkCollisions = true;
//     camera.applyGravity = true;
//     camera.setTarget(new BABYLON.Vector3(0, 0, 0));
//
//     var light = new BABYLON.DirectionalLight("dir02", new BABYLON.Vector3(0.2, -1, 0), scene);
//     light.position = new BABYLON.Vector3(0, 80, 0);
//
//     // Material
//     var materialAmiga = new BABYLON.StandardMaterial("amiga", scene);
//     materialAmiga.diffuseTexture = new BABYLON.Texture("textures/amiga.jpg", scene);
//     materialAmiga.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);
//     materialAmiga.diffuseTexture.uScale = 5;
//     materialAmiga.diffuseTexture.vScale = 5;
//
//     var materialAmiga2 = new BABYLON.StandardMaterial("amiga", scene);
//     materialAmiga2.diffuseTexture = new BABYLON.Texture("textures/amiga.jpg", scene);
//     materialAmiga2.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);
//
//     // Shadows
//     var shadowGenerator = new BABYLON.ShadowGenerator(2048, light);
//
//     // Physics
//     //scene.enablePhysics(null, new BABYLON.CannonJSPlugin());
//     scene.enablePhysics(null, new BABYLON.OimoJSPlugin());
//
//     // Spheres
//     var y = 0;
//     for (var index = 0; index < 100; index++) {
//         var sphere = BABYLON.Mesh.CreateSphere("Sphere0", 16, 3, scene);
//         sphere.material = materialAmiga;
//
//         sphere.position = new BABYLON.Vector3(Math.random() * 20 - 10, y, Math.random() * 10 - 5);
//
//         shadowGenerator.addShadowCaster(sphere);
//
//         sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1 }, scene);
//
//         y += 2;
//     }
//
//     // Link
//     var spheres = [];
//     for (index = 0; index < 10; index++) {
//         sphere = BABYLON.Mesh.CreateSphere("Sphere0", 16, 1, scene);
//         spheres.push(sphere);
//         sphere.material = materialAmiga2;
//         sphere.position = new BABYLON.Vector3(Math.random() * 20 - 10, y, Math.random() * 10 - 5);
//
//         shadowGenerator.addShadowCaster(sphere);
//
//         sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1 }, scene);
//     }
//
//     for (index = 0; index < 9; index++) {
//         spheres[index].setPhysicsLinkWith(spheres[index + 1], new BABYLON.Vector3(0, 0.5, 0), new BABYLON.Vector3(0, -0.5, 0));
//     }
//
//     // Box
//     var box0 = BABYLON.Mesh.CreateBox("Box0", 3, scene);
//     box0.position = new BABYLON.Vector3(3, 30, 0);
//     var materialWood = new BABYLON.StandardMaterial("wood", scene);
//     materialWood.diffuseTexture = new BABYLON.Texture("textures/crate.png", scene);
//     materialWood.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);
//     box0.material = materialWood;
//
//     shadowGenerator.addShadowCaster(box0);
//
//     // Compound
//     var part0 = BABYLON.Mesh.CreateBox("part0", 3, scene);
//     part0.position = new BABYLON.Vector3(3, 30, 0);
//     part0.material = materialWood;
//
//     var part1 = BABYLON.Mesh.CreateBox("part1", 3, scene);
//     part1.parent = part0; // We need a hierarchy for compound objects
//     part1.position = new BABYLON.Vector3(0, 3, 0);
//     part1.material = materialWood;
//
//     shadowGenerator.addShadowCaster(part0);
//     shadowGenerator.addShadowCaster(part1);
// 	shadowGenerator.useBlurExponentialShadowMap = true;
//     shadowGenerator.useKernelBlur = true;
//     shadowGenerator.blurKernel = 32;
//
//
//     // Playground
//     var ground = BABYLON.Mesh.CreateBox("Ground", 1, scene);
//     ground.scaling = new BABYLON.Vector3(100, 1, 100);
//     ground.position.y = -5.0;
//     ground.checkCollisions = true;
//
//     var border0 = BABYLON.Mesh.CreateBox("border0", 1, scene);
//     border0.scaling = new BABYLON.Vector3(1, 100, 100);
//     border0.position.y = -5.0;
//     border0.position.x = -50.0;
//     border0.checkCollisions = true;
//
//     var border1 = BABYLON.Mesh.CreateBox("border1", 1, scene);
//     border1.scaling = new BABYLON.Vector3(1, 100, 100);
//     border1.position.y = -5.0;
//     border1.position.x = 50.0;
//     border1.checkCollisions = true;
//
//     var border2 = BABYLON.Mesh.CreateBox("border2", 1, scene);
//     border2.scaling = new BABYLON.Vector3(100, 100, 1);
//     border2.position.y = -5.0;
//     border2.position.z = 50.0;
//     border2.checkCollisions = true;
//
//     var border3 = BABYLON.Mesh.CreateBox("border3", 1, scene);
//     border3.scaling = new BABYLON.Vector3(100, 100, 1);
//     border3.position.y = -5.0;
//     border3.position.z = -50.0;
//     border3.checkCollisions = true;
//
//     var groundMat = new BABYLON.StandardMaterial("groundMat", scene);
//     groundMat.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5);
//     groundMat.emissiveColor = new BABYLON.Color3(0.2, 0.2, 0.2);
//     groundMat.backFaceCulling = false;
//     ground.material = groundMat;
//     border0.material = groundMat;
//     border1.material = groundMat;
//     border2.material = groundMat;
//     border3.material = groundMat;
//     ground.receiveShadows = true;
//
//     // Physics
//     box0.physicsImpostor = new BABYLON.PhysicsImpostor(box0, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 2, friction: 0.4, restitution: 0.3 }, scene);
//     ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, scene);
//     border0.physicsImpostor = new BABYLON.PhysicsImpostor(border0, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
//     border1.physicsImpostor = new BABYLON.PhysicsImpostor(border1, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
//     border2.physicsImpostor = new BABYLON.PhysicsImpostor(border2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
//     border3.physicsImpostor = new BABYLON.PhysicsImpostor(border3, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
//
//     part0.physicsImpostor = new BABYLON.PhysicsImpostor(part0, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 2, friction: 0.4, restitution: 0.3 }, scene);
//
//     return scene;
// }


    var scene = createScene();
    engine.runRenderLoop(function () {
        //scene.getMeshByName("crate").position.z += 0.01;
        scene.render();
    });
});
