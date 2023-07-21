const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48]

const unsplashLink = (id: string) => `/${id}`

const unsplashPhotos = [
  { id: "10km.jpg", width: 1080, height: 1620 },
  { id: "30km.jpg", width: 1080, height: 1620 },
  { id: "40km.jpg", width: 1080, height: 1620 },
  { id: "50km.jpg", width: 1080, height: 1620 },
  { id: "foreverroad.jpg", width: 1080, height: 800 },
  { id: "60km.jpg", width: 1080, height: 1620 },
  { id: "70km.jpg", width: 1080, height: 1620 },
]

const photos = unsplashPhotos.map((photo) => ({
  src: unsplashLink(photo.id),
  width: photo.width,
  height: photo.height,
  srcSet: breakpoints.map((breakpoint) => {
    const height = Math.round((photo.height / photo.width) * breakpoint)
    return {
      src: unsplashLink(photo.id),
      width: breakpoint,
      height,
    }
  }),
}))

export default photos
