import { types } from 'mobx-state-tree';
import { Page } from './Page';

export const AppStore = types.model('AppStore', {
    selectedTab: types.enumeration(Object.values(Page)),
    selectedImage: types.maybeNull(types.string),
}).actions(self => ({
    setSelectedTab(page: Page) {
        self.selectedTab = page;
    },
    setSelectedImage(image: string | null) {
        self.selectedImage = image;
    },
}));


export type IAppStore = ReturnType<typeof AppStore.create>;