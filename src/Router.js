import React, {Suspense, lazy} from "react"
import {Router, Switch, Route} from "react-router-dom"
import {history} from "./history"
import Spinner from "./components/@vuexy/spinner/Loading-spinner"
import {ContextLayout} from "./utility/context/Layout"
import * as constant from './configs/constant';
import {ROUTE_ASK_A_QUESTION, ROUTE_MA_FAV_RECIPE_VIEW, ROUTE_MA_WEIGHT_TRACKER} from "./configs/constant";

// Route-based code splitting
const Login = lazy(() => import("./views/pages/login"));
const Register = lazy(() => import("./views/pages/register/register-page"));
const Package = lazy(() => import("./views/pages/register/package-selector"));

const PaymentSuccess = lazy(() => import("./views/pages/payments/success-payment"));
const PaymentCancel = lazy(() => import("./views/pages/payments/cancel-payment"));

const Homepage = lazy(() => import("./views/pages/homepage"));
const FAQ = lazy(() => import("./views/pages/faq"));
const Contact = lazy(() => import("./views/pages/contact"));
const LowCarbDiet = lazy(() => import("./views/pages/low-carb-diet"));
const MAProfile = lazy(() => import("./views/pages/my-account/profile"));
const MAChangePassword = lazy(() => import("./views/pages/my-account/change-password"));
const CarbLimit = lazy(() => import("./views/pages/my-account/meal-plans/daily-carb-limit"));
const MealPlanner = lazy(() => import("./views/pages/my-account/meal-plans/meal-planner"));
const CarbCounts = lazy(() => import("./views/pages/my-account/carb-counts"));
const Recipes = lazy(() => import("./views/pages/my-account/recipes"));
const BLowMethod = lazy(() => import("./views/pages/my-account/b-low-method"));
const CurrentMembership = lazy(() => import("./views/pages/my-account/current-membership"));
const WeightTracker = lazy(() => import("./views/pages/my-account/weight-tracker"));
const AskAQuestion = lazy(() => import("./views/pages/ask-a-question"));

const Day7 = lazy(() => import("./views/pages/my-account/meal-plans/meal-template/day7"));
const Day5 = lazy(() => import("./views/pages/my-account/meal-plans/meal-template/day5"));
// const SampleCollection = lazy(() => import("./views/pages/my-account/meal-plans/meal-template/sample"));
const SampleCollection = lazy(() => import("./views/pages/my-account/meal-plans/meal-template/sample-customizable"));
const CustomizableTemplate = lazy(() => import("./views/pages/my-account/meal-plans/meal-template/customizable-template"));

const RecipeView = lazy(() => import("./views/pages/my-account/recipes/view/recipe-view"));
const FavouriteCollection = lazy(() => import("./views/pages/my-account/meal-plans/favourite-collection"));
const Help2 = lazy(() => import("./views/pages/help/instruction-videos"));

const PrivacyPolicy = lazy(() => import("./views/pages/privacy-policy/index"));
const TermsCondition = lazy(() => import("./views/pages/privacy-policy/terms-conditions"));

const RouteConfig = ({
                       component: Component,
                       fullLayout,
                       permission,
                       user,
                       ...rest
                     }) => (
  <Route
    {...rest}
    render={props => {

      return (
        <ContextLayout.Consumer>
          {context => {

            let LayoutTag =
              fullLayout === true
                ? context.fullLayout
                : context.VerticalLayout;
            return (
              <LayoutTag {...props} >
                <Suspense fallback={<Spinner/>}>
                  <Component {...props} />
                </Suspense>
              </LayoutTag>
            )
          }}
        </ContextLayout.Consumer>
      )
    }}
  />
);

// const AppRoute = connect(mapStateToProps)(RouteConfig);
const AppRoute = RouteConfig;

