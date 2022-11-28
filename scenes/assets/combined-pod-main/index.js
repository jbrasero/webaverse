
import * as THREE from 'three';
import metaversefile from 'metaversefile';
const { useApp, useLoaders, useChatManager ,useFrame ,useScene, useLoreAIScene, useNpcManager ,useInternals, useLocalPlayer, useActivate, useUse, useWear, usePhysics, getAppByPhysicsId, useCleanup } = metaversefile;
import {chatManager} from '../../../chat-manager.js';
import {makeId, createRelativeUrl} from '../../../util.js';
import {Text} from 'troika-three-text'
//import './chat/js/web-sdk22.4.js';
//import './chat/js/settings22.4.js';
import './chat/js/web-sdk.js';
import './chat/js/settings.js';


const baseUrl = import.meta.url.replace(/(\/)[^\/\/]*$/, '$1');


export default e => {

    const app = useApp();
    const { components } = app;
    const { scene, camera } = useInternals();
    const localPlayer = useLocalPlayer();
    const physics = usePhysics();
    const npcManager = useNpcManager();
    const chatManager = useChatManager();



    const floorPhysicsId = physics.addBoxGeometry(
        new THREE.Vector3(0, -1000, 0),
        new THREE.Quaternion(),
        new THREE.Vector3(1000, 2000, 1000).multiplyScalar(0.5),
        false
    );

    const placeHolders = [];
    const doors = { speed: 0.05, left: null, right: null, colliderL: null, colliderR: null, state: 'closed', offset: 0, offsetMax: 5 };
    const doors2 = { speed: 0.05, left: null, right: null, colliderL: null, colliderR: null, state: 'closed', offset: 0, offsetMax: 5 };
    const raycaster = new THREE.Raycaster();
    const tmpVec3a = new THREE.Vector3();

    const loadModel = ( params ) => {

        return new Promise( ( resolve, reject ) => {

            const { gltfLoader } = useLoaders();
            gltfLoader.load( params.filePath + params.fileName, ( gltf ) => {

                resolve( gltf.scene );

            });

        });

    };

    function updateDoors () {

        if ( ! doors.left || ! doors.right ) return;
        let adjustedPosLeft = doors.left.position.clone().add(app.position);
        let adjustedPosRight = doors.right.position.clone().add(app.position);
        let distance = tmpVec3a.set( ( adjustedPosLeft.x + adjustedPosRight.x ) / 2, 0, ( adjustedPosLeft.z + adjustedPosRight.z ) / 2 ).sub( localPlayer.position );
        distance.y = 0;
        distance = distance.length();

        if ( distance < 2 && doors.state !== 'opened' ) {

            doors.state = 'opening';

        }

        if ( distance > 2 && doors.state !== 'closed' ) {

            doors.state = 'closing';

        }

        if ( doors.state === 'opening' ) {

            doors.offset += doors.speed;
            doors.left.position.x = doors.left.userData.origPos.x + doors.offset;
            doors.right.position.x = doors.right.userData.origPos.x - doors.offset;

            if ( doors.offset >= doors.offsetMax ) {

                doors.state = 'opened';

            }

        }

        if ( doors.state === 'closing' ) {

            doors.offset -= doors.speed;
            doors.left.position.x = doors.left.userData.origPos.x + doors.offset;
            doors.right.position.x = doors.right.userData.origPos.x - doors.offset;

            if ( doors.offset <= 0 ) {

                doors.state = 'closed';

            }

        }

        doors.left.updateWorldMatrix();
        doors.right.updateWorldMatrix();

        doors.colliderL.position.copy(doors.left.position);
        doors.colliderR.position.copy(doors.right.position);

        physics.setTransform(doors.colliderL);
        physics.setTransform(doors.colliderR);

    };

    function updateDoors2 () {

        if ( ! doors2.left || ! doors2.right ) return;
        let adjustedPosLeft = doors2.left.position.clone().add(app.position);
        let adjustedPosRight = doors2.right.position.clone().add(app.position);
        let distance = tmpVec3a.set( ( adjustedPosLeft.x + adjustedPosRight.x ) / 2, 0, ( adjustedPosLeft.z + adjustedPosRight.z ) / 2 ).sub( localPlayer.position );
        distance.y = 0;
        distance = distance.length();

        if ( distance < 5 && doors2.state !== 'opened' ) {

            doors2.state = 'opening';

        }

        if ( distance > 5 && doors2.state !== 'closed' ) {

            doors2.state = 'closing';

        }

        if ( doors2.state === 'opening' ) {

            doors2.offset += doors2.speed;
            doors2.left.position.x = doors2.left.userData.origPos.x - doors2.offset;
            doors2.right.position.x = doors2.right.userData.origPos.x + doors2.offset;

            if ( doors2.offset >= doors2.offsetMax ) {

                doors2.state = 'opened';

            }

        }

        if ( doors2.state === 'closing' ) {

            doors2.offset -= doors2.speed;
            doors2.left.position.x = doors2.left.userData.origPos.x - doors2.offset;
            doors2.right.position.x = doors2.right.userData.origPos.x + doors2.offset;

            if ( doors2.offset <= 0 ) {

                doors2.state = 'closed';

            }

        }

        doors2.left.updateWorldMatrix();
        doors2.right.updateWorldMatrix();

        doors2.colliderL.position.copy(doors2.left.position);
        doors2.colliderR.position.copy(doors2.right.position);

        physics.setTransform(doors2.colliderL);
        physics.setTransform(doors2.colliderR);

    };

    //

var initialPoint = true;
var firstTime = true;
const loreAIScene = useLoreAIScene();
var firstTimeChat = true;

    useFrame(() => {

        updateDoors();
        updateDoors2();
      //  console.log("x: "+localPlayer.position.x);
        //console.log("y: "+localPlayer.position.y);
        //console.log("z: "+localPlayer.position.z);
    //   const chatODA = document.getElementsByClassName('button.oda-chat-button.oda-chat-flex');
    //  console.log(JSON.stringify(chatODA));
       /* chatODA.addEventListener('click', function handleClick() {
          alert('hago click');
        })*/
 
        if (firstTime)
        {
        const collection = document.getElementsByClassName("oda-chat-button oda-chat-flex");
        let numb = document.getElementsByClassName("oda-chat-button oda-chat-flex").length;
     
          collection[0].addEventListener('click', (e) => {
            console.log(`Button is clicked!`);
            e.preventDefault();
            e.stopPropagation();    
        });

      }else{
        firstTime=false;
      }
      

//console.log(useLocalPlayer);
        if (initialPoint)
        if (localPlayer.position.x>40 && localPlayer.position.x<41)
          {
            if (localPlayer.position.z>9 && localPlayer.position.z<11)
              {
                initialPoint= false;
                var overlay = document.createElement( 'div' );
                overlay.id = "reception"
                overlay.style.cursor = 'pointer';
                overlay.style.left = 'calc(50% - 150px)';
                overlay.style.width = '350px';
                overlay.style.position = 'absolute';
                overlay.style.bottom = '400px';
                overlay.style.padding = '12px 6px';
                overlay.style.border = '1px solid #fff';
                overlay.style.borderRadius = '4px';
                overlay.style.background = 'rgba(0,0,0,0.5)';
                overlay.style.color = '#fff';
                overlay.style.font = 'normal 14px sans-serif';
                overlay.style.textAlign = 'center';
                overlay.style.opacity = '1';
                overlay.style.outline = 'none';
                overlay.style.zIndex = '999';
                overlay.innerHTML = "The doctor is now available, please come down to the office.";
                document.body.appendChild( overlay );
                setTimeout(() => {
                const box = document.getElementById('reception');
                box.style.display = 'none';
              }, 5000);
              }
            }


        if (firstTime)
        {

            if (localPlayer.position.x>20 && localPlayer.position.x<21.3)
              {
                if (localPlayer.position.z<-8.67 && localPlayer.position.z>-9.90)
                  {
                    firstTime= false;
                  //  console.log("dentro");
                    /*chatManager.addMessage("Thank you very much for making time in your schedule.", {
                      timeout: 4000,
                    });*/


                      var overlay = document.createElement( 'div' );
                      overlay.id = "doctor1"
                      overlay.style.cursor = 'pointer';
                      overlay.style.left = 'calc(50% - 150px)';
                      overlay.style.width = '350px';
                      overlay.style.position = 'absolute';
                      overlay.style.bottom = '400px';
                      overlay.style.padding = '12px 6px';
                      overlay.style.border = '1px solid #fff';
                      overlay.style.borderRadius = '4px';
                      overlay.style.background = 'rgba(0,0,0,0.5)';
                      overlay.style.color = '#fff';
                      overlay.style.font = 'normal 14px sans-serif';
                      overlay.style.textAlign = 'center';
                      overlay.style.opacity = '1';
                      overlay.style.outline = 'none';
                      overlay.style.zIndex = '999';
                      overlay.innerHTML = "Doctor: Good Morning!";
                      document.body.appendChild( overlay );
                      var overlay1 = document.createElement( 'div' );
                      overlay1.id = "patient1"
                      overlay1.style.cursor = 'pointer';
                      overlay1.style.left = 'calc(50% - 150px)';
                      overlay1.style.width = '350px';
                      overlay1.style.position = 'absolute';
                      overlay1.style.bottom = '300px';
                      overlay1.style.padding = '12px 6px';
                      overlay1.style.border = '1px solid #fff';
                      overlay1.style.borderRadius = '4px';
                      overlay1.style.background = 'rgba(100,100,100,0.5)';
                      overlay1.style.color = '#fff';
                      overlay1.style.font = 'normal 14px sans-serif';
                      overlay1.style.textAlign = 'center';
                      overlay1.style.opacity = '1';
                      overlay1.style.outline = 'none';
                      overlay1.style.zIndex = '999';
                      overlay1.style.display = 'none';
                      overlay1.innerHTML = "Patient: Thank you very much for making time in your schedule.";
                      document.body.appendChild( overlay1 );


                      setTimeout(() => {
                      const box = document.getElementById('doctor1');
                      const box1 = document.getElementById('patient1');
                      box.style.display = 'none';
                      box1.style.display = 'block';
                     }, 3000);

                     setTimeout(() => {
                     const box = document.getElementById('doctor1');
                     box.innerHTML = "Doctor: I have been reviewing your folder. We need to carry out more clinical test in your local facilities.<br> We are suspecting that he may have a very rare disease that occurs in 0.0000001% cases.";
                     const box1 = document.getElementById('patient1');
                     box1.style.display = 'none';
                     box.style.display = 'block';
                   }, 6000);

                   setTimeout(() => {
                   const box = document.getElementById('doctor1');
                   const box1 = document.getElementById('patient1');
                   box1.innerHTML = "Patient: Ok, I understand it.";
                   box.style.display = 'none';
                   box1.style.display = 'block';
                 }, 9000);

                 setTimeout(() => {
                 const box = document.getElementById('doctor1');
                 const box1 = document.getElementById('patient1');
                 box.style.display = 'none';
                 box1.style.display = 'none';
               }, 12000);


                /*     setTimeout(() => {
                      overlay1.style.display = 'none';
                      overlay.style.display = 'block';
                    }, 3000);
                    setTimeout(() => {
                     overlay.style.display = 'none';
                     overlay1.style.display = 'block';
                   }, 3000);

                   setTimeout(() => {
                    overlay1.style.display = 'none';
                    overlay.style.display = 'block';
                  }, 3000);*/

                    /*  setTimeout(() => {
                        overlay.style.display = 'none';
                        setTimeout(() => {
                         overlay.style.display = 'none';
                         overlay1.style.display = 'block';
                        }, 6000);
                        setTimeout(() => {
                          overlay.innerHTML = "Doctor: I have been reviewing your folder. We need to carry out more clinical test in your local facilities.<br> We are suspecting that he may have a very rare disease that occurs in 0.0000001% cases.";
                          overlay.style.display = "block";
                          overlay1.style.display = 'none';
                        }, 9000);
                        setTimeout(() => {
                          overlay.style.display = 'none';
                        }, 12000);
                      }, 3000);*/


  /*const button = document.createElement( 'button' );
  button.style.cursor = 'pointer';
  button.style.left = 'calc(50% - 50px)';
  button.style.width = '100px';
  button.textContent = 'START AR';
  button.style.position = 'absolute';
  button.style.bottom = '20px';
  button.style.padding = '12px 6px';
  button.style.border = '1px solid #fff';
  button.style.borderRadius = '4px';
  button.style.background = 'rgba(0,0,0,0.1)';
  button.style.color = '#fff';
  button.style.font = 'normal 13px sans-serif';
  button.style.textAlign = 'center';
  button.style.opacity = '0.5';
  button.style.outline = 'none';
  button.style.zIndex = '999';
document.body.appendChild( button );*/





              //      console.log("playerId: "+localPlayer.playerId);
              //      chatManager.addPlayerMessage("npc", "my pleasure");
                  /*  firstTime= false;
                    const npcName = app.getComponent('name') ?? 'Anon';
                    const npcVoiceName = app.getComponent('voice') ?? 'Shining armor';
                    const npcBio = app.getComponent('bio') ?? 'A generic avatar.';
                    const character = loreAIScene.addCharacter({
                      name: npcName,
                      bio: npcBio,
                    });

                    let vrmApp = null;
                    let npcPlayer = null;
                    const npcAvatarUrl = app.getComponent('avatarUrl') ?? `/scenes/assets/doctor/wedo-doctor.vrm`;
                    const u2 = npcAvatarUrl;
                    console.log(u2);
                    vrmApp = metaversefile.createApp({
                      name: u2,
                    });
                    console.log(vrmApp);
                    vrmApp.matrixWorld.copy(app.matrixWorld);
                    vrmApp.matrix.copy(app.matrixWorld)
                      .decompose(vrmApp.position, vrmApp.quaternion, vrmApp.scale);
                    vrmApp.name = 'npc';
                    vrmApp.setComponent('physics', true);
                    vrmApp.setComponent('activate', true);
                    const position = vrmApp.position.clone()
                      .add(new THREE.Vector3(0, 1, 0));
                      console.log(position);
                    const {quaternion, scale} = vrmApp;
                    console.log(quaternion);

                    const newNpcPlayer =  npcManager.createNpcAsync({
                      name: npcName,
                      avatarUrl: npcAvatarUrl,
                      position: position,
                      quaternion: quaternion,
                      scale: scale,
                      detached: true,
                    });

                   const chatId = makeId(5);
                  const message = 'my pleasure';
                    const message2 = {
                      type: 'chat',
                      chatId,
                      playerId: localPlayer.playerId,
                      playerName: npcName,
                      message,
                    };
                    chatManager.addPlayerMessage(newNpcPlayer, message2);*/
                  }
              }
          }else{
            if (localPlayer.position.x<20 || localPlayer.position.x>21.3)
              {
                if (localPlayer.position.z>-8.67 || localPlayer.position.z<-9.90)
                  {
                    firstTime= true;
                    console.log("se sale");
                  }
              }
          }
    });

    useCleanup(() => {

        physics.removeGeometry(floorPhysicsId);

    });

    loadModel({ filePath: baseUrl, fileName: 'combined.glb', pos: { x: 0, y: 0, z: 0 } } ).then( ( podMesh ) => {

        podMesh.traverse( ( item ) => {

            if ( item.name === 'door_left' ) {

                doors.left = item;
                doors.left.updateMatrixWorld();
                doors.left.userData.origPos = doors.left.position.clone();

            }

            if ( item.name === 'door_right' ) {

                doors.right = item;
                doors.right.updateMatrixWorld();
                doors.right.userData.origPos = doors.right.position.clone();

            }

            if ( item.name === 'DoorLeft' ) {

                doors2.left = item;
                doors2.left.updateMatrixWorld();
                doors2.left.userData.origPos = doors2.left.position.clone();

            }

            if ( item.name === 'DoorRight' ) {

                doors2.right = item;
                doors2.right.updateMatrixWorld();
                doors2.right.userData.origPos = doors2.right.position.clone();

            }

        });

        app.add( doors.left );
        app.add( doors.right );
        app.add( doors2.left );
        app.add( doors2.right );
        app.add( podMesh );

        doors.colliderL = physics.addGeometry( doors.left );
        doors.colliderR = physics.addGeometry( doors.right );
        doors2.colliderL = physics.addGeometry( doors2.left );
        doors2.colliderR = physics.addGeometry( doors2.right );
        physics.addGeometry( podMesh );

    /*    var fileref=document.createElement("link")
        		fileref.setAttribute("rel", "stylesheet")
        		fileref.setAttribute("type", "text/css")
        		fileref.setAttribute("href", "./scenes/assets/combined-pod-main/chat/style.css");
        document.getElementsByTagName("head")[0].appendChild(fileref);
        var domoverlay = document.createElement( 'div' );
        domoverlay.id = "dom-overlay";
        domoverlay.innerHTML='<div id="dom-overlay-message"></div>';
*/


    });

    return app;

};
