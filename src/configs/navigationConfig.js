import React from "react"
import * as Icon from "react-feather"
import * as constant from "./constant"
import {ROUTE_DASHBOARD, ROUTE_FAQ, ROUTE_GET_IN_TOUCH, ROUTE_LOW_CARB} from "./constant";

const navigationConfig = [
  {
    id: "1",
    title: "HOME",
    type: "item",
    // icon: <Icon.Monitor size={20}/>,
    icon: null,
    permissions: ["admin"],
    navLink: constant.BASE_ROUTE_PATH + constant.ROUTE_DASHBOARD
  },
  {
    id: "2",
    title: "WHY GO LOW-CARB?",
    type: "item",
    icon: null,
    permissions: ["admin"],
    navLink: constant.BASE_ROUTE_PATH + constant.ROUTE_LOW_CARB
  },
  {
    id: "3",
    title: "FAQs",
    type: "item",
    icon: null,
    permissions: ["admin"],
    navLink: constant.BASE_ROUTE_PATH + constant.ROUTE_FAQ
  },
  {
    id: "4",
    title: "GET IN TOUCH",
    type: "item",
    icon: null,
    permissions: ["admin"],
    navLink: constant.BASE_ROUTE_PATH + constant.ROUTE_GET_IN_TOUCH
  },
];

export default navigationConfig
