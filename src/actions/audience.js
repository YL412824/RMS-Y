export const AUDIENCE_NAMESPACE = 'audience';

export function AUDIENCE_LIST(payload) {
  return {
    type: `${AUDIENCE_NAMESPACE}/fetchList`,
    payload,
  };
}

export function AUDIENCE_DETAIL(id) {
  return {
    type: `${AUDIENCE_NAMESPACE}/fetchDetail`,
    payload: { id },
  };
}

export function AUDIENCE_CLEAR_DETAIL() {
  return {
    type: `${AUDIENCE_NAMESPACE}/clearDetail`,
    payload: {},
  };
}

export function AUDIENCE_SUBMIT(payload) {
  return {
    type: `${AUDIENCE_NAMESPACE}/submit`,
    payload,
  };
}

export function AUDIENCE_REMOVE(payload) {
  return {
    type: `${AUDIENCE_NAMESPACE}/remove`,
    payload,
  };
}
