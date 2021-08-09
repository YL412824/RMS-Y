import { delay } from 'roadhog-api-doc';

const proxy = {
  'POST /api/blade-museum/mus/list': {
    code: 200,
    data: {},
    message: 'success',
    success: true,
  },
  'POST /api/blade-museum/mus/insert': {
    code: 200,
    data: {},
    message: 'success',
    success: true,
  },
  'POST /api/blade-museum/mus/remove': {
    code: 200,
    data: {},
    message: 'success',
    success: true,
  },
  'POST /api/blade-museum/mus/updata': {
    code: 200,
    data: {},
    message: 'success',
    success: true,
  },
};

export default delay(proxy, 500);
