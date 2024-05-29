import { convertToEuro } from "../utils/currency";
export const usePropertyFormat = (property) => {
  if (!property) return {};

  const address = property.location ? property.location.map((item) => item.name).join(", ") : 'Unknown Address';
  const coverPhoto = property.coverPhoto ? property.coverPhoto.url : '/images/noresult.svg'; 
  const propertyType = `${property.category?.[0]?.name || ''}, ${property.category?.[1]?.name || ''}`;
  const price = property.price ? convertToEuro(property.price) : 'N/A';
  const title = property.title || 'No Title';
  const rooms = property.rooms || 'N/A';
  const baths = property.baths || 'N/A';
  const purpose = property.purpose || 'N/A';
  const sqSize = property.area ? property.area.toFixed(2) : 'N/A';
  const externalID = property.externalID || 'N/A';
  
  const photos = property.photos?.map((photo) => photo.url) || [];
  const description = property.description || 'No Description';
  const coverVideoUrl = property.coverVideo?.url || '';
  const coverVideo = coverVideoUrl.slice(coverVideoUrl.length - 11); 
  const panoramas = property.panoramas?.length ? property.panoramas[0].url : [];
  const amenities = property.amenities?.flatMap(({ amenities }) => amenities).map((item) => item?.text || 'Unknown Amenity') || [];
  const furnished = property.furnishingStatus || 'N/A';

  return {
    address,
    coverPhoto,
    propertyType,
    price,
    title,
    rooms,
    baths,
    purpose,
    sqSize,
    externalID,
    photos,
    description,
    coverVideo,
    amenities,
    panoramas,
    furnished
  }
}