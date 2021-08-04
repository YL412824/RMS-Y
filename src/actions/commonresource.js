export const COMMONRESOURCE_NAMESPACE = 'commonresource';

export function COMMONRESOURCE_LIST(payload) {
  return {
    type: `${COMMONRESOURCE_NAMESPACE}/fetchList`,
    payload,
  };
}

export function COMMONRESOURCE_DETAIL(id) {
  return {
    type: `${COMMONRESOURCE_NAMESPACE}/fetchDetail`,
    payload: { id },
  };
}

export function COMMONRESOURCE_CLEAR_DETAIL() {
  return {
    type: `${COMMONRESOURCE_NAMESPACE}/clearDetail`,
    payload: {},
  };
}

export function COMMONRESOURCE_SUBMIT(payload) {
  return {
    type: `${COMMONRESOURCE_NAMESPACE}/submit`,
    payload,
  };
}

export function COMMONRESOURCE_REMOVE(payload) {
  return {
    type: `${COMMONRESOURCE_NAMESPACE}/remove`,
    payload,
  };
}
