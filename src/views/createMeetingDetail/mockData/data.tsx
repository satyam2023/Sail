import StringConstants from "shared/localization";


export interface ICustomerRectangularBoxData{
    heading:string,
    subHeading:string
}
export const CustomerRectangularBoxDetail = [
  {
    heading: StringConstants.CUSTOMER_CODE_NUMBER,
    subHeading: StringConstants.XYZ_STEELWORKS,
  },
  {
    heading: StringConstants.CUSTOMER_CODE_NUMBER,
    subHeading: StringConstants.XYZ_STEELWORKS,
  },
  {
    heading: StringConstants.CUSTOMER_CODE_NUMBER,
    subHeading: StringConstants.XYZ_STEELWORKS,
  },
  {
    heading: StringConstants.CUSTOMER_CODE_NUMBER,
    subHeading: StringConstants.XYZ_STEELWORKS,
  },
  
];

const CustomerType = [
  {key:1, segment: "A" },
  {key:2, segment: "A" },
  {key:3, segment: "A" },
  {key:4, segment: "A" },
  {key:5, segment: "A" },
  {key:6, segment: "A" },
  {key:7, segment: "A" },
];
const SelectDepartment = [
  { segment: "A" },
  { segment: "A" },
  { segment: "A" },
  { segment: "A" },
  { segment: "A" },
  { segment: "A" },
  { segment: "A" },
];

const SelectRegion = [
  { segment: "A" },
  { segment: "A" },
  { segment: "A" },
  { segment: "A" },
  { segment: "A" },
  { segment: "A" },
  { segment: "A" },
];
const CustomerMode = [
  { segment: "A" },
  { segment: "A" },
  { segment: "A" },
  { segment: "A" },
  { segment: "A" },
  { segment: "A" },
  { segment: "A" },
];
const CustomerStatus = [
  { segment: "A" },
  { segment: "A" },
  { segment: "A" },
  { segment: "A" },
  { segment: "A" },
  { segment: "A" },
  { segment: "A" },
];
const CustomerContactDetails = [
  { segment: "A" },
  { segment: "A" },
  { segment: "A" },
  { segment: "A" },
  { segment: "A" },
  { segment: "A" },
  { segment: "A" },
];

export {
  CustomerType,
  CustomerContactDetails,
  CustomerStatus,
  CustomerMode,
  SelectDepartment,
  SelectRegion,
};
