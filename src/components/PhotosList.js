import { useFetchPhotosQuery } from "../store";

function PhotosList({ album }){
    useFetchPhotosQuery(album);
    
    return 'PhotosList'
}

export default PhotosList;