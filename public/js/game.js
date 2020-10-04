
var fbRef;
var otherPlayers = {};
var playerID;
var player;
var roomIDD;
firebase.initializeApp({
    apiKey: 'AIzaSyCiGyHXoGAJ1f6r4QO_Dke8-X3VTDG1Ybo',
    authDomain: 'virtual-classroom-f1d06.firebaseapp.com',
    projectId: 'virtual-classroom-f1d06'

});
var db = firebase.firestore();

async function loadGame(roomID) {
    roomIDD = roomID;
    db.collection("worlds").doc(roomID).set({
            name: roomID,
            type: "default"
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", roomID);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    console.log("Loading loadEnvironment.")
    loadEnvironment();
    console.log("RoomID:" + roomID);
    console.log("initializing MainPlayer:");
    await initMainPlayer()
    console.log(playerID)
    listenToOtherPlayers();
    console.log(otherPlayers)
    window.onunload = function() {

        db.collection("worlds").doc(roomIDD).collection("players").doc(playerID).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });;

        if (otherPlayers.length == 0) {
          db.collection("worlds").doc(roomIDD).delete().then(function() {
            console.log("World successfully deleted!");
          })
        }
    }
    window.onbeforeunload = function() {
        
        db.collection("worlds").doc(roomIDD).collection("players").doc(playerID).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });;
        if (otherPlayers.length == 0) {
          db.collection("worlds").doc(roomIDD).delete().then(function() {
            console.log("World successfully deleted!");
          })
        }
    }
    window.onreload = function() {
        
        db.collection("worlds").doc(roomIDD).collection("players").doc(playerID).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });;


    }
    
}

function listenToPlayer(playerData) {
    if(playerData.doc.data()) {
        console.log("listenToPlayer was actioned");
        console.log(playerData.doc.data().position)
        otherPlayers[playerData.doc.id].setOrientation( playerData.doc.data().position);
    }
    
}

function listenToOtherPlayers() {
    //NEW CODE - When a new player is added, show them on screen.
    db.collection("worlds").doc(roomIDD).collection("players")
        .onSnapshot(function(snapshot) {
            snapshot.docChanges().forEach(function(change) {
                if(change.type === "added") {
                    if(change.doc.data()) {
                        if(playerID != change.doc.id && !otherPlayers[change.doc.id]) {
                            otherPlayers[change.doc.id] = new Player(change.doc.id);
                            otherPlayers[change.doc.id].init();
                            console.log("Added: " + change.doc.id + "with" + playerID);
                            console.log(change)
                            
                        }
                        if(playerID != change.doc.id) {
                            listenToPlayer(change)
                        }
                    }
                    // This is equivalent to child_added
                }
                if(change.type === "modified") {
                    //console.log("Modified city: ", change.doc.data());
                    // This is equivalent to child_changed
                    //listenToPlayer(change)
                    if(playerID != change.doc.id) {
                            listenToPlayer(change)
                        }
                  //  console.log(otherPlayers[change.doc.id])
                }
                if(change.type === "removed") {
                    // console.log("Removed city: ", change.doc.data());
                    // This is equivalent to child_removed
                    if(change.doc.data()) {
                        var unsubscribe = db.collection("worlds").doc(roomIDD).collection("players")
                            .onSnapshot(listenToPlayer);
                        unsubscribe();
                        otherPlayers[change.doc.id].delete();
                        console.log("Disposed mesh of " + change.doc.id)
                        delete otherPlayers[change.doc.id];
                    }
                }
            });
        });
}

async function initMainPlayer() {
    let playerTesting = await db.collection("worlds").doc(roomIDD).collection("players").add({
        position: {
          x:0,
          y:0,
          z:0
        },
        rotation: {
          x:0,
          y:0,
          z:0
        }
    })
    playerID = playerTesting.id
    console.log("PLAYER ID = " + playerID)
    // .then(function(docRef) {
    //         console.log("Document written with ID: ", docRef.id);
    //         playerID = docRef.id;
    //         console.log("PLAYER ID = "+playerID)
    //     })
    //     .catch(function(error) {
    //         console.error("Error adding document: ", error);
    //     });

    player = new Player(playerID);
    player.isMainPlayer = true;
    player.init();

}

