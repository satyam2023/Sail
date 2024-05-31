import { RootData } from "models/ApiResponses/MeetingResponse";
import { MutableRefObject } from "react";
import { IdropDown } from "./ISetting";
import { IFlatlistIndex } from "./IMessage";
import { ImageURISource, InputModeOptions } from "react-native";
import StringConstants from "shared/localization";
import { Colors } from "commonStyles/RNColor.style";
import Glyphs from "assets/Glyphs";

export interface IPlannedMeetingData extends RootData {}

// export interface IAddUnplannedVisitEnteredDetail{
//     customerCode: string;
//     customerName: string;
//     customerStatus: string;
//     customerType: string;
//     customerRegion: string;
//     modeOfMeeting: string;
//     reason: string;
//     otherReason: string;
//     regionSelectedValue: string;
//     ModeSelectedValue: string;
//     representative: string;
//     reasonSelectedValue: string;
//     discussionPoints: string;
//     selectedDate: string;
//     selectedTime: string;
//     enterReason?: string;
// }

export interface IunplannedDropDown {
  [key: string | number]: IdropDown[];
  2: [];
  3: IdropDown[];
  5: IdropDown[];
  7: IdropDown[];
  11: IdropDown[];
}

export interface IUnplannedMeetingEnteredDetail {
  [key: string | number]: MutableRefObject<number | string | undefined | null>;
  code: MutableRefObject<string | undefined>;
  name: MutableRefObject<string | undefined>;
  customer_status: MutableRefObject<number | undefined>;
  customer_type: MutableRefObject<number | undefined>;
  customer_region: MutableRefObject<string | undefined>;
  mode_of_meeting: MutableRefObject<number | undefined>;
  visit_date: MutableRefObject<string | undefined>;
  other_issue: MutableRefObject<string | undefined>;
  visit_time: MutableRefObject<string | undefined>;
  visit_reason: MutableRefObject<number | undefined>;
  discussion_point: MutableRefObject<string | undefined>;
  accompying_executive: MutableRefObject<string | undefined>;
}

export interface IissueDetail {
  [key: string | number]: MutableRefObject<
    number | string | boolean | undefined
  >;
  issueName: MutableRefObject<string | undefined>;
  comment: MutableRefObject<string | undefined>;
  escalatedTo: MutableRefObject<string | undefined>;
  escalated_comment: MutableRefObject<string | undefined>;
  resolved_status: MutableRefObject<number | undefined>;
}

export interface IssueDetails {
  [key: string]: string;
  issueName: string;
  comment: string;
  escalatedTo: string;
  escalated_comment: string;
  resolved_status: string;
}

export interface PlannedMeetingUpdate {
  [key: string | number]: string | IdropDown[];
  visitTime: string;
  discussionPoint: string;
  accompying: IdropDown[];
}

export interface IBtnStatus {
  submitBtn: boolean;
  representativeBtn: boolean;
}

export interface Escalation_Accompying {
  escalation: boolean;
  accompying: boolean;
}

export interface IIisueList {
  issueList: object[];
  issueListDetail: Iissue[];
}

export interface Iissue {
  issueName: string;
  comment: string;
  escalatedTo: string;
  escalated_comment: string;
  resolved_status: number;
}

export interface IRepresentativeList {
  representativeList: string[];
  representativeListDetail: IDetail[];
  representativeDropDown: IdropDown[];
}

export interface IDetail {
  name: string;
  designation: string;
  dept: string;
  address: string;
  email: string;
  contact: string;
  whatsApp: string;
}
export interface IFlatlistRectangularBox extends IFlatlistIndex {
  item: RootData;
}

export interface IUnplannedMeetingField extends IFlatlistIndex {
  item: IUnplannedInput;
}

export interface IUnplannedDropDownList {
  [key: string | number]: any[];
}

export interface IssueDetailInputField {
  placeholder: string;
  rightIcon?: ImageURISource;
  dropDownTintColor?: string;
  rightIconTintColor?: string;
  key: string;
}
export const IssueDetailInputField: IssueDetailInputField[] = [
  {
    placeholder: StringConstants.SELECT_ISSUE,
    dropDownTintColor: Colors.sailRed,
    key: "issueName",
  },
  {
    placeholder: StringConstants.COMMENT,
    rightIcon: Glyphs.Mic,
    rightIconTintColor: Colors.darkGrey,
    key: "comment",
  },
  {
    placeholder: StringConstants.ESCALATED_TO,
    key: "escalatedTo",
  },
  {
    placeholder: StringConstants.ESCALATED_COMMENT,
    rightIcon: Glyphs.Mic,
    rightIconTintColor: Colors.darkGrey,
    key: "escalated_comment",
  },
];

export interface IFlatlistIssueField extends IFlatlistIndex {
  item: IssueDetailInputField;
}

export interface IFlatlistRepresentativeDetail extends IFlatlistIndex {
  item: IMeetingRepresentativeDetailInputField;
}

export interface VoicDetails {
  type: string;
  index: number;
}



export interface IPlannedMeetingInputField {
    placeHolder: string;
    maxLength: number;
    rightIcon: ImageURISource | undefined;
    leftIcon: ImageURISource | undefined;
    key: string;
  }

  export interface IFlatListPlannedMeeting extends IFlatlistIndex{
     item:IPlannedMeetingInputField;
  }

  export interface IUnplannedInput {
    placeholder: string;
    length?: number;
    rightIcon?: ImageURISource;
    leftIcon?: ImageURISource;
    inputMode?: string;
    key?: string;
  }

  export interface IMeetingRepresentativeDetailInputField {
    placeholder: string;
    maxlength: number;
    inputMode: InputModeOptions;
    key?: string;
  }