import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    REGISTER_USER_RESET,
    LOGOUT_USER_REQUEST,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAILURE,
    LOGOUT_USER_RESET,
    LOGIN_RESET,
} from "../actionTypes/userTypes";

const authInitialState = {
    user: {},
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    login: {
        isLoading: false,
        isError: false,
        error: null,
        isSuccess: false,
    },
    register: {
        isLoading: false,
        isError: false,
        error: null,
        isSuccess: false,
    },
    logout: {
        isLoading: false,
        isError: false,
        error: null,
        isSuccess: false,
    },
    profile: {
        isLoading: false,
        isError: false,
        error: null,
        isSuccess: false,
    },
};

export const authReducer = (state = authInitialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                login: {
                    ...state.login,
                    isLoading: true,
                },
            };

        case LOGIN_SUCCESS:
            const { user, token } = action.payload;
            return {
                ...state,
                isAuthenticated: true,
                user,
                token,
                login: {
                    ...state.login,
                    isLoading: false,
                    isSuccess: true,
                },
            };

        case LOGIN_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                user: {},
                token: null,
                login: {
                    ...state.login,
                    isLoading: false,
                    isError: true,
                    error: action.payload,
                },
            };

        case LOGIN_RESET:
            return {
                ...state,
                login: {
                    ...state.login,
                    isLoading: false,
                    isError: false,
                    error: null,
                    isSuccess: false,
                },
            };

        case REGISTER_USER_REQUEST:
            return {
                ...state,
                register: {
                    ...state.register,
                    isLoading: true,
                },
            };

        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token,
                register: {
                    ...state.register,
                    isLoading: false,
                    isSuccess: true,
                },
            };

        case REGISTER_USER_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                user: {},
                token: null,
                register: {
                    ...state.register,
                    isLoading: false,
                    isError: true,
                    error: action.payload,
                },
            };

        case REGISTER_USER_RESET:
            return {
                ...state,
                register: {
                    ...state.register,
                    isLoading: false,
                    isError: false,
                    error: null,
                    isSuccess: false,
                },
            };

        case LOGOUT_USER_REQUEST:
            return {
                ...state,
                logout: {
                    ...state.logout,
                    isLoading: true,
                },
            };

        case LOGOUT_USER_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                user: {},
                token: null,
                logout: {
                    ...state.logout,
                    isLoading: false,
                    isSuccess: true,
                },
            };

        case LOGOUT_USER_FAILURE:
            return {
                ...state,
                logout: {
                    ...state.logout,
                    isLoading: false,
                    isError: true,
                    error: action.payload,
                },
            };

        case LOGOUT_USER_RESET:
            return {
                ...state,
                logout: {
                    ...state.logout,
                    isLoading: false,
                    isError: false,
                    error: null,
                    isSuccess: false,
                },
            };
        default:
            return state;
    }
};