import PhotoAlbum from "react-photo-album"
import photos from "components/Image/photos"

export default function PhotoGallery() {
  return (
    <PhotoAlbum
      photos={photos}
      layout="masonry"
    />
  )
}
