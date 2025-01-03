/**
 * Created by WebStorm.
 * User: athukorala
 * Date: 4/20/20
 * Time: 1:56 PM
 */
import swal from "sweetalert";
import toastr from 'toastr';
import Cookies from "js-cookie";
import * as constant from "../configs/constant";
import React from "react";
import fractionUnicode from 'fraction-unicode';
import {
  SELECTED_PACKAGE_ID, YES_TYPE
} from "../configs/constant";

export const sureTxt = "Are you sure you want to do this?";
export const receivedTxt = "Did you receive your order?";

export const notifyMessage = (msg, type, duration, place = null) => {
  let msgType = "error";

  if (type === 0) {
    msgType = "error"
  } else if (type === 1) {
    msgType = "success"
  } else if (type === 2) {
    msgType = "warning"

  }
  toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": place ? `toast-top-${place}` : "toast-top-right",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "2500",
    "hideDuration": "2500",
    "timeOut": duration ? duration : "2500",
    "extendedTimeOut": "2500",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  };
  toastr[msgType](msg === undefined || msg === null ? type === 0 ? "Error" : "Success" : msg, type === 0 ? 'Error' : type === 1 ? 'Success' : type === 2 ? 'Warning' : "Error")
};
export const customPlaceholder = (selectedCountryPlaceholder, selectedCountryData) => {
  // return selectedCountryData.dialCode + "XXXXXXXXX";
  return "";
};
export const onFileError = (error) => {
  notifyMessage(error.message);
};

export function readFile(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

export const warningAlert = (msg, type, redirect) => {
  swal({
    title: msg,
    // icon: type === 0 ? 'success' : 'error',
    closeOnClickOutside: false,
    buttons: {
      dangerMode: {
        text: "Okay",
        value: "action",
        className: "okay-btn"
      }
    }
  })
    .then((value) => {
      switch (value) {

        case "action":
          break;
        default:
      }
    })
};

export const warningAlert_ = (msg,subText, type) => {
  swal({
    title: msg,
    text: subText,
    icon: type === 0 ? 'success' : 'error',
    closeOnClickOutside: false,
    buttons: {
      dangerMode: {
        text: "Okay",
        value: "action",
        className: "okay-btn"
      }
    }
  })
    .then((value) => {
      switch (value) {

        case "action":
          break;
        default:
      }
    })
};
export const formatCurrency = (val) => {
  val = val === undefined ? 0 : val;
  // return val.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '1,');
  return val.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const checkAuthHandler = async () => {
  let isAuth = await Cookies.get(constant.ACCESS_TOKEN);
  return !!isAuth;
};
export const compressImage = async (files) => {

};
export const getTableHeader = (status) => {
    return <tr>
      <th>Image</th>
      <th>Item</th>
      <th>Quantity</th>
      <th>Unit Price</th>
      <th>Sub Total</th>
    </tr>;
};
export const getBase64FromUrl = async (url) => {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function() {
      const base64data = reader.result;
      resolve(base64data);
    }
  });
}
export const numberWithCommas = (value) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
export const getUserTokekn = () => {
  return Cookies.get(constant.ACCESS_TOKEN)
}
export const getUserId = () => {
  return Cookies.get(constant.ADMIN_ID)
}
export const getUserEmail = () => {
  return Cookies.get(constant.ADMIN_EMAIL)
}
export const getSelectedPackageId = () => {
  return localStorage.getItem(SELECTED_PACKAGE_ID)
}

export const getPackageIsActive = () => {
  let token = getUserTokekn()
  let packageAvailable = Cookies.get(constant.USER_CURRENT_PACKAGE_ACTIVE);
  if(token === null || token === undefined) return true;
  return packageAvailable === YES_TYPE
}
export const conditionalRowStyles = [
  {
    when: (row) => row.index % 2 !== 0,
    style: {
      // backgroundColor: '#F3F2F7'
      backgroundColor:'#EEEEEE'
    }
  }
]
export const measurementValue = (value) => {
  if(value && value.toString().indexOf(".") !== -1) {
    let vArr = value.toString().split(".");
    if(vArr.length > 0) {
      let v = vArr[1];
      if(v.toString().length > 4) {
        v = v.toString().substr(0,4)
      }
      let parseV = parseInt(v);
      if(parseV === 3 || parseV === 33 || parseV === 333 || parseV === 3333 || parseV === 33333 || parseV === 333333) {
        let convert = fractionUnicode(1, 3);
        return vArr[0].toString() === "0" ? convert : `${vArr[0]} ${convert}`
      }
      if(parseV === 6 || parseV === 66 || parseV === 666 || parseV === 6666 || parseV === 66666 || parseV === 666666) {
        let convert = fractionUnicode(2, 3);
        return vArr[0].toString() === "0" ? convert : `${vArr[0]} ${convert}`
      }
      let obj = getFraction(`0.${v}`)
      let convert = fractionUnicode(obj.numerator, obj.denominator);
      return vArr[0].toString() === "0" ? convert : `${vArr[0]} ${convert}`
    }else{
      return value;
    }

  }else{
    return value ? value : "";
  }

}
const getFraction = (decimal) => {
  try {
    for(var denominator = 1; (decimal * denominator) % 1 !== 0; denominator++);
    return {numerator: decimal * denominator, denominator: denominator};
  }catch (err) {
    console.log("err",err)
  }
}
export const timeCalcHandler = (totalMinutes) => {
  if(totalMinutes) {
    let hours = Math.floor(totalMinutes / 60);
    let minutes = totalMinutes % 60;
    if(hours !== 0 && minutes !== 0) {
      return `${hours} ${hours > 1 ? 'hours':'hour'} ${minutes} mins`;
    }else if(hours === 0 && minutes) {
      return `${minutes} mins`;
    }else if(hours && minutes === 0) {
      return `${hours} ${hours > 1 ? 'hours':'hour'}`;
    }
  }else{
    return "0 mins"
  }

}
export const toFixedNumber = (num, digits = 1, base =  10) => {
  const pow = Math.pow(base ?? 10, digits);
  return Math.round(num*pow) / pow;
}
