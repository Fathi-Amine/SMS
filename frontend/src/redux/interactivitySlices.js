import { createSlice } from '@reduxjs/toolkit';

const initialState = { activeComponent: 'none' };

export const interactivitySlice = createSlice({
    name: 'interactivity',
    initialState: {
        menu: true,
        chat: false,
        cart: false,
        notification: false,
        userProfile: false,
        screenSize: window.innerWidth,
    },
    reducers: {
        toggleMenu: state => {
            state.menu = !state.menu;
        },
        toggleChat: state => {
            state.activeComponent = state.activeComponent === 'chat' ? 'none' : 'chat';
        },
        toggleCart: state => {
            state.activeComponent = state.activeComponent === 'cart' ? 'none' : 'cart';
        },
        toggleNotification: state => {
            state.activeComponent = state.activeComponent === 'notification' ? 'none' : 'notification';
        },
        toggleUserProfile: state => {
            state.activeComponent = state.activeComponent === 'userProfile' ? 'none' : 'userProfile';
        },
        setScreenSize: (state, action) => {
            state.screenSize = action.payload;
        },
    },
});

export const {
    toggleMenu,
    toggleChat,
    toggleCart,
    toggleNotification,
    toggleUserProfile,
    setScreenSize,
} = interactivitySlice.actions;

export default interactivitySlice.reducer;
/*
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
export const cartSlice = createToggleSlice('cart', false);
export const notificationSlice = createToggleSlice('notification', false);
export const userProfileSlice = createToggleSlice('userProfile', false);


export const toggleMenu = menuSlice.toggle;
export const toggleChat = chatSlice.toggle;
export const toggleCart = cartSlice.toggle;
export const toggleNotification = notificationSlice.toggle;
export const toggleUserProfile = userProfileSlice.toggle;*/
