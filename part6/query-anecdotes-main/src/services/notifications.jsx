import { useReducer, createContext, useContext } from "react";

const notificationReducer = (state, action) => {
    switch (action.type) {
        case "SET_NOTIFICATION":
            return action.data;
        case "CLEAR_NOTIFICATION":
            return null;
        default:
            return state;
    }
};

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notification, dispatch] = useReducer(notificationReducer, null);

    return (
        <NotificationContext.Provider value={{ notification, dispatch }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const { notification, dispatch } = useContext(NotificationContext);

    const setNotification = (message) => {
        dispatch({ type: "SET_NOTIFICATION", data: message });
        setTimeout(() => {
            dispatch({ type: "CLEAR_NOTIFICATION" });
        }, 5000);
    };

    return { notification, setNotification };
}

export default NotificationProvider;