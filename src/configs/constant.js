import conf from "../services/apiConfig";
export const WEBSITE_URL = window.location.origin; //"https://blow-demo.surge.sh";

export const FACEBOOK_URL = "https://www.facebook.com/b.lowwellness";
export const INSTAGRAM_URL = "https://www.instagram.com/b.lowwellness";

export const ACCESS_TOKEN = "blow-public-access";
export const REFRESH_TOKEN = "blow-public-refresh";
export const ADMIN_ID = "blow-public-user-id";
export const ADMIN_EMAIL = "blow-public-user-email";
export const USER_CURRENT_PACKAGE_ACTIVE = "blow-public-user-package-active";
export const USER_NAME = "blow-public-user-name";

export const LOGIN_USER_NAME = "blow-public-login-user-name";
export const LOGIN_PASSWORD = "blow-public-login-password";

export const SELECTED_PACKAGE_ID = "blow-public-selected-package-id";
export const SELECTED_TEMPLATE_ID = "blow-public-selected-template-id";

export const PACKAGE_LIMIT = "q-form-p-limit";
export const PACKAGE_ID = "q-form-p-id";

export const ASSET_COMMON_ANS = "q-form-asset-cmn";
export const ASSET_TYPE_1 = "q-form-asset-1";
export const ASSET_TYPE_2 = "q-form-asset-2";
export const ASSET_TYPE_3 = "q-form-asset-3";

export const ASSET_TYPE_1_ANS = "q-form-asset-1-ans";
export const ASSET_TYPE_2_ANS = "q-form-asset-2-ans";
export const ASSET_TYPE_3_ANS = "q-form-asset-3-ans";

export const BASE_ROUTE_PATH = "";

export const ROUTE_DASHBOARD = "/";
export const ROUTE_LOW_CARB = "/low-carb-diet"
export const ROUTE_FAQ = "/faq";
export const ROUTE_GET_IN_TOUCH = "/contact";
export const ROUTE_ASK_A_QUESTION = "/ask-a-question";

export const ROUTE_MY_ACCOUNT = "/my-account";
export const ROUTE_MA_PROFILE = `${ROUTE_MY_ACCOUNT}/profile`;
export const ROUTE_MA_CHANGE_PASSWORD = `${ROUTE_MY_ACCOUNT}/change-password`;

export const ROUTE_MA_CARB_LIMIT = `${ROUTE_MY_ACCOUNT}/set-daily-carb-limit`;
export const ROUTE_MA_MEAL_PLANS = `${ROUTE_MY_ACCOUNT}/meal-plans`;
export const ROUTE_MA_CARB_COUNTS = `${ROUTE_MY_ACCOUNT}/carb-counts`;
export const ROUTE_MA_RECIPES = `${ROUTE_MY_ACCOUNT}/recipes`;
export const ROUTE_MA_RECIPE_VIEW = `${ROUTE_MY_ACCOUNT}/recipe-view`;
export const ROUTE_MA_FAV_RECIPE_VIEW = `${ROUTE_MY_ACCOUNT}/favourite-recipe-view`;
export const ROUTE_MA_FAVOURITE_RECIPES = `${ROUTE_MY_ACCOUNT}/favourite-collection`;

export const ROUTE_MA_MEAL_SAMPLE_COLLECTION = `${ROUTE_MY_ACCOUNT}/meal-sample-collection`;
export const ROUTE_MA_MEAL_7_DAYS = `${ROUTE_MY_ACCOUNT}/meal-planner-open-7-days`; //`MEAL PLANNER OPEN - 7 DAYS`
export const ROUTE_MA_MEAL_5_DAYS = `${ROUTE_MY_ACCOUNT}/meal-planner-open-5-days`;
export const ROUTE_MA_MAIN_MEAL_PLANNER = `${ROUTE_MY_ACCOUNT}/meal-planner`;
export const ROUTE_MA_BLOW_METHOD = `${ROUTE_MY_ACCOUNT}/b-low-method`;
export const ROUTE_MA_SUBSCRIPTION = `${ROUTE_MY_ACCOUNT}/subscription`;
export const ROUTE_MA_WEIGHT_TRACKER = `${ROUTE_MY_ACCOUNT}/weight-tracker`;

