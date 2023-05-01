import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext();

export const AuthContextProvider = ({children}) =>{
    const [currentUser, setCurrentUser] = useState({email: "",firstName:"", phone:"", lastName: "",token: "",username: "",_id: "", classesTaking:[], groupsIn:[]});
    return(
    <AuthContext.Provider value={{currentUser, setCurrentUser}}>
        {children}
    </AuthContext.Provider>
    );
}

