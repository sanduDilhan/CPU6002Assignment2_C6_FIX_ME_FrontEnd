import React,{Component} from 'react';
import './style.scss'
import {spinnerHandler} from "../../../../store/domain/spinner/action";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Col, Input, Row} from "reactstrap";
import TopButtons from "../top-buttons";
import HeaderStaticBar from "../../header-static-bar";
import {
  getAllRecipeCategories,
  getAllRecipes,
  getAllRecipesByCategoryId,
  getAllRecipesWithPagination
} from "../../../../services/recipe";
import {getCurrentPackageDetails} from "../../../../services/package";
import Cookies from "js-cookie";
import * as constant from "../../../../configs/constant";
import {BASE_ROUTE_PATH, NO_TYPE, ROUTE_MA_FAV_RECIPE_VIEW, ROUTE_MA_RECIPE_VIEW} from "../../../../configs/constant";
import {history} from "../../../../history";
import * as commonFunc from "../../../../utility/commonFunc";
import Pagination from "../../../../layouts/components/pagination/Pagination";

let sampleCategories = [
  {categoryName: "ALL", recipeCategoryId: 1},
  {categoryName: "ASIAN", recipeCategoryId: 2},
  {categoryName: "BREAD & CRACKERS", recipeCategoryId: "BREAD & CRACKERS"},
  {categoryName: "BREAKFASTS", recipeCategoryId: "BREAKFASTS"},
  {categoryName: "DESSERTS", recipeCategoryId: "DESSERTS"},
  {categoryName: "FAMILY FAVOURITES", recipeCategoryId: "FAMILY FAVOURITES"},
  {categoryName: "FISH DISHES", recipeCategoryId: "FISH DISHES"},
  {categoryName: "MEAT DISHES", recipeCategoryId: "MEAT DISHES"},
  {categoryName: "PASTA, PIZZA & RISOTTO", recipeCategoryId: "PASTA, PIZZA & RISOTTO"},
  {categoryName: "PIES, TARTS & CASSEROLES", recipeCategoryId: "PIES, TARTS & CASSEROLES"},
  {categoryName: "SALADS", recipeCategoryId: "SALADS"},
  {categoryName: "SANDWICHES", recipeCategoryId: "SANDWICHES"},
  {categoryName: "SAUCES, DRESSINGS & DIPS", recipeCategoryId: "SAUCES, DRESSINGS & DIPS"},
  {categoryName: "SIDES", recipeCategoryId: "SIDES"},
  {categoryName: "SNACKS", recipeCategoryId: "SNACKS"},
  {categoryName: "SOUP", recipeCategoryId: "SOUP"},
  {categoryName: "VEGETARIAN", recipeCategoryId: "VEGETARIAN"},
]
let sampleRecipes = [
  {recipeDetailId: 1, recipeName: "90 Second Bread", imageUrl: "/image-folder/Baked-Eggs-with-Smoked-Salmon.jpg"},
  {recipeDetailId: 2, recipeName: "Almond Flour Bread", imageUrl: "/image-folder/Bagel.jpg"},
  {recipeDetailId: 3, recipeName: "Apple Pie", imageUrl: "/image-folder/Baba-Ganoush-v3.jpg"},
  {recipeDetailId: 4, recipeName: "Artichoke and Bean Salad", imageUrl: "/image-folder/BBQ-Sauce-150x150.jpeg"},
  {recipeDetailId: 5, recipeName: "Asparagus Pesto", imageUrl: "/image-folder/Asparagus-Pesto.jpeg"},
  {recipeDetailId: 6, recipeName: "Asparagus Pesto Pasta", imageUrl: "/image-folder/90-Second-Bread-130x130.jpg"},
  {recipeDetailId: 7, recipeName: "Avgolemono (Chicken and Lemon Soup)", imageUrl: "/image-folder/Baked-Eggs-with-Smoked-Salmon.jpg"},
  {recipeDetailId: 8, recipeName: "Baked Eggs with Smoked Salmon", imageUrl: "/image-folder/Bagel.jpg"},
  {recipeDetailId: 9, recipeName: "Banana and Pecan Muffins", imageUrl: "/image-folder/Banana-Muffins.jpg"}
]
let timeout1 = null;
class App extends Component {
  state = {
    categories: [],
    recipes: [],
    categoryId: "ALL",
    isSearchAPI: false, searchText:"",page:0, totalNoOfPages:1
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.getCurrentPackageDetailsHandler();
  }
  getCurrentPackageDetailsHandler = () => {
    this.props.spinnerHandler(true);
    getCurrentPackageDetails().then(response => {
      this.props.spinnerHandler(false);
      if(response.code === 200) {
        let results = response.result;
        if(results.length === 0) return history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_PACKAGE_BUY}`);
        let resultObj = results[0]

        if(resultObj.isExpired) {
          Cookies.set(constant.USER_CURRENT_PACKAGE_ACTIVE, NO_TYPE);
          history.push(`${constant.BASE_ROUTE_PATH}${constant.ROUTE_PACKAGE_BUY}`)
        }else{
          this.getAllCategories();
        }
      }else{
        commonFunc.notifyMessage(response.message);
      }
    })
  }
  getAllCategories = () => {
    this.props.spinnerHandler(true)
    getAllRecipeCategories().then(response => {
      this.getAllRecipesHandler()
      if(response.code === 200) {
        let categories = [{categoryName: "ALL", recipeCategoryId: "ALL"}];
        if(response.result.length > 0) {
          response.result.sort((a, b) => a.categoryName.localeCompare(b.categoryName))
        }
        response.result.map(obj => {
          categories.push(obj);
        })
        this.setState({categories: categories})
      }
    })
  }
  getAllRecipesHandler = () => {
    let {categoryId, searchText, page, totalNoOfPages} = this.state;
    categoryId = categoryId === "ALL" ? 0 : categoryId;
    this.props.spinnerHandler(true)
    this.setState({isSearchAPI: true})

    // getAllRecipes().then(response => {
    //   this.props.spinnerHandler(false)
    //   window.scrollTo(0, 0);
    //   this.setState({recipes: response?.result ?? [], isSearchAPI: false})
    // })
    // console.log("page",page)
    // console.log("categoryId",categoryId)
    // console.log("searchValue",searchText.trim() === "" ? null : searchText.trim())

    getAllRecipesWithPagination(page, categoryId, searchText.trim() === "" ? null : searchText.trim()).then(response => {
      this.props.spinnerHandler(false)
      window.scrollTo(0, 0);
      this.setState({recipes: response?.result ?? [], isSearchAPI: false, totalNoOfPages: response?.totalPages ?? 0})
    })
  }
  categorySelectorHandler = async (categoryId) => {
    await this.setState({categoryId: categoryId, page: 0})
    this.getAllRecipesHandler();
    // if(categoryId === "ALL") return this.getAllRecipesHandler();

    // this.props.spinnerHandler(true)
    // this.setState({isSearchAPI: true})
    //
    // getAllRecipesByCategoryId(categoryId).then(response => {
    //   this.props.spinnerHandler(false)
    //   window.scrollTo(0, 0);
    //   this.setState({recipes: response?.result ?? [], isSearchAPI: false})
    // })
  }
  recipeClickHandler = (recipeId) => {
    this.props.history.push({pathname: `${BASE_ROUTE_PATH}${ROUTE_MA_RECIPE_VIEW}/${recipeId}`, state: { recipeId: recipeId }})
    // this.props.history.push({pathname: `${BASE_ROUTE_PATH}${ROUTE_MA_FAV_RECIPE_VIEW}`, state: { recipeId: recipeId }})
  }
  handlePagination = async (page) => {
    await this.setState({page: (page - 1)});
    this.getAllRecipesHandler()
  };
  render() {
    let {categories, categoryId, recipes, isSearchAPI, searchText, page, totalNoOfPages} = this.state;
    // let filterData = [];
    // if(searchText.trim() !== "") {
    //   recipes.map(obj => {
    //     if(obj.recipeName.toUpperCase().indexOf(searchText.trim().toUpperCase()) !== -1) filterData.push(obj)
    //   })
    // }else{
    //   filterData = recipes;
    // }
    return (
      <div className={'recipes-wrapper'}>
        {/*<HeaderStaticBar bannerURL={"/image-folder/Recipe-Grid-Banner.jpeg"} mainTitle={"Recipes"} subTitle={"B-LOW FOOD"}/>*/}
        <div className={' pt-0 pb-5 '}>
          <TopButtons activeIndex={9}/>
          <div className={'container'}>
            {categories.length > 0 ? <div className={'pt-3'}>
              <Row className={'m-0 profile-wrapper'} id={"section"}>
                <Col md={3}>
                  <div className={'category-wrapper'}>
                    {
                      categories.map((obj, index) => {
                        return <div className={'single-category'} key={index}>
                          <button className={`fr-font ${categoryId === obj.recipeCategoryId ? 'active-btn':''}`} onClick={()=>this.categorySelectorHandler(obj.recipeCategoryId)}>{obj.categoryName}</button>
                        </div>
                      })
                    }
                  </div>
                </Col>
                <Col md={9} className={'m-0'}>
                  <Row className={'m-0_'}>
                    <Col md={5} />
                    <Col md={7} className={'mb-1'}>
                      <Input placeholder={"Type to search..."} value={searchText} onChange={(e)=>{
                        this.setState({searchText:e.target.value, page: 0})
                        if(timeout1) clearTimeout(timeout1);
                        timeout1 = setTimeout(()=>{
                          this.getAllRecipesHandler(null)
                        },1000)
                      }}/>
                    </Col>
                    {
                      !isSearchAPI && recipes.length === 0 ?
                        <Col md={12}>
                          <p className={'no-match-text'}>No items were found matching your selection.</p>
                        </Col>
                        :
                        recipes.map((obj,index)=> {
                          return <Col md={4} key={index}>
                            <div className={'recipe-card'} onClick={() => this.recipeClickHandler(obj.recipeDetailId)}>
                              <img src={obj.imageUrl}/>
                              <div className={'recipe-name-wrapper'}>
                                <p>{obj.recipeName}</p>
                              </div>
                            </div>
                          </Col>
                        })
                    }
                    <Col xs={12}>
                      <div className={"full-width align-center "}>
                        {totalNoOfPages ? <Pagination activePage={(page + 1)} totalNoOfPages={totalNoOfPages}
                                                      handlePagination={this.handlePagination}/> : null}
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>:null}
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  spinnerHandler: data => dispatch(spinnerHandler(data))
});

export default connect(null, mapDispatchToProps)(withRouter(App));
