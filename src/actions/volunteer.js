export const VOLUNTEER_NAMESPACE = 'volunteer';

export function VOLUNTEER_LIST(payload) {
  return {
    type: `${VOLUNTEER_NAMESPACE}/fetchList`,
    payload,
  };
}
