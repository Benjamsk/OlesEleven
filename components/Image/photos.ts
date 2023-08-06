import images from "./images.json"

const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48]

const photoUri = (id: string) => `/${id}`

const photos = images.Photos.map((photo) => ({
  src: photoUri(photo.id),
  width: photo.width,
  height: photo.height,
  srcSet: breakpoints.map((breakpoint) => {
    const height = Math.round((photo.height / photo.width) * breakpoint)
    return {
      src: photoUri(photo.id),
      width: breakpoint,
      height,
    }
  }),
}))

export default photos
