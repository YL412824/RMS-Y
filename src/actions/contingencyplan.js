export const CONTINGENCYPLAN_NAMESPACE = 'contingencyplan';

export function CONTINGENCYPLAN_LIST(payload) {
  return {
    type: `${CONTINGENCYPLAN_NAMESPACE}/fetchList`,
    payload,
  };
}

export function CONTINGENCYPLAN_DETAIL(id) {
  return {
    type: `${CONTINGENCYPLAN_NAMESPACE}/fetchDetail`,
    payload: { id },
  };
}

export function CONTINGENCYPLAN_CLEAR_DETAIL() {
  return {
    type: `${CONTINGENCYPLAN_NAMESPACE}/clearDetail`,
    payload: {},
  };
}

export function CONTINGENCYPLAN_SUBMIT(payload) {
  return {
    type: `${CONTINGENCYPLAN_NAMESPACE}/submit`,
    payload,
  };
}

export function CONTINGENCYPLAN_REMOVE(payload) {
  return {
    type: `${CONTINGENCYPLAN_NAMESPACE}/remove`,
    payload,
  };
}
