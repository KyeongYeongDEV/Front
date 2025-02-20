interface hospitalAlarmType {
  hospitalAlarmId : number;
  date : string;
  hourTime : number;
  minTime : number;
  hospitalName : string;
  hospitalAlarmDetail : string;
  addMemo : string;
};

interface hospitalAlarmDayDataType {
  dailyHospitalAlarmCount : number;
  alarms : hospitalAlarmType[];
}

interface hospitalAlarmDayResponseType {
  success : string;
  message : string;
  data : hospitalAlarmDayDataType;
}

export type { hospitalAlarmDayDataType, hospitalAlarmDayResponseType };