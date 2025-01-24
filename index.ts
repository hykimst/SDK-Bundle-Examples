const showcase = document.getElementById('showcase') as HTMLIFrameElement;
const key = '{ADD_YOUR_KEY}';

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
    // Tag - customize existing tags

    const TAGID = 'pEcaKEQKfmX';
    const DELETETHIS = 'https://www.youtube.com/watch?v=fm_HkSyNq-8';
    const ADDTHIS = 'https://www.youtube.com/watch?v=u2gPD38Yimg';

    // Open Tag
    SDK.Tag.open(TAGID);

    // 1 - Register - https://matterport.github.io/showcase-sdk/docs/reference/current/modules/tag.html#registerattachment
    await SDK.Tag.registerAttachment(ADDTHIS);

    // 2 - Update the TAG
    SDK.Tag.attachments.subscribe({
      onAdded: function (index: any, item: any, collection: any) {
        // Deleting the youtube added into the TAG
        // https://matterport.github.io/showcase-sdk/docs/reference/current/modules/tag.html#detach
        if (item.src == DELETETHIS) {
          console.log('=== DETACH', item);
          SDK.Tag.detach(TAGID, item.id);
        }
        // Adding the a new youtube url to the tag
        // https://matterport.github.io/showcase-sdk/docs/reference/current/modules/tag.html#attach
        if (item.src === ADDTHIS) {
          SDK.Tag.attach(TAGID, item.id);
        }
        // Closing the Tag in the model
        SDK.Tag.close(TAGID);
      },
      onCollectionUpdated(collection: any) {},
    });

    // 3 - Display any changes made to the Tags
    SDK.Tag.data.subscribe({
      onAdded: function (index: any, item: any, collection: any) {
        if (item.id == TAGID) {
          console.log('onAdded', item.attachments);
        }
      },
      onRemoved: function (index: any, item: any, collection: any) {
        console.log('onRemoved', item);
      },
      onCollectionUpdated: function (collection: any) {
        console.log('All done!', collection);
        SDK.Tag.open(TAGID);
      },
    });
  }
});
