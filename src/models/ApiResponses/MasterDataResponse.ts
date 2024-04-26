export interface MasterDataResponse {
  RolesData: RolesValue[];
  LocationData: LocationValue[];
}

export interface RolesValue {
  id: number;
  name: string;
}

export interface LocationValue {
  id: number;
  name: string;
}

export type MasterDataStates = {
  masterValue: {
    location: string;
    role: string;
  };
  masterData: {
    masterLocation: Array<object>;
    masterRole: Array<object>;
  };
};
