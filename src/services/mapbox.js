import { MAPBOX_KEY } from "./config.mjs";

export async function mapboxAPI(searchTerm, limit = 1) {
  return await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/` +
    `${searchTerm}.json?` +
    `type=address&` +
    `proximity=ip&` +
    `limit=` + limit + "&" +
    `access_token=${MAPBOX_KEY}`
  )
    .then((res) => res.json()).then(json => json.features);
}