import { atom } from 'recoil';

export const childGrowthState = atom({
  key: 'childGrowthState',
  default: [], // Array to store growth records
});

export const vaccinationState = atom({
  key: 'vaccinationState',
  default: [], // Array to store vaccination details
});
