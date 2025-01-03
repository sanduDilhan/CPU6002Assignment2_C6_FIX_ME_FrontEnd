import ApiService from "./apiService";

export async function getAllItems() {
  const apiObject = {};
  apiObject.method = 'GET';
  apiObject.authentication = true;
  apiObject.endpoint = `item`;
  apiObject.body = null;
  return await ApiService.callApi(apiObject);
}
