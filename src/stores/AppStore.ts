import { types } from 'mobx-state-tree';

export const AppStore = types.model('AppStore', {
    selectedTab: types.number,
}).actions(self => ({
    setSelectedTab(tab: number) {
        self.selectedTab = tab;
    },
}));


export type IAppStore = ReturnType<typeof AppStore.create>;