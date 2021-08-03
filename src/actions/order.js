export const ORDER_NAMESPACE = 'order';

export function ORDER_LIST(payload) {
  return {
    type: `${ORDER_NAMESPACE}/fetchList`,
    payload,
  };
}

export function ORDER_INIT() {
  return {
    type: `${ORDER_NAMESPACE}/fetchInit`,
    payload: { code: 'order' },
  };
}

export function ORDER_DETAIL(id) {
  return {
    type: `${ORDER_NAMESPACE}/fetchDetail`,
    payload: { id },
  };
}

export function ORDER_SUBMIT(payload) {
  return {
    type: `${ORDER_NAMESPACE}/submit`,
    payload,
  };
}

export function ORDER_REMOVE(payload) {
  return {
    type: `${ORDER_NAMESPACE}/remove`,
    payload,
  };
}
