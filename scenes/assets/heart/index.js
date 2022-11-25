import * as THREE from 'three';
// import easing from './easing.js';
import metaversefile from 'metaversefile';
const {useApp, useFrame, useActivate, useLocalPlayer, useVoices, useChatManager, useLoreAI, useLoreAIScene, useAvatarAnimations, useLoaders ,useNpcManager, useScene, usePhysics, useCleanup , addTrackedApp, useDropManager, useDefaultModules, } = metaversefile;

const baseUrl = import.meta.url.replace(/(\/)[^\/\\]*$/, '$1');

export default e => {
  const app = useApp();
  const physics = usePhysics();
  const dropManager = useDropManager();
  const npcManager = useNpcManager();
  const localPlayer = useLocalPlayer();
  const chatManager = useChatManager();
  const loreAIScene = useLoreAIScene();
  const voices = useVoices();

  app.name = 'heart';

  let activateCb = null;
  let frameCb = null;
  let mixer = null;
  let clips = null;
  let targetSpec = null;


  app.addEventListener('hit', e => {
    _playAnimation();
  });

  const _playAnimation = () => {
    if(clips && mixer) {
      console.log("using _playAnimation");
    }
  }


  useActivate(() => {
    console.log('activate heart');
    activateCb && activateCb();
  });

/*  useFrame(({timeDiff}) => {

          if(mixer) {
            const deltaSeconds = timeDiff / 1000;
            mixer.update(deltaSeconds);
            app.updateMatrixWorld();
          }
          frameCb && frameCb();

    });*/

  useFrame(() => {
    frameCb && frameCb();
  });



  let live = true;
  let reactApp = null;
  let physicsIds = [];

//  e.waitUntil((async () => {
  (async () => {
    const u = `${baseUrl}heart.glb`;
    let o = await new Promise((accept, reject) => {
      const {gltfLoader} = useLoaders();
      gltfLoader.load(u, accept, function onprogress() {}, reject);
    });


    if (!live) {
      o.destroy();
      return;
    }
    mixer = new THREE.AnimationMixer( o.scene );
    clips = o.animations;

    const {animations} = o;
    o = o.scene;
    o.traverse(obj => {
      if(obj.isMesh) {
        obj.castShadow = true;
      }
    });
    app.add(o);

    //



    {
      const u = `${baseUrl}inventory-banner.react`;
      reactApp = await metaversefile.createAppAsync({
        start_url: u,
      });
      if (!live) {
        reactApp.destroy();
        return;
      }
      reactApp.position.y = 0.75;
      app.add(reactApp);
      reactApp.updateMatrixWorld();
    }

    //



    const physicsId = physics.addGeometry(o);
    physicsIds.push(physicsId);

  //  const
    //const mixer = new THREE.AnimationMixer(o);
    const actions = animations.map(animationClip => mixer.clipAction(animationClip));

    const startOffset = 1;
    const endOffset = 2;
    const dropOffset = 1;
    activateCb = () => {
      // console.log('got activate');

      for (const action of actions) {
        action.reset();
        action.play();
        action.time = startOffset;
      }

      let timeAcc = 0;
      let lastUpdateTime = Date.now();
      let dropped = false;
      function animate() {
        const now = Date.now();
        const timeDiff = (now - lastUpdateTime) / 1000;
        lastUpdateTime = now;

        timeAcc += timeDiff;
        if (!dropped && timeAcc >= dropOffset) {
          const {moduleUrls} = useDefaultModules();


          const dropManager = useDropManager();

          dropManager.createDropApp({
            // type: 'minor',
            type: 'major',
            // start_url: moduleUrls.silk,
            start_url: 'https://webaverse.github.io/uzi/index.js',
            components: [
              {
                key: 'appName',
                // value: 'Silk'
                value: 'Axe'
              },
              {
                key: 'appUrl',
                // value: moduleUrls.silk
                value: 'https://webaverse.github.io/uzi/index.js'
              }
            ],
            position: app.position.clone()
              .add(new THREE.Vector3(0, 0.7, 0)),
            quaternion: app.quaternion,
            scale: app.scale
          });

          dropped = true;
        }
        if (timeAcc >= endOffset) {
          frameCb = null;
        } else {
          mixer.update(timeDiff);

      //  const deltaSeconds = timeDiff / 1000;
      //    mixer.update(deltaSeconds);
          app.updateMatrixWorld();

          mixer.getRoot().updateMatrixWorld();
        }
      }
      frameCb = animate;
    };
//  })());
  })();

  useCleanup(() => {
    live = false;
    reactApp && reactApp.destroy();
    for (const physicsId of physicsIds) {
      physics.removeGeometry(physicsId);
    }
  });

  return app;
};
