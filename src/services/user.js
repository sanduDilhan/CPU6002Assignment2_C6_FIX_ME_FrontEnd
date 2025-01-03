import ApiService from './apiService';

export async function getAll() {
  const apiObject = {};
  apiObject.method = 'GET';
  apiObject.authentication = true;
  apiObject.endpoint = 'user/get/both_users';
  apiObject.body = null;
  return await ApiService.callApi(apiObject);
}
export async function update(obj) {
  const apiObject = {};
  apiObject.method = 'PUT';
  apiObject.authentication = true;
  apiObject.endpoint = 'user/update';
  apiObject.body = obj;
  apiObject.multipart = true;
  return await ApiService.callApi(apiObject);
}
export async function save(obj) {
  const apiObject = {};
  apiObject.method = 'POST';
  apiObject.authentication = true;
  apiObject.endpoint = 'user/save';
  apiObject.body = obj;
  apiObject.multipart = true;
  return await ApiService.callApi(apiObject);
}
export async function manage(id,obj) {
  return id === 0 ? save(obj) : update(obj);
}
export async function getFavByUser(userId) {
  const apiObject = {};
  apiObject.method = 'GET';
  apiObject.authentication = true;
  apiObject.endpoint = `favourite/get/favourites/user/${userId}`;
  apiObject.body = null;
  return await ApiService.callApi(apiObject);
}
export async function getUserPackages(userId) {
  const apiObject = {};
  apiObject.method = 'GET';
  apiObject.authentication = true;
  apiObject.endpoint = `user_package/get/UserPackagesByUser/advanced/user/${userId}`;
  apiObject.body = null;
  return await ApiService.callApi(apiObject);
}
export async function getUserDetailsHandler() {
  const apiObject = {};
  apiObject.method = 'POST';
  apiObject.authentication = true;
  apiObject.endpoint = `auth/user/details`;
  apiObject.body = {};
  apiObject.isAccessToken = true;
  return await ApiService.callApi(apiObject);
}
export async function getUserPackagesHandler() {
  const apiObject = {};
  apiObject.method = 'GET';
  apiObject.authentication = true;
  apiObject.endpoint = `packageDetail/getAllPackage`;
  apiObject.body = null;
  // apiObject.isAccessToken = true;
  return await ApiService.callApi(apiObject);
}
// need to implement
export async function subscribeUser(obj) {
  const apiObject = {};
  apiObject.method = 'POST';
  apiObject.authentication = false;
  apiObject.endpoint = `mailchimp/subscription`;
  apiObject.body = obj;
  return await ApiService.callApi(apiObject);
}
export async function contactUser(obj) {
  const apiObject = {};
  apiObject.method = 'POST';
  apiObject.authentication = false;
  apiObject.endpoint = `auth/sendCustomEmail`;
  apiObject.body = obj;
  return await ApiService.callApi(apiObject);
}
export async function askQuestionUser(obj) {
  const apiObject = {};
  apiObject.method = 'POST';
  apiObject.authentication = false;
  apiObject.endpoint = `auth/sendCustomEmail`;
  apiObject.body = obj;
  return await ApiService.callApi(apiObject);
}