export const ROUTE_HELP_INTRO_VIDEOS = `${ROUTE_MY_ACCOUNT}/instruction-videos`;


export const ROUTE_PAYMENT_SUCCESS = `/success-payment`;
export const ROUTE_PAYMENT_CANCEL = `/cancel-payment`;

export const ROUTE_LOGIN = "/login";
export const ROUTE_REGISTER = "/register";
export const ROUTE_PACKAGE_BUY = "/package-buy";
export const ROUTE_SOCIAL_CALLBACK = "/social-callback";

export const ROUTE_PRIVACY_POLICY = "/privacy-policy";
export const ROUTE_TERMS_CONDITIONS = "/terms-and-conditions"

export const ROUTE_MY_ORDERS = `/3cd15f2940af`;

export const PENDING= "Pending";
export const COMPLETED = "Completed";
export const SERVICE_REQ = "SERVICE";

export const SOCIAL_CLICK = "question-public-user-social-key"
export const GOOGLE_TYPE = "GOOGLE_TYPE";
export const FACEBOOK_TYPE = "FACEBOOK_TYPE";
export const AUTH_TYPE = "question-public-user-auth-type"
export const NORMAL_AUTH = "NORMAL_AUTH";
export const SOCIAL_AUTH = "SOCIAL_AUTH";

export const COMMON_PASSWORD = "f2f481075a4d2E9a350cE&eFfde71e7bc";
// export const COMMON_PASSWORD = "user_password";
export const SOCIAL_ORIGIN = `${window.location.origin}${ROUTE_SOCIAL_CALLBACK}`;

export const SOCIAL_CLIENT_ID = "2n40ho202mipefa4b5sisvj56c";
export const FB_URL     = `${conf.awsCognitoUrl}/oauth2/authorize?response_type=CODE&client_id=${SOCIAL_CLIENT_ID}&redirect_uri=${SOCIAL_ORIGIN}&state=STATE&identity_provider=Facebook&scope=aws.cognito.signin.user.admin%20email%20openid%20profile`;
export const GOOGLE_URL = `${conf.awsCognitoUrl}/oauth2/authorize?response_type=code&client_id=${SOCIAL_CLIENT_ID}&redirect_uri=${SOCIAL_ORIGIN}&state=STATE&identity_provider=Google`;

export const PAYPAL_CLIENT_ID = "AW3GPkQ5hpVKAOIbzSTHBGgWQLEFm3EoQ1ICaBpoNsv-DRr5rEPyDJvafembboQcp51IWMl_NOjbG6-l";

export const YES_TYPE = "YES"
export const NO_TYPE = "NO"
export const DAYS_7 = [
  {name:"Monday", value:"MONDAY"},
  {name:"Tuesday", value:"TUESDAY"},
  {name:"Wednesday", value:"WEDNESDAY"},
  {name:"Thursday", value:"THURSDAY"},
  {name:"Friday", value:"FRIDAY"},
  {name:"Saturday", value:"SATURDAY"},
  {name:"Sunday", value:"SUNDAY"},
]
export const DAYS_5 = [
  {name:"Monday", value:"MONDAY"},
  {name:"Tuesday", value:"TUESDAY"},
  {name:"Wednesday", value:"WEDNESDAY"},
  {name:"Thursday", value:"THURSDAY"},
  {name:"Friday", value:"FRIDAY"}
]
export const SESSIONS = [
  {text: "Breakfast", name:"Breakfast", value:"BREAKFAST"},
  {text: "Morning Snacks", name:"Morning Snacks", value:"MORNING_SNACKS"},
  {text: "Lunch", name:"Lunch", value:"LUNCH"},
  {text: "Afternoon Snacks", name:"Afternoon Snacks", value:"AFTERNOON_SNACKS"},
  {text: "Dinner", name:"Dinner", value:"DINNER"},
  {text: "After Dinner Snacks", name:"After Dinner Snacks", value:"AFTER_DINNER_SNACKS"},
]
