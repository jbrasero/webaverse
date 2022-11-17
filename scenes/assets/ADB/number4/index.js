import * as THREE from 'three';
import metaversefile from 'metaversefile';
import { GLTFLoader } from '../../../../packages/three/examples/jsm/loaders/GLTFLoader.js';
const {useApp, useFrame, useActivate, useLocalPlayer, useVoices, useChatManager, useLoreAI, useLoreAIScene, useAvatarAnimations, useLoaders ,useNpcManager, useScene, usePhysics, useCleanup} = metaversefile;

const baseUrl = import.meta.url.replace(/(\/)[^\/\\]*$/, '$1');

export default () => {
  const app = useApp();
  const scene = useScene();
  const npcManager = useNpcManager();
  const localPlayer = useLocalPlayer();
  const physics = usePhysics();
  const chatManager = useChatManager();
  const loreAIScene = useLoreAIScene();
  const voices = useVoices();

  //const animations = useAvatarAnimations();
  //const hurtAnimation = animations.find(a => a.isHurt);
  //const hurtAnimationDuration = hurtAnimation.duration;

  //let animations = [];
  let mixer = null;
  let clips = null;

  app.name = 'button';

  app.addEventListener('hit', e => {
    console.log("hit");
  });


  let targetSpec = null;
  useActivate(() => {
    console.log('activate button 4');


    var dbname="";

      function post() {
                //  var x = document.getElementById("mySelect").value;
                  var url = "http://localhost:3000/createAutonomousDatabase?compartmentId=ocid1.compartment.oc1..aaaaaaaakqwqnhktr7tdq3mqahejxaotzg4ejyce64yjtsmyqvzc7af4dq6a&cpuCoreCount=4";
                //  var data = { "name": x };
                  fetch(url, {
                      method: 'POST', // or 'PUT'
                    //  body: JSON.stringify(data), // data can be `string` or {object}!
                      headers: {
                          'Content-Type': 'application/json'
                      }
                  }).then(res => res.json())
                      .catch(error => console.error('Error:', error))
                      .then(response => {console.log('Success:', response); dbname=response.dbname;});
              }

    post();


    var overlay = document.createElement( 'div' );
    overlay.id = "KindQuestion2"
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
    overlay.style.font = 'normal 20px sans-serif';
    overlay.style.textAlign = 'center';
    overlay.style.opacity = '1';
    overlay.style.outline = 'none';
    overlay.style.zIndex = '999';
    overlay.innerHTML = "Great, 4 cores. \nWe are going to proceed to provision your ADB.\n\nWait a moment please.";
    document.body.appendChild( overlay );



    setTimeout(() => {
    const box = document.getElementById('KindQuestion2');
    box.style.display = 'none';
    var overlay = document.createElement( 'div' );
    overlay.id = "result"
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
    overlay.style.font = 'normal 20px sans-serif';
    overlay.style.textAlign = 'center';
    overlay.style.opacity = '1';
    overlay.style.outline = 'none';
    overlay.style.zIndex = '999';
    overlay.innerHTML = "Your 4 cores autonomous database '"+dbname+"' has been succesfully provisioned.";
    //alert('name:'+dbnameg);
    document.body.appendChild( overlay );

    setTimeout(() => {
    const box = document.getElementById('result');
    box.style.display = 'block';
  }, 12000);
  }, 6000);

  /*  const button = document.createElement( 'button' );
    button.style.cursor = 'pointer';
    button.id = 'button2';
    button.style.left = 'calc(50% - 50px)';
    button.style.width = '50px';
    button.textContent = '2';
    button.style.position = 'absolute';
    button.style.bottom = '350px';
    button.style.padding = '12px 6px';
    button.style.border = '1px solid #fff';
    button.style.borderRadius = '4px';
    button.style.background = 'rgba(0,0,0,0.5)';
    button.style.color = '#fff';
    button.style.font = 'normal 14px sans-serif';
    button.style.textAlign = 'center';
    button.style.opacity = '1';
    button.style.outline = 'none';
    button.style.zIndex = '999';
    document.body.appendChild( button );


    const button2 = document.createElement( 'button' );
    button2.style.cursor = 'pointer';
    button2.id = 'button4';
    button2.style.left = 'calc(50% - 50px)';
    button2.style.width = '50px';
    button2.textContent = '4';
    button2.style.position = 'absolute';
    button2.style.bottom = '310px';
    button2.style.padding = '12px 6px';
    button2.style.border = '1px solid #fff';
    button2.style.borderRadius = '4px';
    button2.style.background = 'rgba(0,0,0,0.5)';
    button2.style.color = '#fff';
    button2.style.font = 'normal 14px sans-serif';
    button2.style.textAlign = 'center';
    button2.style.opacity = '1';
    button2.style.outline = 'none';
    button2.style.zIndex = '999';
    document.body.appendChild( button2 );


        document.getElementById("button2").addEventListener("click", set2, false);
        document.getElementById("button4").addEventListener("click", set4, false);*/

      /*  function set2() {
        	console.log("hago click en 2");
          const box2 = document.getElementById('button2');
          box2.style.display = 'none';
          const box4 = document.getElementById('button4');
          box4.style.display = 'none';
        }
        function set4() {
          console.log("hago click en 4");
          const box2 = document.getElementById('button2');
          box2.style.display = 'none';
          const box4 = document.getElementById('button4');
          box4.style.display = 'none';
        }
*/

});

  useFrame(({timeDiff}) => {

    if(mixer) {
      //console.log("using frame");
      //console.log("Postion: " +localPlayer.position);
      const deltaSeconds = timeDiff / 1000;
      mixer.update(deltaSeconds);
      app.updateMatrixWorld();
    }

  });


  let physicsIds = [];
  (async () => {
    const u = `${baseUrl}number4.glb`;
    let o = await new Promise((accept, reject) => {
      const {gltfLoader} = useLoaders();
      gltfLoader.load(u, accept, function onprogress() {}, reject);
    });
    mixer = new THREE.AnimationMixer( o.scene );
    clips = o.animations;

    o = o.scene;

    o.traverse(obj => {
      if(obj.isMesh) {
        obj.castShadow = true;
      }
    });

    app.add(o);

    const physicsId = physics.addGeometry(o);
    physicsIds.push(physicsId);
  })();












  useCleanup(() => {
    for (const physicsId of physicsIds) {
      console.log("using Cleanup");
      physics.removeGeometry(physicsId);
    }
  });

  return app;
};
