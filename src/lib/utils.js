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