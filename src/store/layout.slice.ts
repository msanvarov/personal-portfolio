import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type ILayoutState, LanguageEnum, ThemeModeEnum } from './types';

const initialState: ILayoutState = {
  language: LanguageEnum.EN,
  themeMode: ThemeModeEnum.DARK,
  displayMobileNavbar: false,
};

export const layoutSlice = createSlice({
  name: '@@layout',
  initialState,
  reducers: {
    toggleLanguage: (state) => {
      state.language =
        state.language === LanguageEnum.EN ? LanguageEnum.FR : LanguageEnum.EN;
    },
    toggleDisplayMobileNavbar: (state) => {
      state.displayMobileNavbar = !state.displayMobileNavbar;
    },
    toggleThemeMode: (state) => {
      state.themeMode =
        state.themeMode === ThemeModeEnum.DARK
          ? ThemeModeEnum.LIGHT
          : ThemeModeEnum.DARK;
    },
    setThemeMode: (state, action: PayloadAction<ThemeModeEnum>) => {
      state.themeMode = action.payload;
    },
  },
});

export const {
  toggleLanguage,
  toggleDisplayMobileNavbar,
  setThemeMode,
  toggleThemeMode,
} = layoutSlice.actions;

export const layoutReducer = layoutSlice.reducer;
