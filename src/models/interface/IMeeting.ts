import { RootData } from "models/ApiResponses/MeetingResponse";
import { MutableRefObject } from "react";
import { IdropDown } from "./ISetting";
import { IRepresentativeEnteredDetail } from "./ICreateCustomer";
import { IFlatlistIndex } from "./IMessage";
import { IInput } from "@shared-constants";

export interface IPlannedMeetingData{
    last_page: number;
    data:RootData[]
}

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

export interface IunplannedDropDown{
    [key:string|number]:IdropDown[]
    2:[],
    3:IdropDown[],
    5:IdropDown[],
    7:IdropDown[],
    11:IdropDown[],

}

export interface  IUnplannedMeetingEnteredDetail{
    [key:string|number]:MutableRefObject<number|string|undefined|null>;
    code:MutableRefObject<string|undefined>,
    name:MutableRefObject<string|undefined>,
    customer_status:MutableRefObject<number|undefined>,
    customer_type:MutableRefObject<number|undefined>,
    customer_region:MutableRefObject<string|undefined>,
    mode_of_meeting:MutableRefObject<number|undefined>,
    visit_date:MutableRefObject<string|undefined>,
    other_issue:MutableRefObject<string|undefined>;
    visit_time:MutableRefObject<string|undefined>,
    visit_reason:MutableRefObject<number|undefined>,
    discussion_point:MutableRefObject<string|undefined>,
    accompying_executive:MutableRefObject<string|undefined>,
}

export interface IissueDetail{
    [key:string|number]:MutableRefObject<number|string|boolean|undefined>,
    issueName:MutableRefObject<string|undefined>,
    comment:MutableRefObject<string|undefined>,
    escalatedTo:MutableRefObject<number|undefined>,
    escalated_comment:MutableRefObject<string|undefined>,
    resolved_status:MutableRefObject<number|undefined>,
    
  }

  export interface IBtnStatus{
    submitBtn: boolean,
    representativeBtn: boolean
  }

  export interface IIisueList{
    issueList: object[],
    issueListDetail: Iissue[],
  }

  export interface Iissue{
    issueName:string
    comment:string,
    escalatedTo:number,
    escalated_comment:string,
    resolved_status:number,
  }


export interface IRepresentativeList{
    representativeList: string[];
    representativeListDetail: IRepresentativeEnteredDetail[];
    representativeDropDown: IdropDown[];
  }

  export interface IFlatlistRectangularBox extends IFlatlistIndex{
  item:RootData
  }

  export interface IUnplannedMeetingField extends IFlatlistIndex{
    item: IInput;
    }

    export interface IUnplannedDropDownList{
      [key:string|number]:any[],
      
    }

  
  
