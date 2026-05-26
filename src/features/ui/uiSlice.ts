import { createSlice } from '@reduxjs/toolkit';

const getInitialTheme = (): boolean => {
    const savedTheme = localStorage.getItem('hospital_theme');
    return savedTheme === 'dark';
};

interface UiState {
    darkMode: boolean;
}

const initialState: UiState = {
    darkMode: getInitialTheme(),
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleDarkMode: (state) => {
            state.darkMode = !state.darkMode;
            localStorage.setItem('hospital_theme', state.darkMode ? 'dark' : 'light');
        },
    },
});

export const { toggleDarkMode } = uiSlice.actions;
export default uiSlice.reducer;