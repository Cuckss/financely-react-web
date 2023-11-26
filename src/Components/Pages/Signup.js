import React from "react";
import Header from "../HeaderComponent/Header";
import SignupSignin from "../SignupSigninComponent/SignupSignin";
const Signup=()=>{
    return(
        <div>
            <Header/>
            <div className="wrapper-form">
              <SignupSignin/>
            </div>
        </div>
    )
}
export default Signup;