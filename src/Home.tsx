import React, { useState } from "react";
import { Box, ImageList, ImageListItem, Typography, Dialog, DialogContent } from "@mui/material";

import { images } from "./static/110kChallenge2023/images";

export default function Home() {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleClickOpen = (image) => {
        setSelectedImage(image);
    };

    const handleClose = () => {
        setSelectedImage(null);
    };

    return (
        <Box sx={{ my: 4 }}>
            <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
                Home
            </Typography>
            <ImageList variant="masonry" cols={4} gap={8}>
                {images.map((item, index) => (
                    <ImageListItem key={index} onClick={() => handleClickOpen(item.image)}>
                        <img src={item.image} alt={item.title} />
                    </ImageListItem>
                ))}
            </ImageList>
            <Dialog open={selectedImage != null} onClose={handleClose}>
                <DialogContent
                    style={{
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                        overflow: 'hidden',
                    }}
                >
                    {selectedImage && (
                        <img
                            src={selectedImage}
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