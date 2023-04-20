
import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext();

export const AuthContextProvider = ({children}) =>{
    const [currentUser, setCurrentUser] = useState({email: "New",firstName:"New",lastName: "New",token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjUwZTc2OTAyMjAyMmMyODEwOGNiNyIsImlhdCI6MTY4MTk0ODcxMiwiZXhwIjoxNjg0NTQwNzEyfQ.3Ura0EvSlmN53hEprKGQ7RfJe-RRJVRld2FomDFbGT4",username: "New",_id: "64250e769022022c28108cb7"});
    return(
    <AuthContext.Provider value={{currentUser, setCurrentUser}}>
        {children}
    </AuthContext.Provider>
    );
}