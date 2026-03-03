export const PERSONA_PORTALS = {
  athlete: '/athlete/overview',
  director: '/director/dashboard',
  business: '/dashboard/overview',
}

export function getPersonaPortalPath(persona) {
  return PERSONA_PORTALS[persona] ?? '/onboarding'
}
