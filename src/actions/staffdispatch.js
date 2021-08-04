export const STAFFDISPATCH_NAMESPACE = 'staffdispatch';

export function STAFFDISPATCH_LIST(payload) {
  return {
    type: `${STAFFDISPATCH_NAMESPACE}/fetchList`,
    payload,
  };
}

export function STAFFDISPATCH_DETAIL(id) {
  return {
    type: `${STAFFDISPATCH_NAMESPACE}/fetchDetail`,
    payload: { id },
  };
}

export function STAFFDISPATCH_CLEAR_DETAIL() {
  return {
    type: `${STAFFDISPATCH_NAMESPACE}/clearDetail`,
    payload: {},
  };
}

export function STAFFDISPATCH_SUBMIT(payload) {
  return {
    type: `${STAFFDISPATCH_NAMESPACE}/submit`,
    payload,
  };
}

export function STAFFDISPATCH_REMOVE(payload) {
  return {
    type: `${STAFFDISPATCH_NAMESPACE}/remove`,
    payload,
  };
}
