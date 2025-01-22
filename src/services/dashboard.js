import ApiService from './apiService';

export async function getAll() {
  const apiObject = {};
  apiObject.method = 'GET';
  apiObject.authentication = true;
  apiObject.endpoint = 'user_package/get/admin/statistics';
  apiObject.body = null;
  return await ApiService.callApi(apiObject);
}
export async function revenueDate(startDate,endDate) {
  const apiObject = {};
  apiObject.method = 'GET';
  apiObject.authentication = true;
  apiObject.endpoint = `user_package/get/admin/dashboard/${startDate}/${endDate}`;
  apiObject.body = null;
  return await ApiService.callApi(apiObject);
}
