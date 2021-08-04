export const DATASHOW_NAMESPACE = 'datashow';

export function DATASHOW_LIST(payload) {
  return {
    type: `${DATASHOW_NAMESPACE}/fetchList`,
    payload,
  };
}

export function DATASHOW_DETAIL(id) {
  return {
    type: `${DATASHOW_NAMESPACE}/fetchDetail`,
    payload: { id },
  };
}

export function DATASHOW_CLEAR_DETAIL() {
  return {
    type: `${DATASHOW_NAMESPACE}/clearDetail`,
    payload: {},
  };
}

export function DATASHOW_SUBMIT(payload) {
  return {
    type: `${DATASHOW_NAMESPACE}/submit`,
    payload,
  };
}

export function DATASHOW_REMOVE(payload) {
  return {
    type: `${DATASHOW_NAMESPACE}/remove`,
    payload,
  };
}
