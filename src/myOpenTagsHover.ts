import { DEBUG, LOG, ADDELEMENT } from '../utils/logger';

let TAGS:any = [];

export async function myOpenTagsAndHover(mpSdk: any, logs: HTMLElement) {

  mpSdk.Tag.openTags.subscribe({
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
  mpSdk.Tag.data.subscribe({
    onAdded(index:any, item:any, collection:any) {
      if (item.id === 'test') {
        LOG('Tag added to the collection', index, item, collection, TAGS);
      }
    },
    onRemoved(index:any, item:any, collection:any) {
      if (item.id === 'test') {
        LOG('Tag removed from the collection', index, item, collection);
      }
    },
    onUpdated(index:any, item:any, collection:any) {
      if (item.id === 'test') {
        LOG('Tag updated in place in the collection', index, item, collection);
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
      LOG('The full collection of Tags', TAGS);
    },
  });
}