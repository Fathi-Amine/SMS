import { createSlice } from '@reduxjs/toolkit';

export function createToggleSlice(name, initialState) {
    const slice = createSlice({
        name,
        initialState: { [name]: initialState },
        reducers: {
            [`toggle${name.charAt(0).toUpperCase() + name.slice(1)}`]: state => {
                state[name] = !state[name];
            },
        },
    });
    return {
        ...slice,
        toggle: slice.actions[`toggle${name.charAt(0).toUpperCase() + name.slice(1)}`],
    };
}

export const menuSlice = createToggleSlice('menu', true);
export const chatSlice = createToggleSlice('chat', false);
export const toggleMenu = menuSlice.toggle;
export const toggleChat = chatSlice.toggle;