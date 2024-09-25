import React, { useEffect } from "react";
import { Box, ImageList, ImageListItem, Typography, Dialog, DialogContent } from "@mui/material";
import { images } from "./static/110kChallenge2023/images";
import { GlobalStoreContext } from ".";
import { observer } from "mobx-react";
import { Keys } from "./Keys";

const Home = () => {
    const store = React.useContext(GlobalStoreContext);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === Keys.ArrowRight) {
                const currentIndex = images.findIndex(i => i.image === store.selectedImage);
                const nextIndex = (currentIndex + 1) % images.length;
                store.setSelectedImage(images[nextIndex].image);
            }

            if (event.key === Keys.ArrowLeft) {
                const currentIndex = images.findIndex(i => i.image === store.selectedImage);
                const nextIndex = (currentIndex - 1 + images.length) % images.length;
                store.setSelectedImage(images[nextIndex].image);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    });

    return (
        <Box sx={{ my: 4 }}>
            <ImageList variant="masonry" cols={4} gap={8}>
                {images.map((item, index) => (
                    <ImageListItem key={index} onClick={() => store.setSelectedImage(item.image)}>
                        <img src={item.image} alt={item.title} />
                    </ImageListItem>
                ))}
            </ImageList>
            <Dialog open={store.selectedImage != null} onClose={() => store.setSelectedImage(null)}>
                <DialogContent
                    style={{
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                        overflow: 'hidden',
                    }}
                >
                    {store.selectedImage && (
                        <img
                            src={store.selectedImage}
                            alt="Selected"
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                            }}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
}

export default observer(Home);