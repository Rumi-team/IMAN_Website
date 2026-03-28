export interface Prayer {
  en: string;
  fa: string;
  time: string;
  active?: boolean;
}

export interface PrayerDate {
  gregorian: string;
  shamsi: string;
  hijri: string;
}

export interface Service {
  en: string;
  fa: string;
  desc: string;
  descFa: string;
  href: string;
  schedule?: string;
  scheduleFa?: string;
}

export interface Event {
  day: string;
  month: string;
  title: string;
  fa: string;
  time: string;
  desc: string;
  color: string;
}
