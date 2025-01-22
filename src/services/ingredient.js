import ApiService from "./apiService";

export async function getAllIngredients() {
  const apiObject = {};
  apiObject.method = 'GET';
  apiObject.authentication = true;
  apiObject.endpoint = `ingredient/getAllActiveIngredientPublicSite`;
  apiObject.body = null;
  return await ApiService.callApi(apiObject);
}
export async function getAllActiveIngredientPublicSite() {
  const apiObject = {};
  apiObject.method = 'GET';
  apiObject.authentication = true;
  apiObject.endpoint = `ingredient/getAllActiveIngredientPublicSite`;
  apiObject.body = null;
  return await ApiService.callApi(apiObject);
}
export async function placeOrder(obj) {
  const apiObject = {};
  apiObject.method = 'POST';
  apiObject.authentication = true;
  apiObject.endpoint = `orders`;
  apiObject.body = obj;
  return await ApiService.callApi(apiObject);
}
export async function updateOrderStatus(status, orderId) {
  const apiObject = {};
  apiObject.method = 'PATCH';
  apiObject.authentication = true;
  apiObject.endpoint = `orders/${orderId}`;
  apiObject.body = {orderStatus: status};
  return await ApiService.callApi(apiObject);
}
//ingredient/findById/1
export async function getIngredientObj(ingredientDetailId) {
  const apiObject = {};
  apiObject.method = 'GET';
  apiObject.authentication = true;
  apiObject.endpoint = `ingredient/findById/${ingredientDetailId}`;
  apiObject.body = null;
  return await ApiService.callApi(apiObject);
}