class AppRouter extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <AppRoute
            path={constant.BASE_ROUTE_PATH + constant.ROUTE_LOGIN}
            component={Login}
            exact
          />
          <AppRoute
            path={constant.BASE_ROUTE_PATH + constant.ROUTE_REGISTER}
            component={Register}
            exact
          />
          <AppRoute
            path={constant.BASE_ROUTE_PATH + constant.ROUTE_PACKAGE_BUY}
            component={Package}
            exact
          />

          <AppRoute
            path={constant.BASE_ROUTE_PATH + constant.ROUTE_PAYMENT_SUCCESS}
            component={PaymentSuccess}
            fullLayout
            // exact
          />
          <AppRoute
            path={constant.BASE_ROUTE_PATH + constant.ROUTE_PAYMENT_CANCEL}
            component={PaymentCancel}
            fullLayout
          />

          <AppRoute
            path={constant.BASE_ROUTE_PATH + constant.ROUTE_DASHBOARD}
            component={Homepage}
            exact
          />
          <AppRoute
            path={constant.BASE_ROUTE_PATH + constant.ROUTE_LOW_CARB}
            component={LowCarbDiet}
            exact
          />
          <AppRoute
            path={constant.BASE_ROUTE_PATH + constant.ROUTE_FAQ}
            component={FAQ}
            exact
          />
          <AppRoute
            path={constant.BASE_ROUTE_PATH + constant.ROUTE_GET_IN_TOUCH}
            component={Contact}
            exact
          />
          <AppRoute
            path={constant.BASE_ROUTE_PATH + constant.ROUTE_MY_ACCOUNT}
            component={MAProfile}
            exact
          />
          <AppRoute
            path={constant.BASE_ROUTE_PATH + constant.ROUTE_MA_PROFILE}
            component={MAProfile}
            exact
          />
          <AppRoute
            path={constant.BASE_ROUTE_PATH + constant.ROUTE_MA_CHANGE_PASSWORD}
            component={MAChangePassword}
            exact
          />
          <AppRoute
            path={constant.BASE_ROUTE_PATH + constant.ROUTE_MA_CARB_LIMIT}
            component={CarbLimit}
            exact
          />
          <AppRoute
            path={constant.BASE_ROUTE_PATH + constant.ROUTE_MA_MEAL_PLANS}
            component={MealPlanner}
            exact
          />
          <AppRoute
            path={constant.BASE_ROUTE_PATH + constant.ROUTE_MA_CARB_COUNTS}
            component={CarbCounts}
            exact
          />
          <AppRoute
            path={constant.BASE_ROUTE_PATH + constant.ROUTE_MA_RECIPES}
            component={Recipes}
            exact
          />
          <AppRoute
            path={constant.BASE_ROUTE_PATH + constant.ROUTE_MA_RECIPE_VIEW+"/:id"}
            component={RecipeView}
            exact
          />
          <AppRoute
            path={constant.BASE_ROUTE_PATH + constant.ROUTE_MA_FAV_RECIPE_VIEW}
            component={RecipeView}
            exact
          />

          <AppRoute
            path={constant.BASE_ROUTE_PATH + constant.ROUTE_MA_FAVOURITE_RECIPES}
            component={FavouriteCollection}
            exact
          />
          <AppRoute
            path={constant.BASE_ROUTE_PATH + constant.ROUTE_MA_MEAL_SAMPLE_COLLECTION}
            component={SampleCollection}
            exact
          />
          <AppRoute
            path={constant.BASE_ROUTE_PATH + constant.ROUTE_MA_MEAL_7_DAYS}
            component={Day7}
            exact
          />
          <AppRoute
            path={constant.BASE_ROUTE_PATH + constant.ROUTE_MA_MEAL_5_DAYS}
            component={Day5}
            exact
          />
          <AppRoute
            path={constant.BASE_ROUTE_PATH + constant.ROUTE_MA_MAIN_MEAL_PLANNER}
            component={CustomizableTemplate}
            exact
          />
          <AppRoute
            path={constant.BASE_ROUTE_PATH + constant.ROUTE_MA_BLOW_METHOD}
            component={BLowMethod}
            exact
          />
          <AppRoute
            path={constant.BASE_ROUTE_PATH + constant.ROUTE_MA_SUBSCRIPTION}
            component={CurrentMembership}
            exact
          />
          <AppRoute
            path={constant.BASE_ROUTE_PATH + constant.ROUTE_MA_WEIGHT_TRACKER}
            component={WeightTracker}
            exact
          />
          <AppRoute
            path={constant.BASE_ROUTE_PATH + constant.ROUTE_ASK_A_QUESTION}
            component={AskAQuestion}
            exact
          />
          <AppRoute
            path={constant.BASE_ROUTE_PATH + constant.ROUTE_HELP_INTRO_VIDEOS}
            component={Help2}
            exact
          />

          <AppRoute
            path={constant.BASE_ROUTE_PATH + constant.ROUTE_PRIVACY_POLICY}
            component={PrivacyPolicy}
            exact
          />
          <AppRoute
            path={constant.BASE_ROUTE_PATH + constant.ROUTE_TERMS_CONDITIONS}
            component={TermsCondition}
            exact
          />

          <AppRoute
            component={Homepage}
            // fullLayout
          />
        </Switch>
      </Router>
    )
  }
}
export default AppRouter;
