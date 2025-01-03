/*eslint-disable*/
import React from 'react'

export const onlyDigit = new RegExp("^\\d+$");
// export const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
export const emailRegex = /^[0-9A-Za-z](\.?[0-9A-Za-z])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
export const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,}$)");
export const nicRegex = new RegExp("^([0-9]{9}[V|v|X|x]|[0-9]{12})$");

export const priceRegex = /^(?:0|[1-9][0-9]*)\.[0-9]+$|^\d+$/;
export const priceInputRegex = /^(?:0|[1-9][0-9]*)\.[0-9]+$|^\d+$|^([0-9]\.*)+$/;

export const basicContactNumberValidator = (identity) => {
  let mobileNumRegex = new RegExp("^(0)[0-9]{9}$|^(07)[0-9]{8}$");
  return mobileNumRegex.test(identity);
};

export const mobileNumValidator = (identity, condition) => {
  let mobileNumRegex = new RegExp("^(077)[0-9]{7}$|^(076)[0-9]{7}$|^(075)[0-9]{7}$|^(071)[0-9]{7}$|^(072)[0-9]{7}$|^(070)[0-9]{7}$|^(078)[0-9]{7}$");
  return mobileNumRegex.test(identity);
};
export const isOnlyNumbersValdator = value => {
  let reg = new RegExp('^\\d+$');
  return reg.test(value.trim());
};
export const customMobileValidation = (number,condition) => {
  if(!condition) condition = new RegExp("^(9474)[0-9]{7}$").test(number);
  return condition;
};
