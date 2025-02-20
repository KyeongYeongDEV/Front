interface PillAlarmType {
  date: string;
  pillAlarmDetail : string;
  addMemo : string;
  minTime : number;
  hourTime : number;
}

interface PillAlarmDayDataType {
  dailyPillAlarmCount : string;
  alarms : PillAlarmType[]
}

interface PillAlarmDayResponseType {
  message : string;
  success : string;
  data : PillAlarmDayDataType;
}

export type { PillAlarmDayDataType, PillAlarmDayResponseType };