import { delay } from 'roadhog-api-doc';

const proxy = {
  'POST /api/blade-museum/mus/list': {
    code: 200,
    data: {
      total: 15,
      size: 10,
      current: 1,
      searchCount: true,
      pages: 2,
      records: [],
    },
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
  'GET /api/blade-museum/mus/detail': {
    code: 200,
    data: {
      title: '通知标题详情',
      category: '3',
      categoryName: '转发通知',
      releaseTime: '2018-12-31 23:33:33',
      content: '通知公告内容详情',
    },
    message: 'success',
    success: true,
  },
};

export default delay(proxy, 500);
