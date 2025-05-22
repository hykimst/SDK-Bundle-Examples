import { DEBUG, LOG } from '../utils/logger';
import transformtest from "./transformcomponent";

const showcase = document.getElementById('showcase') as HTMLIFrameElement;
const key = 'yxszifc05b1bidcsqfr60806d';

// augment window with the MP_SDK property
declare global {
  interface Window {
    MP_SDK: any;
  }
}
showcase.addEventListener('load', async function () {
  try {
    await showcase.contentWindow.MP_SDK.connect(showcase, key, '3.6')
      .then(MPTransformTest)
      .catch(console.error);
  } catch (e) {
    console.error(e);
    return;
  }
  
  let added = false;
  async function MPTransformTest(SDK: any) {
    SDK.Tag.data.subscribe({
      onAdded(index: any, item: any, collection: any) {
        if (!added) {
          LOG('[Tag] onAdded', index, item, collection);
          // MP Transform Test
          transformtest(SDK);
          added = true;
        }
      },
    });

  }
});