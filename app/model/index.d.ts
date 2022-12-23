import { Instance, Model } from 'sequelize';
export type sequlizeModel<T> = Model<T & Instance<T>, T>;

export interface User {
  id?: number;
  mobile?: string;
  password?: string;
  openId?: string;
  nickname?: string;
  avatarUrl?: string;
  isAdmin?: boolean;
  dataValues?: any;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MyFriend {
  id?: number;
  friendId?: number;
  userId: number;
  name: string;
  birthday: Date;
  isLunar: boolean;
  zodiac: number;
  shareCode?: string;
  solarBirthday?: { year: number; month: number; day: number };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Movie {
  uid?: number;
  id?: string;
  rating?: any;
  pubdate?: string;
  pic?: any;
  year?: string;
  cardSubtitle?: string;
  genres?: any;
  title?: string;
  actors?: any;
  url?: string;
  directors?: any;
  coverUrl?: string;
  subtype?: string;
  comment?: any;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ShareBirthday {
  id?: number;
  shareBirthdayId?: number;
  shareBirthdayAddId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface HistoryEvent {
  date?: string;
  events?: object;
  createdAt?: Date;
  updatedAt?: Date;
}

enum WxSubscriptionStatusEnum {
  success = 1,
  fail = 2,
}
export interface WxSubscription {
  id?: number;
  userId?: number;
  name?: string;
  when?: Date;
  content?: object;
  status?: WxSubscriptionStatusEnum;
  templateId?: string;
  eventId?: number;
  ErrMessage?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
