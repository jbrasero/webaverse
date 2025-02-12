import * as THREE from 'three';
import metaversefile from 'metaversefile';
const {useApp, useFrame, useActivate, useLocalPlayer, useVoices, useChatManager, useLoreAI, useLoreAIScene, useAvatarAnimations, useNpcManager, useScene, usePhysics, useCleanup} = metaversefile;

const localVector = new THREE.Vector3();

export default e => {
  const app = useApp();
  const scene = useScene();
  const npcManager = useNpcManager();
  const localPlayer = useLocalPlayer();
  const physics = usePhysics();
  const chatManager = useChatManager();
  const loreAIScene = useLoreAIScene();
  const voices = useVoices();
  const animations = useAvatarAnimations();
  const hurtAnimation = animations.find(a => a.isHurt);
  const hurtAnimationDuration = hurtAnimation.duration;

  const mode = app.getComponent('mode') ?? 'attached';

  let keyW = false;
     document.addEventListener("keydown", onDocumentKeyDown, false);
     document.addEventListener('keyup', onDocumentKeyUp);
     function onDocumentKeyDown(event) {
         var keyCode = event.which;
         if (keyCode == 87) { // W
             keyW = true;
         }
    };
    function onDocumentKeyUp(event) {
       var keyCode = event.which;
       if (keyCode == 87) { // W
           keyW = false;
       }
     };


  if (mode === 'attached') {
    const npcName = app.getComponent('name') ?? 'Dra. Webster';
    const npcVoiceName = app.getComponent('voice') ?? 'Maud Pie';
    const npcBio = app.getComponent('bio') ?? 'A Doctor avatar';

  //  const baseUrl = import.meta.url.replace(/(\/)[^\/\/]*$/, '$1');

    const npcAvatarUrl = app.getComponent('avatarUrl') ?? `/scenes/assets/doctor/wedo-doctor.vrm`;
    let npcWear = app.getComponent('wear') ?? [];
    if (!Array.isArray(npcWear)) {
      npcWear = [npcWear];
    }

    let live = true;
    let vrmApp = null;
    let npcPlayer = null;
    e.waitUntil((async () => {
      const u2 = npcAvatarUrl;
      const m = await metaversefile.import(u2);
      if (!live) return;

      vrmApp = metaversefile.createApp({
        name: u2,
      });

      vrmApp.matrixWorld.copy(app.matrixWorld);
      vrmApp.matrix.copy(app.matrixWorld)
        .decompose(vrmApp.position, vrmApp.quaternion, vrmApp.scale);
      vrmApp.name = 'npc';
      vrmApp.setComponent('physics', true);
      vrmApp.setComponent('activate', true);

      await vrmApp.addModule(m);
      if (!live) return;

      const position = vrmApp.position.clone()
      .add(new THREE.Vector3(23.30,0,-15.27));
      const {quaternion, scale} = vrmApp;
      const newNpcPlayer = await npcManager.createNpcAsync({
        name: npcName,
        avatarUrl: npcAvatarUrl,
        position: position,
        quaternion: quaternion,
        scale: scale,
        detached: true,
      });


      if (!live) return;

      const _updateWearables = async () => {
        const wearablePromises = npcWear.map(wear => (async () => {
          const {start_url} = wear;
          const app = await metaversefile.createAppAsync({
            start_url,
          });
          if (!live) return;

          newNpcPlayer.wear(app);
        })());
        await wearablePromises;
      };
      await _updateWearables();
      if (!live) return;

      const _setVoice = () => {
        const voice = voices.voiceEndpoints.find(v => v.name === npcVoiceName);
        if (voice) {
          newNpcPlayer.setVoiceEndpoint(voice.drive_id);
        } else {
          console.warn('unknown voice name', npcVoiceName, voices.voiceEndpoints);
        }
      };
      _setVoice();

      scene.add(vrmApp);

      npcPlayer = newNpcPlayer;
    })());

    app.getPhysicsObjectsOriginal = app.getPhysicsObjects;
    app.getPhysicsObjects = () => {
      return npcPlayer ? app.getPhysicsObjectsOriginal() : [];
    };
  //  app.getPhysicsObjects = () => npcPlayer ? [npcPlayer.characterController] : [];

    app.addEventListener('hit', e => {
      if (!npcPlayer.hasAction('hurt')) {
        const newAction = {
          type: 'hurt',
          animation: 'pain_back',
        };
        npcPlayer.addAction(newAction);

        setTimeout(() => {
          npcPlayer.removeAction('hurt');
        }, hurtAnimationDuration * 1000);
      }
    });

    let targetSpec = null;
    useActivate(() => {
       console.log('activate npc');
      if (targetSpec?.object !== localPlayer) {
        targetSpec = {
          type: 'follow',
          object: localPlayer,
        };
      } else {
        targetSpec = null;
      }
    });

     console.log('got deets', {
      npcName,
      npcVoiceName,
      npcBio,
      npcAvatarUrl,
    });

    const character = loreAIScene.addCharacter({
      name: npcName,
      bio: npcBio,
    });
     console.log('got character', character);
    character.addEventListener('say', e => {
      console.log('got character say', e.data);
      const {message, emote, action, object, target} = e.data;
      chatManager.addPlayerMessage(npcPlayer, message);
      if (emote === 'supersaiyan' || action === 'supersaiyan' || /supersaiyan/i.test(object) || /supersaiyan/i.test(target)) {
        const newSssAction = {
          type: 'sss',
        };
        npcPlayer.addAction(newSssAction);
      } else if (action === 'follow' || (object === 'none' && target === localPlayer.name)) { // follow player
        targetSpec = {
          type: 'follow',
          object: localPlayer,
        };
      } else if (action === 'stop') { // stop
        targetSpec = null;
      } else if (action === 'moveto' || (object !== 'none' && target === 'none')) { // move to object
        console.log('move to object', object);
        /* target = localPlayer;
        targetType = 'follow'; */
      } else if (action === 'moveto' || (object === 'none' && target !== 'none')) { // move to player
        // console.log('move to', object);
        targetSpec = {
          type: 'moveto',
          object: localPlayer,
        };
      } else if (['pickup', 'grab', 'take', 'get'].includes(action)) { // pick up object
        console.log('pickup', action, object, target);
      } else if (['use', 'activate'].includes(action)) { // use object
        console.log('use', action, object, target);
      }
    });

    const slowdownFactor = 0.4;
    const walkSpeed = 0.075 * slowdownFactor;
    const runSpeed = walkSpeed * 8;
    const speedDistanceRate = 0.07;
    useFrame(({timestamp, timeDiff}) => {

  /*    if(keyW) {
              console.log("pisa W");
            }*/

      if (npcPlayer && physics.getPhysicsEnabled()) {
        if (targetSpec) {
          const target = targetSpec.object;
          const v = localVector.setFromMatrixPosition(target.matrixWorld)
            .sub(npcPlayer.position);
          v.y = 0;
          const distance = v.length();
          if (targetSpec.type === 'moveto' && distance < 2) {
            targetSpec = null;
          } else {
            const speed = Math.min(Math.max(walkSpeed + ((distance - 1.5) * speedDistanceRate), 0), runSpeed);
            v.normalize()
              .multiplyScalar(speed * timeDiff);
            npcPlayer.characterPhysics.applyWasd(v);
          }
        }

        npcPlayer.eyeballTarget.copy(localPlayer.position);
        npcPlayer.eyeballTargetEnabled = true;

        npcPlayer.updatePhysics(timestamp, timeDiff);
        npcPlayer.updateAvatar(timestamp, timeDiff);
      }
    });

    useCleanup(() => {
      live = false;

      scene.remove(vrmApp);

      if (npcPlayer) {
        npcPlayer.destroy();
      }

      loreAIScene.removeCharacter(character);
    });
  }

  return app;
};
