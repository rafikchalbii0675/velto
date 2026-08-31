export function verifyVeltoToken(request) {
  const token = request.headers.get("X-Velto-Token");
  return token === process.env.VELTO_API_SECRET;
}
