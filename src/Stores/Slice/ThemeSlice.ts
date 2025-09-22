import { createSlice } from '@reduxjs/toolkit';

interface ThemeState {
  currentTheme: string | undefined;
}

const initialState: ThemeState = {
  currentTheme: undefined,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.currentTheme = action.payload;
    },
    toggleTheme: state => {
      state.currentTheme = state.currentTheme === 'dark' ? 'light' : 'dark';
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTheme, toggleTheme } = themeSlice.actions;
