import ApiService from "./apiService";
import {getUserId} from "../utility/commonFunc";

// weightTracker/activeTargetWeight/2
export async function getActiveTargetWeight() {
  const apiObject = {};
  apiObject.method = 'GET';
  apiObject.authentication = true;
  apiObject.endpoint = `weightTracker/activeTargetWeight/${getUserId()}`;
  apiObject.body = null;
  return await ApiService.callApi(apiObject);
}
export async function weightTrackerChart() {
  const apiObject = {};
  apiObject.method = 'GET';
  apiObject.authentication = true;
  apiObject.endpoint = `weightTracker/weightTrackerChart/${getUserId()}`;
  apiObject.body = null;
  return await ApiService.callApi(apiObject);
}

export async function saveTargetOrActualWeight(obj) {
  const apiObject = {};
  apiObject.method = 'POST';
  apiObject.authentication = true;
  apiObject.endpoint = `weightTracker/saveTargetOrActualWeight`;
  apiObject.body = obj;
  return await ApiService.callApi(apiObject);
}

export async function getWeightTrackerHistory() {
  const apiObject = {};
  apiObject.method = 'GET';
  apiObject.authentication = true;
  apiObject.endpoint = `weightTracker/actualWeightHistory/${getUserId()}`;
  apiObject.body = null;
  return await ApiService.callApi(apiObject);
}
