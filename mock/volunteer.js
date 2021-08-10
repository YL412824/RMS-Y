import { delay } from 'roadhog-api-doc';

const proxy = {
  'POST /api/blade-volunteer/vol/list': {
    code: 200,
    data: {},
    message: 'success',
    success: true,
  },
  'POST /api/blade-volunteer/vol/insert': {
    code: 200,
    data: {},
    message: 'success',
    success: true,
  },
  'POST /api/blade-volunteer/vol/remove': {
    code: 200,
    data: {},
    message: 'success',
    success: true,
  },
  'POST /api/blade-volunteer/vol/updata': {
    code: 200,
    data: {},
    message: 'success',
    success: true,
  },
};

export default delay(proxy, 500);
