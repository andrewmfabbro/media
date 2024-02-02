function PhotosListItem({ photo }) {
  return (
    <div className="relative m-2">
      <img className="h-20 w-20" src={photo.url} alt="random pic" />
    </div>
  );
}

export default PhotosListItem;
