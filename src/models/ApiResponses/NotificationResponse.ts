export type NotificationResponse = NotificationData[];

interface NotificationData {
  deatils: NotificationDeatils;
  notificationDate: string;
  notificationTitle: string;
}

export interface NotificationDeatils {
  customerCode: string;
  modeOfContact: string;
  reason: string;
  remarks: string;
  visitingExecutive: string;
}
