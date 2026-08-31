export function requireRole(user, allowedRoles) {
  if (!allowedRoles.includes(user.role.name)) {
    throw new Response("Accès refusé", { status: 403 });
  }
}
