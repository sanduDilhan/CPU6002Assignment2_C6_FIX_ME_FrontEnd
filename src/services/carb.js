import ApiService from './apiService';
import {getUserId} from "../utility/commonFunc";

export async function saveCarbLimit(obj) {
  const apiObject = {};
  apiObject.method = 'POST';
  apiObject.authentication = true;
  apiObject.endpoint = 'carbLimit/save';
  apiObject.body = obj;
  return await ApiService.callApi(apiObject);
}
//carbLimit/getCarbLimitByUserId/2
export async function getCarbLimit() {
  const apiObject = {};
  apiObject.method = 'GET';
  apiObject.authentication = true;
  apiObject.endpoint = `carbLimit/getCarbLimitByUserId/${getUserId()}`;
  apiObject.body = null;
  return await ApiService.callApi(apiObject);
}
