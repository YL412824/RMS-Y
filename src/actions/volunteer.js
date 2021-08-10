export const VOLUNTEER_NAMESPACE = 'volunteer';

export function VOLUNTEER_LIST(payload) {
  return {
    type: `${VOLUNTEER_NAMESPACE}/fetchList`,
    payload,
  };
}

export function VOLUNTEER_INIT() {
  return {
    type: `${VOLUNTEER_NAMESPACE}/fetchInit`,
    payload: { code: 'volunteer' },
  };
}

export function VOLUNTEER_DETAIL(id) {
  return {
    type: `${VOLUNTEER_NAMESPACE}/fetchDetail`,
    payload: { id },
  };
}

export function VOLUNTEER_SUBMIT(payload) {
  return {
    type: `${VOLUNTEER_NAMESPACE}/submit`,
    // type: `${VOLUNTEER_NAMESPACE}/insert`,
    payload,
  };
}

export function VOLUNTEER_REMOVE(payload) {
  return {
    type: `${VOLUNTEER_NAMESPACE}/remove`,
    payload,
  };
}
