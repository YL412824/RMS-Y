export const CENTER_NAMESPACE = 'center';

export function CENTER_LIST(payload) {
  return {
    type: `${CENTER_NAMESPACE}/fetchList`,
    payload,
  };
}

export function CENTER_INIT() {
  return {
    type: `${CENTER_NAMESPACE}/fetchInit`,
    payload: {},
  };
}

export function CENTER_CHANGE_INIT(payload) {
  return {
    type: `${CENTER_NAMESPACE}/fetchChangeInit`,
    payload,
  };
}

export function CENTER_DETAIL(id) {
  return {
    type: `${CENTER_NAMESPACE}/fetchDetail`,
    payload: { id },
  };
}

export function CENTER_ROLE_GRANT(payload, callback) {
  return {
    type: `${CENTER_NAMESPACE}/grant`,
    payload,
    callback,
  };
}

export function CENTER_SUBMIT(payload) {
  return {
    type: `${CENTER_NAMESPACE}/submit`,
    payload,
  };
}

export function CENTER_UPDATE(payload) {
  return {
    type: `${CENTER_NAMESPACE}/update`,
    payload,
  };
}

export function CENTER_REMOVE(payload) {
  return {
    type: `${CENTER_NAMESPACE}/remove`,
    payload,
  };
}
