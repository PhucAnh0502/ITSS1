export function getUserIdFromToken(){
  const token = sessionStorage.getItem("authToken");
  if (!token) return null;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
}

export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function createLocalSpotId(filterId, name) {
  const safeFilter = String(filterId || "local");
  const safeName = String(name || "unknown").toLowerCase();
  const slug = safeName.replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "spot";
  return `${safeFilter}-${slug}`;
}