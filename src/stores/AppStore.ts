import { types } from 'mobx-state-tree';
import { Page } from './Page';

export const AppStore = types.model('AppStore', {
    selectedTab: types.enumeration(Object.values(Page)),
}).actions(self => ({
    setSelectedTab(page: Page) {
        self.selectedTab = page;
    },
}));


export type IAppStore = ReturnType<typeof AppStore.create>;