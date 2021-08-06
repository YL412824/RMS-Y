import { stringify } from 'qs';
import request from '../utils/request';
import func from '../utils/Func';
import { getCaptchaKey } from '../utils/authority';
import { captchaMode } from '../defaultSettings';

// =====================用户===========================

export async function accountLogin(params) {
  const values = params;
  values.grantType = captchaMode ? 'captcha' : 'password';
  values.scope = 'all';
  return request('/api/blade-auth/token', {
    headers: {
      'Captcha-key': getCaptchaKey(),
      'Captcha-code': values.code,
    },
    method: 'POST',
    body: func.toFormData(params),
  });
}

export async function socialLogin(params) {
  const values = params;
  values.grantType = 'social';
  values.scope = 'all';
  return request('/api/blade-auth/token', {
    method: 'POST',
    body: func.toFormData(values),
  });
}

export async function registerGuest(form, oauthId) {
  const values = form;
  values.oauthId = oauthId;
  return request('/api/blade-users/register-guest', {
    method: 'POST',
    body: func.toFormData(values),
  });
}

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUsers');
}

export async function list(params) {
  return request(`/api/blade-users/list?${stringify(params)}`);
}

export async function grant(params) {
  return request('/api/blade-users/grant', {
    method: 'POST',
    body: func.toFormData(params),
  });
}

export async function resetPassword(params) {
  return request('/api/blade-users/reset-password', {
    method: 'POST',
    body: func.toFormData(params),
  });
}

export async function remove(params) {
  return request('/api/blade-users/remove', {
    method: 'POST',
    body: func.toFormData(params),
  });
}

export async function submit(params) {
  return request('/api/blade-users/submit', {
    method: 'POST',
    body: params,
  });
}

export async function update(params) {
  return request('/api/blade-users/update', {
    method: 'POST',
    body: params,
  });
}

export async function detail(params) {
  return request(`/api/blade-users/detail?${stringify(params)}`);
}

export async function getUsersInfo() {
  return request('/api/blade-users/info');
}

export async function updatePassword(params) {
  return request('/api/blade-users/update-password', {
    method: 'POST',
    body: func.toFormData(params),
  });
}

export async function getCaptchaImage() {
  return request('/api/blade-auth/captcha');
}
