import { types } from 'mobx-state-tree';
import { Page } from './Page';

export const AppStore = types.model('AppStore', {
    selectedTab: types.enumeration('Page', Object.values(Page)),
}).actions(self => ({
    setSelectedTab(page: Page) {
        self.selectedTab = page;
        console.log('Selected tab:', page);
    },
}));


export type IAppStore = ReturnType<typeof AppStore.create>;