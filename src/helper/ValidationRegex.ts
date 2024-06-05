import StringConstants from "shared/localization";

export const Regex = {
  INITIALS_REPLACE: /[^a-zA-Z- ]/g,
  INITIALS_MATCH: /\b\w/g,
  UPN: /^[A-Za-z](?=.*\d)[A-Za-z\d]{6}$/,
  NAME: /^[A-Za-z.& ]+(?:[ -']+[A-Za-z.& ]+)*$/,
  CONTACT: /^(?![0])(\+\d{1,3}[- ]?)?\d{10}$/,
  PASSWORD: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
  EMAIL: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/,
  ALPHA_NUMERIC: /^[a-zA-Z0-9_]*$/,
  REQUIRED: /.+/,
  ONLY_NUMBER: /^[0-9]*$/,
  CUSTOMER_CODE: /^\d{10}$/,
  WEBSITE: /^(http[s]?:\/\/)?(www\.)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})(\/\S*)?$/,
  PAN: /^[A-Z]{3}[ABCFGHLJPTK][A-Z]{1}\d{4}[A-Z]{1}$/,
  GST: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
  NUMBER_MAX: /^\d{10}$/,
  SLASHNAME: /^[A-Za-z.&/() ]+(?:[ -']+[A-Za-z.&/() ]+)*$/,
  ADDRESS: /^[#.0-9a-zA-Z\s,-]+$/,
  OTP:/^\d{6}$/,
};

export const personalValidationRules = {
  Upn: [
    {
      regex: Regex.REQUIRED,
      message: StringConstants.REQUIRED
    },
    {
      regex: Regex.UPN,
      message: StringConstants.INVALID,
    },
  ],
  Contact:[
   { regex:Regex.CONTACT,
     message:StringConstants.INVALID_CONTACT
   }
  ]
};

export const updatedPlannedVisitValidationRule={
  visitTime:[
    {
      regex: Regex.REQUIRED,
      message: StringConstants.REQUIRED
    },
  ],
  discussionPoint:[
    {
      regex: Regex.REQUIRED,
      message: StringConstants.REQUIRED
    },
    {
      regex: Regex.NAME,
      message: StringConstants.INVALID,
    },
  ]
}

export const representativeValidationRules = {
  name: [
    {
      regex: Regex.NAME,
      message: StringConstants.INVALID_NAME,
    },
  ],
  email: [
    {
      regex: Regex.EMAIL,
      message: StringConstants.INVALID_EMAIL,
    },
  ],
  designation: [
    {
      regex: Regex.NAME,
      message: `${StringConstants.INVALID} ${StringConstants.DESIGNATION}`,
    },
  ],
  dept: [
    {
      regex: Regex.NAME,
      message: `${StringConstants.INVALID} ${StringConstants.DEPARTMENT}`,
    },
  ],
  contact: [
    {
      regex: Regex.CONTACT,
      message: StringConstants.INVALID_CONTACT,
    },
  ],
  whatsApp: [
    {
      regex: Regex.CONTACT,
      message: `${StringConstants.INVALID} ${StringConstants.WHATSAPPNO}`,
    },
  ],
};

export const competitorValidationRules={
  company:[
    {
      regex: Regex.REQUIRED,
      message: StringConstants.REQUIRED
    },
  ],
 address:[
    {
      regex: Regex.REQUIRED,
      message: StringConstants.REQUIRED
    },
    {
      regex: Regex.NAME,
      message: StringConstants.INVALID,
    },
  ],
  comment:[
    {
      regex: Regex.REQUIRED,
      message: StringConstants.REQUIRED
    },
  ]
}

export const traderDealerTypeValidationRule={
  contact_number:[
    {
      regex: Regex.REQUIRED,
      message: StringConstants.REQUIRED
    },
    {
      regex: Regex.CONTACT,
      message: StringConstants.INVALID_CONTACT
    }
  ],
  day_wise_stock:[
    {
      regex: Regex.REQUIRED,
      message: StringConstants.REQUIRED
    },
    {
      regex: Regex.NAME,
      message: StringConstants.INVALID,
    },
  ],
  price_feedback_competitor:[
    {
      regex: Regex.REQUIRED,
      message: StringConstants.REQUIRED
    },
  ],
  tentative_quality_procured:[
    {
      regex: Regex.REQUIRED,
      message: StringConstants.REQUIRED
    },
  ],

}

export const projectTypeValidationRule={
  project_details:[
    {
      regex: Regex.REQUIRED,
      message: StringConstants.REQUIRED
    },
  ],
  tentative_quality_procured:[
    {
      regex: Regex.REQUIRED,
      message: StringConstants.REQUIRED
    },
  ],

}


export const customerValidationRules={
  code: [
    {
      regex: Regex.ONLY_NUMBER,
      message: `${StringConstants.INVALID} ${StringConstants.CUS_CODE}`,
    },
    {
      regex: Regex.NUMBER_MAX,
      message: StringConstants.ENTER_TEN_DIGIT,
    },
  ],
  company:[
    {
      regex: Regex.REQUIRED,
      message: StringConstants.REQUIRED
    },
  ],
pan:[
  {
    regex: Regex.REQUIRED,
    message: StringConstants.REQUIRED
  },
  {
    regex: Regex.PAN,
    message: StringConstants.INVALID_PAN,
  },
],
gst:[
  {
    regex: Regex.REQUIRED,
    message: StringConstants.REQUIRED
  },
  {
    regex: Regex.GST,
    message: StringConstants.INVALID_GST,
  },
],
website:[
  {
    regex: Regex.REQUIRED,
    message: StringConstants.REQUIRED
  },
  {
    regex: Regex.WEBSITE,
     message: StringConstants.INVALID_WEBSITE,
  },
],
location:[
  {
    regex: Regex.REQUIRED,
    message: StringConstants.REQUIRED
  },
  {
    regex: Regex.ADDRESS,
     message: StringConstants.INVALID_ADDRESS,
  },
],
latitude:[{
  regex: Regex.REQUIRED,
  message: StringConstants.REQUIRED
}],
longitude:[{
  regex: Regex.REQUIRED,
  message: StringConstants.REQUIRED
}],

}

export const updatedCustomerValidationRules={
pan:[
  {
    regex: Regex.REQUIRED,
    message: StringConstants.REQUIRED
  },
  {
    regex: Regex.PAN,
    message: StringConstants.INVALID_PAN,
  },
],
gst:[
  {
    regex: Regex.REQUIRED,
    message: StringConstants.REQUIRED
  },
  {
    regex: Regex.GST,
    message: StringConstants.INVALID_GST,
  },
],
website:[
  {
    regex: Regex.REQUIRED,
    message: StringConstants.REQUIRED
  },
  {
    regex: Regex.WEBSITE,
     message: StringConstants.INVALID_WEBSITE,
  },
],
latitude:[{
  regex: Regex.REQUIRED,
  message: StringConstants.REQUIRED
}],
longitude:[{
  regex: Regex.REQUIRED,
  message: StringConstants.REQUIRED
}],
cust_seg:[{
  regex: Regex.REQUIRED,
  message: StringConstants.REQUIRED
}],
cust_sub_seg:[{
  regex: Regex.REQUIRED,
  message: StringConstants.REQUIRED
}],
cust_sub_type:[{
  regex: Regex.REQUIRED,
  message: StringConstants.REQUIRED
}]


}

export const forgotValidationRules = {
  upn: [
    {
      regex: Regex.REQUIRED,
      message: StringConstants.REQUIRED
    },
    {
      regex: Regex.UPN,
      message: StringConstants.INVALID,
    },
  ],
  contact:[
    {
      regex: Regex.REQUIRED,
      message: StringConstants.REQUIRED
    },
   { regex:Regex.CONTACT,
     message:StringConstants.INVALID_CONTACT
   }
  ]
};

export const otpValidationRules = {
  otp: [
    {
      regex: Regex.REQUIRED,
      message: StringConstants.REQUIRED
    },
    {
      regex: Regex.OTP,
      message: StringConstants.INVALID,
    },
  ]
};




export const customerTypeValidationRules={
  cluster:[
    {
      regex: Regex.REQUIRED,
      message: StringConstants.REQUIRED,
    },
    
  ],
  contact_number:[
    {
      regex: Regex.REQUIRED,
      message: StringConstants.REQUIRED,
    },
    
  ],
  day_wise_stock:[
    {
      regex: Regex.REQUIRED,
      message: StringConstants.REQUIRED,
    },
    
  ],
  price_feedback_competitor:[
    {
      regex: Regex.REQUIRED,
      message: StringConstants.REQUIRED,
    },
    
  ],
  procured_products:[
    {
      regex: Regex.REQUIRED,
      message: StringConstants.REQUIRED,
    },
    
  ],
  tentative_quality_procured:[
    {
      regex: Regex.REQUIRED,
      message: StringConstants.REQUIRED,
    },
    
  ],
  supplier:[
    {
      regex: Regex.ONLY_NUMBER,
      message: StringConstants.REQUIRED,
    },
    
  ],

}



export const passwordValidationRules = {
  Password: [
    {
      regex: Regex.REQUIRED,
      message: StringConstants.REQUIRED,
    },
    {
      regex: Regex.PASSWORD,
      message: StringConstants.ERROR_MESSAGE,
    },
  ],
  Confirm_Password: [
    {
      regex: Regex.REQUIRED,
      message: StringConstants.REQUIRED,
    },
    {
      regex: Regex.PASSWORD,
      message:StringConstants.ERROR_MESSAGE,
    },
  ],
};

export const issueListValidationRule={};

export const unplannedVisitValidationRule = {
 code: [
    {
      regex: Regex.ONLY_NUMBER,
      message: `${StringConstants.INVALID} ${StringConstants.CUS_CODE}`,
    },
    {
      regex: Regex.NUMBER_MAX,
      message: StringConstants.ENTER_TEN_DIGIT,
    },
  ],
  name: [
    {
      regex: Regex.NAME,
      message: `${StringConstants.INVALID} ${StringConstants.CUST_NAME}`,
    },
  ],
  discussion_point: [
    {
      regex: Regex.REQUIRED,
      message: StringConstants.REQUIRED,
    },
  ],
  visit_date: [
    {
      regex: Regex.REQUIRED,
      message: StringConstants.REQUIRED,
    },
  ],
  visit_time: [
    {
      regex: Regex.REQUIRED,
      message: StringConstants.REQUIRED,
    },
  ],
};

export const roleValidationRules = {
  Name: [
    {
      regex: Regex.REQUIRED,
      message: StringConstants.REQUIRED,
    },
    {
      regex: Regex.NAME,
      message: StringConstants.INVALID_NAME,
    },
  ],
  Email: [
    {
      regex: Regex.REQUIRED,
      message: StringConstants.REQUIRED,
    },
    {
      regex: Regex.EMAIL,
      message: StringConstants.INVALID_EMAIL,
    },
  ],
};

export const detailUpdatevalidationRules = {
  email: [
    {
      regex: Regex.REQUIRED,
      message: StringConstants.REQUIRED,
    },
    {
      regex: Regex.EMAIL,
      message: StringConstants.INVALID_EMAIL,
    },
  ],
};

export const signInValidationRules = {
  upn: [
    {
      regex: Regex.REQUIRED,
      message: StringConstants.REQUIRED,
    },
    {
      regex: Regex.UPN,
      message: StringConstants.INVALID_UPN,
    },
  ],

  password: [
    {
      regex: Regex.REQUIRED,
      message:StringConstants.REQUIRED,
    },
    {
      regex: Regex.PASSWORD,
      message:StringConstants.ERROR_MESSAGE,
    },
  ],
};

export const createVisitValidation= {
  customerCode: [
    {
      regex: Regex.ONLY_NUMBER,
      message: `${StringConstants.INVALID} ${StringConstants.CUS_CODE}`,
    },
    {
      regex: Regex.NUMBER_MAX,
      message: StringConstants.ENTER_TEN_DIGIT,
    },
  ],
  name: [
    {
      regex: Regex.SLASHNAME,
      message: StringConstants.INVALID_NAME,
    },
  ],
  nickName: [
    {
      regex: Regex.NAME,
      message: `${StringConstants.INVALID} ${StringConstants.NICK_NAME}`,
    },
  ],
 
};

export const checkOnlyNumber = (text: string) => {
  return Regex.ONLY_NUMBER.test(text);
};

export const checkCustomerCode = (text: string) => {
  return Regex.CUSTOMER_CODE.test(text);
};


