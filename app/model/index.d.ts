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
