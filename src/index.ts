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
    const mpSdk = await showcase.contentWindow.MP_SDK.connect(showcase, key, '3.6');
    transformtest(mpSdk);
  } catch (e) {
    console.error(e);
    return;
  }
});