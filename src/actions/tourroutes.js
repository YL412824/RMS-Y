export const TOURROUTES_NAMESPACE = 'tourroutes';

export function TOURROUTES_LIST(payload) {
  return {
    type: `${TOURROUTES_NAMESPACE}/fetchList`,
    payload,
  };
}

export function TOURROUTES_DETAIL(id) {
  return {
    type: `${TOURROUTES_NAMESPACE}/fetchDetail`,
    payload: { id },
  };
}

export function TOURROUTES_CLEAR_DETAIL() {
  return {
    type: `${TOURROUTES_NAMESPACE}/clearDetail`,
    payload: {},
  };
}

export function TOURROUTES_SUBMIT(payload) {
  return {
    type: `${TOURROUTES_NAMESPACE}/submit`,
    payload,
  };
}

export function TOURROUTES_REMOVE(payload) {
  return {
    type: `${TOURROUTES_NAMESPACE}/remove`,
    payload,
  };
}
