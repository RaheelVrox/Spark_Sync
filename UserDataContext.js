// UserDataContext.js
import React, { createContext, useContext, useReducer, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserDataContext = createContext();

// Action types
const SET_USER_DATA = "SET_USER_DATA";

// Reducer function
const userDataReducer = (state, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return { ...state, userData: action.payload };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  userData: null,
};

// Context provider
export const UserDataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userDataReducer, initialState);

  const setUserData = async (userData) => {
    dispatch({ type: SET_USER_DATA, payload: userData });
    // Save userData to AsyncStorage
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(userData));
    } catch (error) {
      console.error("Error saving userData to AsyncStorage:", error);
    }
  };

  useEffect(() => {
    // Get userData from AsyncStorage on component mount
    const getStoredUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem("userData");
        if (storedUserData) {
          dispatch({
            type: SET_USER_DATA,
            payload: JSON.parse(storedUserData),
          });
        }
      } catch (error) {
        console.error("Error retrieving userData from AsyncStorage:", error);
      }
    };

    getStoredUserData();
  }, []);

  return (
    <UserDataContext.Provider value={{ ...state, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

// Custom hook to use the context
export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
};
