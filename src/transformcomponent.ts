import { DEBUG, LOG } from '../utils/logger';

const smallBtn = document.getElementById("smallBtn");
const bigBtn = document.getElementById("bigBtn");

async function transformtest(mpSdk: any, logs: HTMLElement, position: any) {

    // 1 - SCENE OBJECT 
    const [sceneObject] = await mpSdk.Scene.createObjects(2);

    // 2 - SCENE NODE
    const gltfNode = sceneObject.addNode();
    gltfNode.addComponent("mp.directionalLight", { enabled: true, intensity: 1.5 });
    gltfNode.addComponent("mp.pointLight", { enabled: true, intensity: 1.5, decay: 5 });
    gltfNode.addComponent('mp.ambientLight', { enabled: true, intensity: 3.0 });

    DEBUG("transform", mpSdk, position);

    // 3 - Add GLTF Loader properties - https://matterport.github.io/showcase-sdk/sdkbundle_components_gltfloader.html
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
    // 4 - Add Component
    const gltfcomponent = gltfNode.addComponent('mp.gltfLoader', initial, 'test');

    // 5 - Control Node
    const transformControlNode = sceneObject.addNode();
    const transformControls = transformControlNode.addComponent("mp.transformControls", {
        mode: "scale",
        selection: gltfNode,
        showX: true,
        showY: true,
        showZ: true,
        size: .35,
        visible: true,
    });

    console.log("=== transformControlNode", transformControlNode);
    console.log("=== transformControls", transformControls);
    console.log("=== gltfcomponent", gltfcomponent);


    // Initial position
    transformControlNode.position.set(initial.localPosition.x,initial.localPosition.y-1,initial.localPosition.z);

    // Attach the model to the transform control
    transformControls.inputs.selection = gltfNode;

    // 7 - Add SpyEvent
    const event = sceneObject.addEventPath(transformControls, 'INTERACTION.DRAG', 'true');
    const emit = sceneObject.addEmitPath(gltfcomponent, "INTERACTION.CLICK");
    sceneObject.spyOnEvent({
        path: emit,
        onEvent(payload: any) {
            LOG('ClickSpy', payload);
        }
    });

    smallBtn.addEventListener('click',function(){
        DEBUG("smallbtn",gltfcomponent.inputs.localScale);
        let localScale = gltfcomponent.inputs.localScale;
        let scale = {
            x:localScale.x-.25,
            y:localScale.y-.25,
            z:localScale.z-.25
        };
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
        gltfcomponent.inputs.localScale=scale;
    });
    sceneObject.bindPath(event, emit);
    gltfNode.start();
    transformControlNode.start();

}
export default transformtest;