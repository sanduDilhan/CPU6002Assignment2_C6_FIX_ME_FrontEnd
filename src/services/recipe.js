import ApiService from "./apiService";
import {getSelectedPackageId, getUserId} from "../utility/commonFunc";

// recipeCategory/getAll
export async function getAllRecipeCategories() {
  const apiObject = {};
  apiObject.method = 'GET';
  apiObject.authentication = true;
  apiObject.endpoint = `recipeCategory/getAll`;
  apiObject.body = null;
  return await ApiService.callApi(apiObject);
}
//recipe/getAll
export async function getAllRecipes() {
  const apiObject = {};
  apiObject.method = 'GET';
  apiObject.authentication = true;
  // apiObject.endpoint = `recipe/getAll`;
  apiObject.endpoint = `recipe/getAllRecipeDetailsDropDown`
  apiObject.body = null;
  return await ApiService.callApi(apiObject);
}
//recipe/getAllWithPagination/0/10/0/null
export async function getAllRecipesWithPagination(pageNumber, categoryId, search) {
  const apiObject = {};
  apiObject.method = 'GET';
  apiObject.authentication = true;
  apiObject.endpoint = `recipe/getAllWithPagination/${pageNumber}/18/${categoryId}/${search}`;
  apiObject.body = null;
  return await ApiService.callApi(apiObject);
}
//recipe/findById/5
export async function getRecipeDetails(recipeId) {
  const apiObject = {};
  apiObject.method = 'GET';
  apiObject.authentication = true;
  apiObject.endpoint = `recipe/findById/${recipeId}`;
  apiObject.body = null;
  return await ApiService.callApi(apiObject);
}
export async function getAllRecipesByCategoryId(categoryId) {
  const apiObject = {};
  apiObject.method = 'GET';
  apiObject.authentication = true;
  apiObject.endpoint = `recipe/findByCategoryId/${categoryId}`;
  apiObject.body = null;
  return await ApiService.callApi(apiObject);
}
// ========= FAVOURITE RECIPES =================
export async function saveFavouriteRecipe(obj) {
  const apiObject = {};
  apiObject.method = 'POST';
  apiObject.authentication = true;
  apiObject.endpoint = `favouriteRecipe/save`;
  apiObject.body = obj;
  return await ApiService.callApi(apiObject);
}
export async function updateFavouriteRecipe(obj) {
  const apiObject = {};
  apiObject.method = 'POST';
  apiObject.authentication = true;
  apiObject.endpoint = `favouriteRecipe/updateFavouriteRecipe`;
  apiObject.body = obj;
  return await ApiService.callApi(apiObject);
}
//favouriteRecipe/getAllFavouritesByUserId/2
export async function getFavouriteRecipes() {
  const apiObject = {};
  apiObject.method = 'GET';
  apiObject.authentication = true;
  apiObject.endpoint = `favouriteRecipe/getAllFavouritesByUserId/${getUserId()}`;
  apiObject.body = null;
  return await ApiService.callApi(apiObject);
}
//favouriteRecipe/removeFavourite/2
export async function removeFavourite(favId) {
  const apiObject = {};
  apiObject.method = 'GET';
  apiObject.authentication = true;
  apiObject.endpoint = `favouriteRecipe/removeFavourite/${favId}`;
  apiObject.body = null;
  return await ApiService.callApi(apiObject);
}
// get fav recipe details
export async function getFavRecipeObj(favId) {
  const apiObject = {};
  apiObject.method = 'GET';
  apiObject.authentication = true;
  apiObject.endpoint = `favouriteRecipe/getFavouriteById/${favId}`;
  apiObject.body = null;
  return await ApiService.callApi(apiObject);
}
//favouriteRecipe/updateFavouriteRecipeServeCount
export async function updateFavouriteServeCount(obj) {
  const apiObject = {};
  apiObject.method = 'POST';
  apiObject.authentication = true;
  apiObject.endpoint = `favouriteRecipe/updateFavouriteRecipeServeCount`;
  apiObject.body = obj;
  return await ApiService.callApi(apiObject);
}

export async function saveCustomRecipe(obj) {
  const apiObject = {};
  apiObject.method = 'POST';
  apiObject.authentication = true;
  apiObject.endpoint = `recipe/saveCustomRecipe`;
  apiObject.body = obj;
  apiObject.multipart = true;
  return await ApiService.callApi(apiObject);
}
export async function saveFavouriteCustomRecipe(obj) {
  const apiObject = {};
  apiObject.method = 'POST';
  apiObject.authentication = true;
  apiObject.endpoint = `favouriteRecipe/saveCustomRecipeFavourite`;
  apiObject.body = obj;
  apiObject.multipart = true;
  return await ApiService.callApi(apiObject);
}
export async function updateCustomRecipe(obj) {
  const apiObject = {};
  apiObject.method = 'POST';
  apiObject.authentication = true;
  apiObject.endpoint = `recipe/updateCustomRecipe`;
  apiObject.body = obj;
  apiObject.multipart = true;
  return await ApiService.callApi(apiObject);
}

