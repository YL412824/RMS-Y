export const VIPCENTER_NAMESPACE = 'vipcenter';

export function VIPCENTER_LIST(payload) {
  return {
    type: `${VIPCENTER_NAMESPACE}/fetchList`,
    payload,
  };
}

export function VIPCENTER_INIT() {
  return {
    type: `${VIPCENTER_NAMESPACE}/fetchInit`,
    payload: {},
  };
}

export function VIPCENTER_CHANGE_INIT(payload) {
  return {
    type: `${VIPCENTER_NAMESPACE}/fetchChangeInit`,
    payload,
  };
}

export function VIPCENTER_DETAIL(id) {
  return {
    type: `${VIPCENTER_NAMESPACE}/fetchDetail`,
    payload: { id },
  };
}

export function VIPCENTER_ROLE_GRANT(payload, callback) {
  return {
    type: `${VIPCENTER_NAMESPACE}/grant`,
    payload,
    callback,
  };
}

export function VIPCENTER_SUBMIT(payload) {
  return {
    type: `${VIPCENTER_NAMESPACE}/submit`,
    payload,
  };
}

export function VIPCENTER_UPDATE(payload) {
  return {
    type: `${VIPCENTER_NAMESPACE}/update`,
    payload,
  };
}

export function VIPCENTER_REMOVE(payload) {
  return {
    type: `${VIPCENTER_NAMESPACE}/remove`,
    payload,
  };
}
