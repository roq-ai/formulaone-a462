const mapping: Record<string, string> = {
  organizations: 'organization',
  races: 'race',
  timers: 'timer',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
