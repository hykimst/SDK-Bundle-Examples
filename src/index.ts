import { myOpenTagsAndHover } from "./myOpenTagsHover";
import { myRegisterAttachment } from "./registerAttachment";

const showcase = document.getElementById('showcase') as HTMLIFrameElement;
const logsElement = document.getElementById('log-list') as HTMLElement;
const key = 'yxszifc05b1bidcsqfr60806d';

// declare this file is a module
export {};

// augment window with the MP_SDK property
declare global {
  interface Window {
    MP_SDK: any;
  }
}
showcase.addEventListener('load', async function () {
  try {
    await showcase.contentWindow.MP_SDK.connect(showcase, key, '3.6')
      .then(onShowcaseConnect)
      .catch(console.error);
  } catch (e) {
    console.error(e);
    return;
  }

  async function onShowcaseConnect(SDK: any) {
    // Register Attachment Example
    // myRegisterAttachment(SDK);

    // Hover & Open Example
    myOpenTagsAndHover(SDK,logsElement);
  }
});
