import { DEBUG, LOG, ADDELEMENT } from '../utils/logger';

let TAGS:any = [];

export async function myOpenTagsAndHover(mpSdk: any, logs: HTMLElement) {

  const openTagSubscription = await mpSdk.Tag.openTags.subscribe({
    prevState: {
      hovered: null,
      docked: null,
      selected: null,
    },
    onChanged(newState:any) {
      // only compare the first 'selected' since only one tag is currently supported
      const [selected = null] = newState.selected; // destructure and coerce the first Set element to null
      if (selected !== this.prevState.selected) {
        if (selected) {
          DEBUG(selected, 'was selected');
          mpSdk.Tag.open(selected, { force: true });
          ADDELEMENT(logs, 'p', 'Open TAGID#', selected);
        } else {
          DEBUG(this.prevState.selected, 'was deselected');
          mpSdk.Tag.close(this.prevState.selected, { force: true });
          ADDELEMENT(logs, 'p', 'Close TAGID#', this.prevState.selected);
        }
      }
      // clone and store the new state
      this.prevState = {
        ...newState,
        selected,
      };
    },
  });


  // Observe Tags
  const tagSubscription = await mpSdk.Tag.data.subscribe({
    onAdded(index:any, item:any, collection:any) {
      if (item.id === 'test') {
        LOG('[MyOpenTagsHover-Tag] onAdded', index, item, collection, TAGS);
      }
    },
    onRemoved(index:any, item:any, collection:any) {
      if (item.id === 'test') {
        LOG('[MyOpenTagsHover-Tag] onRemoved', index, item, collection);
      }
    },
    onUpdated(index:any, item:any, collection:any) {
      if (item.id === 'test') {
        LOG('[MyOpenTagsHover-Tag] onUpdated', index, item, collection);
      }
    },
    onCollectionUpdated(collection:any) {
      for (const [key, value] of Object.entries(collection)) {
        TAGS.push(key);
        ADDELEMENT(logs, 'li', 'TagID#', key);
        mpSdk.Tag.allowAction(key, {
          opening: false,
          navigation: true,
        });
      }
      LOG('[MyOpenTagsHover-Tag] onCollectionUpdated', TAGS);
    },
  });

  openTagSubscription.cancel();
  tagSubscription.cancel();
}