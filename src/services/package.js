import ApiService from "./apiService";
import {getSelectedPackageId, getUserEmail, getUserId} from "../utility/commonFunc";

// package/create-checkout-session/4/10
export async function createCheckoutSession(packageId) {
  const apiObject = {};
  apiObject.method = 'GET';
  apiObject.authentication = false;
  apiObject.endpoint = `package/create-checkout-session/${packageId}/${getUserId()}`;
  // apiObject.endpoint = `package/create-checkout-session/${packageId}/${userId ? userId : getUserId()}`;
  apiObject.body = null;
  return await ApiService.callApi(apiObject);
}
//package/get/tharinduathukorala1@gmail.com
export async function getCurrentPackageDetails() {
  const apiObject = {};
  apiObject.method = 'GET';
  apiObject.authentication = true;
  apiObject.endpoint = `package/get/${getUserEmail()}`;
  apiObject.body = null;
  return await ApiService.callApi(apiObject);
}

//success-payment/4/10
export async function successPayment() {
  const apiObject = {};
  apiObject.method = 'POST';
  apiObject.authentication = true;
  apiObject.endpoint = `package/success-payment/${getSelectedPackageId()}/${getUserId()}`;
  apiObject.body = {};
  return await ApiService.callApi(apiObject);
}
//package/get-all/null/0/100
export async function getAllPackages() {
  const apiObject = {};
  apiObject.method = 'GET';
  apiObject.authentication = false; //true
  apiObject.endpoint = `package/get-all/null/0/100`;
  apiObject.body = null;
  return await ApiService.callApi(apiObject);
}
// package/cancel-subscription/<email>
export async function cancelSubscription() {
  const apiObject = {};
  apiObject.method = 'POST';
  apiObject.authentication = true;
  apiObject.endpoint = `package/cancel-subscription/${getUserEmail()}`;
  apiObject.body = null;
  return await ApiService.callApi(apiObject);
}
