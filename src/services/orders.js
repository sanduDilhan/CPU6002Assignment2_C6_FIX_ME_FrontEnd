import ApiService from "./apiService";
import * as constant from "../configs/constant";

export async function getAllOrders(status) {
  const apiObject = {};
  apiObject.method = 'GET';
  apiObject.authentication = true;
  apiObject.endpoint = `orders?customerId=<>>&status=${status}`;
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
