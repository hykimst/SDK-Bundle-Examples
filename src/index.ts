import { myOpenTagsAndHover } from "./myOpenTagsHover";
import { SDK_KEY } from '../private_keys';

const showcase = document.getElementById('showcase') as HTMLIFrameElement;
const logsElement = document.getElementById('log-list') as HTMLElement;

// Add your SDK Key
if (!!showcase) {
  const src = "/bundle/showcase.html?m=RzQeGZjRcCs&play=1&qs=1&log=0&applicationKey="+ SDK_KEY;
  showcase.setAttribute('src', src);
}

// augment window with the MP_SDK property
declare global {
  interface Window {
    MP_SDK: any;
  }
}

// When the whole page loadss 
showcase.addEventListener('load', async function () {
  try {
    await showcase.contentWindow.MP_SDK.connect(showcase, SDK_KEY, '3.6')
      .then(onShowcaseConnect)
      .catch(console.error);
  } catch (e) {
    console.error(e);
    return;
  }

  async function onShowcaseConnect(SDK: any) {
    // Hover & Open Example
    myOpenTagsAndHover(SDK, logsElement);
  }
});
