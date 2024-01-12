import React, { useState } from "react";
import { LoginForms } from "./LoginForms";
import { RegisterForms } from "./RegisterForms";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [login,setLogin] = useState(true);

    const setPage = () => {
        setLogin(!login);
    }

    return login ? <LoginForms setPage={setPage}/> : <RegisterForms setPage={setPage}/> ;
}