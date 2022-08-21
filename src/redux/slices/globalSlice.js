import { createSlice } from '@reduxjs/toolkit';
import { LOCALES } from '../../i18n';

const initialState = {
  locale: LOCALES.ENGLISH,
  isLoading: false,
};
const globalSlice = createSlice({
  name: 'globalSlice',
  initialState: initialState,
  reducers: {
    setLocale(state, action) {
      state.locale = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});
const { actions, reducer } = globalSlice;
export { actions as GlobalActions, reducer as GlobalReducer };
