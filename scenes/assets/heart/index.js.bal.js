import * as THREE from 'three';
import metaversefile from 'metaversefile';
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
  let live = true;

  app.name = 'heart';

  app.addEventListener('hit', e => {
    _playAnimation();
  });

  const _playAnimation = () => {
    if(clips && mixer) {
      console.log("using _playAnimation");
    }
  }

    app.addEventListener('hit', e => {
       console.log("hit");
    });

  let targetSpec = null;


  useActivate(() => {
    console.log('activate heart');
    activateCb && activateCb();
});

  useFrame(({timeDiff}) => {

    if(mixer) {
      //console.log("using frame");
    //  console.log(localPlayer.position);
      const deltaSeconds = timeDiff / 1000;
      mixer.update(deltaSeconds);
      app.updateMatrixWorld();
    }

  });


  let physicsIds = [];
  (async () => {
    const u = `${baseUrl}heart.glb`;
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