function loadEnvironment() {
    var light0 = new BABYLON.DirectionalLight("Omni", new BABYLON.Vector3(-2, -5, 2), scene);
    var light1 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(2, -5, -2), scene);
    var light2 = new BABYLON.DirectionalLight("Omni", new BABYLON.Vector3(200, -50, -200), scene);
    
    //RightWall
    var wallOne = BABYLON.Mesh.CreateBox("wallOne", 110.0, scene);
    wallOne.visibility = 0;
    wallOne.scaling.y = 0.1
    wallOne.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);
    wallOne.material = new BABYLON.StandardMaterial("groundMat", scene);
    wallOne.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
    wallOne.material.backFaceCulling = false;
    wallOne.position = new BABYLON.Vector3(5, 10, -34);
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
    wallTwo.position = new BABYLON.Vector3(5, 10, 40);
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
    wallThree.position = new BABYLON.Vector3(55, 0, 0);
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
    wallFour.position = new BABYLON.Vector3(-55, 0, 0);
    wallFour.checkCollisions = true;
    wallFour.physicsImpostor = new BABYLON.PhysicsImpostor(wallFour, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, scene);



    //Ground
    var ground = BABYLON.Mesh.CreateBox("ground", 110.0, scene);
    ground.visibility = 0;
    ground.scaling.y = 0.01;
    ground.material = new BABYLON.StandardMaterial("groundMat", scene);
    ground.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
    ground.material.backFaceCulling = false;
    ground.position = new BABYLON.Vector3(5, 0, -15);
    ground.checkCollisions = true;
    ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, scene);
    // ground.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);
    BABYLON.SceneLoader.ImportMesh("", "Assets/classroom/", "untitled.babylon", scene, function(newMeshes) {
        console.log("loaded Classrooom")
        newMeshes.forEach(function(mesh) {
            mesh.checkCollisions = true;
            mesh.position.x += 5
            //mesh.physicsImpostor = new BABYLON.PhysicsImpostor(mesh, BABYLON.PhysicsEngine.BoxImpostor, {mass: 0, restitution: 0.1 }, scene)
            mesh.applyGravity = true;
        })
        // scene.createDefaultCameraOrLight(true);
        // scene.activeCamera.attachControl(canvas, false);
        // scene.activeCamera.alpha += Math.PI; // camera +180°
    });
    // GUI
    vrHelper.enableTeleportation({ floorMeshName: "ground" });
    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    var selectBox = new BABYLON.GUI.SelectionPanel("sp");
    // selectBox.width = 0.2
    // selectBox.height = 0.5;
    selectBox.color = "white"
    selectBox.headerColor = "white";
    // selectBox.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    // selectBox.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    selectBox.background = ""
    //selectBox.width = 0.25;
    //selectBox.height = 0.48;
    // selectBox.adaptHeightToChildren=true;
    // selectBox.adaptWidthToChildren=true;

    //advancedTexture.addControl(selectBox);

    var transformGroup = new BABYLON.GUI.CheckboxGroup("Settings");
    transformGroup.addCheckbox("Mute Sound");
    transformGroup.addCheckbox("3D Audio");
    transformGroup.addCheckbox("First Person");
    transformGroup.addCheckbox("Motion Tracking");
    transformGroup.addCheckbox("VR");
    transformGroup.addCheckbox("Closed Captions");

//     var toSize = function(isChecked) {
//   if (isChecked) {
//     box.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
//   } else {
//     box.scaling = new BABYLON.Vector3(1, 1, 1);
//   }
// };

    var button = BABYLON.GUI.Button.CreateSimpleButton("but1", "Field Trip");
    button.width = "100px";
    button.height = "100px";
    button.color = "white";
    button.fontSize = 20;

    var colorGroup = new BABYLON.GUI.RadioGroup("Group");
    colorGroup.addRadio("Random");
    colorGroup.addRadio("Set");

  // var rotateGroup = new BABYLON.GUI.SliderGroup("Rotation", "S");
  // rotateGroup.addSlider("Angle", orientateY, "degs", 0, 2 * Math.PI, 0, 2)

    selectBox.addGroup(transformGroup);
    selectBox.addGroup(colorGroup);

    var sv = new BABYLON.GUI.ScrollViewer();
    sv.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    sv.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    sv.width = 0.2;
    sv.height = 0.3;
    sv.background = "";

    var stackPanel = new BABYLON.GUI.StackPanel();
    stackPanel.isPointerBlocker = true;
    //stackPanel.isVertical = true;
    stackPanel.width = 1;
    stackPanel.height = 2;

    stackPanel.addControl(button);
    stackPanel.addControl(selectBox);


    advancedTexture.addControl(sv);
    sv.addControl(stackPanel)
    // sv.addControl(button)

     // var button = BABYLON.GUI.Button.CreateImageOnlyButton("but", "pictures/soundSix.png");
     // button.width = 0.02;
     // button.height = 0.05;
     // button.color = "white";
     // button.background = "";
     // button.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
     // button.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_RIGHT;
     // button.top = "10px";
     //
     // button.paddingRight = "10px"
     // advancedTexture.addControl(button);

    // Keyboard events
    console.log("Done loading env.")

}