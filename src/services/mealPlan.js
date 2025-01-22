import ApiService from './apiService';
import {getUserId} from "../utility/commonFunc";

export async function getAllMealPlans() {
  const apiObject = {};
  apiObject.method = 'GET';
  apiObject.authentication = true;
  apiObject.endpoint = `meal-plan/get-all/${getUserId()}`;
  apiObject.body = null;
  return await ApiService.callApi(apiObject);
}
//meal-plan/get/8
export async function getSelectedMealPlanDetails(mealPlanId) {
  const apiObject = {};
  apiObject.method = 'GET';
  apiObject.authentication = true;
  apiObject.endpoint = `meal-plan/get/${mealPlanId}`;
  apiObject.body = null;
  return await ApiService.callApi(apiObject);
}
export async function saveMealPlan(obj) {
  const apiObject = {};
  apiObject.method = 'POST';
  apiObject.authentication = true;
  apiObject.endpoint = `meal-plan/save`;
  apiObject.body = obj;
  return await ApiService.callApi(apiObject);
}

export async function updateMealPlanName(obj) {
  const apiObject = {};
  apiObject.method = 'POST';
  apiObject.authentication = true;
  apiObject.endpoint = `meal-plan/updateMealPlanName`;
  apiObject.body = obj;
  apiObject.multipart = true;
  return await ApiService.callApi(apiObject);
}
export async function deleteMealPlan(obj) {
  const apiObject = {};
  apiObject.method = 'POST';
  apiObject.authentication = true;
  apiObject.endpoint = `meal-plan/deleteMealPlanName`;
  apiObject.body = obj;
  apiObject.multipart = true;
  return await ApiService.callApi(apiObject);
}
export async function copyMealPlan(obj) {
  const apiObject = {};
  apiObject.method = 'POST';
  apiObject.authentication = true;
  apiObject.endpoint = `meal-plan/copyMealPlanName`;
  apiObject.body = obj;
  apiObject.multipart = true;
  return await ApiService.callApi(apiObject);
}
