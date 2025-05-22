import { DEBUG, LOG } from '../utils/logger';

const showcase = document.getElementById('showcase') as HTMLIFrameElement;
const key = 'yxszifc05b1bidcsqfr60806d';
const smallBtn = document.getElementById("smallBtn");
const bigBtn = document.getElementById("bigBtn");

// augment window with the MP_SDK property
declare global {
  interface Window {
    MP_SDK: any;
  }
}
showcase.addEventListener('load', async function () {
  try {
    const mpSdk = await showcase.contentWindow.MP_SDK.connect(showcase, key, '3.6');
    transformtest(mpSdk);
  } catch (e) {
    console.error(e);
    return;
  }
});

/*=====================================================================================
  MP Transform Controls
  https://matterport.github.io/showcase-sdk/sdkbundle_components_transformcontrols.html
======================================================================================== */
async function transformtest(mpSdk: any) {

    // 1 - Add SCENE OBJECT 
    // https://matterport.github.io/showcase-sdk/sdkbundle_tutorials_using_scene_objects.html
    const [sceneObject] = await mpSdk.Scene.createObjects(2);

    // 2 - Add SCENE NODE
    //https://matterport.github.io/showcase-sdk/sdkbundle_architecture.html#scene-nodes
    const gltfNode = sceneObject.addNode();

    // 2a - Add some light to the Node
    gltfNode.addComponent("mp.directionalLight", { enabled: true, intensity: 1.5 });
    gltfNode.addComponent("mp.pointLight", { enabled: true, intensity: 1.5, decay: 5 });
    gltfNode.addComponent('mp.ambientLight', { enabled: true, intensity: 3.0 });

    // 3 - Initialized GLTF Loader properties 
    // https://matterport.github.io/showcase-sdk/sdkbundle_components_gltfloader.html
    const initial = {
        url: "http://raw.githubusercontent.com/mrdoob/three.js/refs/heads/dev/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf",
        visible: true,
        localScale: {
            x: 0.4, y: 0.4, z: 0.4
        },
        localPosition: {
            x: 0.24398916959762573,
            y: -0.2567730247974396,
            z: 0.0804542750120163
        },
        localRotation: {
            x: 0, y: 0, z:0
        },
        colliderEnabled: true
    };

    // 4 - Add GLTF Loader Component to the Node
    const gltfcomponent = gltfNode.addComponent('mp.gltfLoader', initial, 'test');

    // 5 - Add a second Node for the MP.TransformControls
    const transformControlNode = sceneObject.addNode();

    // 6 - Add MP.TranformControls Component to the second= Node
    const transformControls = transformControlNode.addComponent("mp.transformControls", {
        mode: "scale",
        selection: gltfNode,
        showX: true,
        showY: true,
        showZ: true,
        size: .35,
        visible: true,
    });

    // Some helpful logs, I hope
    console.log("=== transformControlNode", transformControlNode);
    console.log("=== transformControls", transformControls);
    console.log("=== gltfcomponent", gltfcomponent);


    // 7 - Set Transform control position
    transformControlNode.position.set(initial.localPosition.x,initial.localPosition.y-1,initial.localPosition.z);

    // 8 - Attach the model to the transform control
    transformControls.inputs.selection = gltfNode;

    // 9 - Add button click listeners
    smallBtn.addEventListener('click',function(){
        DEBUG("smallbtn",gltfcomponent.inputs.localScale);
        let localScale = gltfcomponent.inputs.localScale;
        let scale = {
            x:localScale.x-.25,
            y:localScale.y-.25,
            z:localScale.z-.25
        };
        // Set the localscale small
        gltfcomponent.inputs.localScale=scale;
      });
      bigBtn.addEventListener('click',function(){
        DEBUG("bigBtn",gltfcomponent.inputs.localScale);
        let localeScale = gltfcomponent.inputs.localScale;
        let scale = {
          x:localeScale.x+.25,
          y:localeScale.y+.25,
          z:localeScale.z+.25
        };
        // Set the localscale big
        gltfcomponent.inputs.localScale=scale;
    });

    // 9 - Start Nodes
    gltfNode.start();
    transformControlNode.start();

}