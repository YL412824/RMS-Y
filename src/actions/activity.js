export const ACTIVITY_NAMESPACE = 'activity';

export function ACTIVITY_LIST(payload) {
  return {
    type: `${ACTIVITY_NAMESPACE}/fetchList`,
    payload,
  };
}

export function ACTIVITY_INIT() {
  return {
    type: `${ACTIVITY_NAMESPACE}/fetchInit`,
    payload: { code: 'activity' },
  };
}

export function ACTIVITY_DETAIL(id) {
  return {
    type: `${ACTIVITY_NAMESPACE}/fetchDetail`,
    payload: { id },
  };
}

export function ACTIVITY_SUBMIT(payload) {
  return {
    type: `${ACTIVITY_NAMESPACE}/submit`,
    payload,
  };
}

export function ACTIVITY_REMOVE(payload) {
  return {
    type: `${ACTIVITY_NAMESPACE}/remove`,
    payload,
  };
}
