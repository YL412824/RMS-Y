export const USERS_NAMESPACE = 'users';

export function USERS_LIST(payload) {
  return {
    type: `${USERS_NAMESPACE}/fetchList`,
    payload,
  };
}

export function USERS_INIT() {
  return {
    type: `${USERS_NAMESPACE}/fetchInit`,
    payload: {},
  };
}

export function USERS_CHANGE_INIT(payload) {
  return {
    type: `${USERS_NAMESPACE}/fetchChangeInit`,
    payload,
  };
}

export function USERS_DETAIL(id) {
  return {
    type: `${USERS_NAMESPACE}/fetchDetail`,
    payload: { id },
  };
}

export function USERS_ROLE_GRANT(payload, callback) {
  return {
    type: `${USERS_NAMESPACE}/grant`,
    payload,
    callback,
  };
}

export function USERS_SUBMIT(payload) {
  return {
    type: `${USERS_NAMESPACE}/submit`,
    payload,
  };
}

export function USERS_UPDATE(payload) {
  return {
    type: `${USERS_NAMESPACE}/update`,
    payload,
  };
}

export function USERS_REMOVE(payload) {
  return {
    type: `${USERS_NAMESPACE}/remove`,
    payload,
  };
}
