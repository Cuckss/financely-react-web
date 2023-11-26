import React,{useState} from "react";
import "./styles.css"
import Input from "../InputComponent/Input";
import Button from "../ButtonComponent/Button";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { doc, setDoc,getDoc } from "firebase/firestore"; 
import { db } from "../../firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { provider } from "../../firebase";

const SignupSignin=()=>{
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[confirmPassword,setConfirmPassword]=useState("");
    const[isLoading,setIsLoading]=useState(false);
    const[loginForm,setLoginForm]=useState(false);
    const navigate=useNavigate();

    //for SignUp------>
    function signUpUser(){
      setIsLoading(true);
      if(!name||!email||!password || !confirmPassword){
        // alert("All the details are required");
        toast.error("All details are required!!")
        setIsLoading(false);
        return;
      }else if(password!==confirmPassword){
        toast.error("Password do not match")
        setIsLoading(false);
        return;
      }
      else{
         createUserWithEmailAndPassword(auth,email,password)
         .then((userDetails)=>{
          const user = userDetails.user;
          console.log(user);
          toast.success("User Created Successfully")
          setIsLoading(false)
          setName("")
          setEmail("")
          setPassword("")
          setConfirmPassword("")
          createDoc(user);
          navigate("/dashboard")
         })
         .catch((error)=>{
          const errorCode=error.code;
          const errorMessage=error.message;
          toast.error(errorMessage)
          console.log(error)
          setIsLoading(false);
          })
      }
    }

   //for Login------>
    function loginUser(){
      setIsLoading(true);
      if(!email || !password){
        toast.error("please enter the required fields!!")
        setIsLoading(false);
        return;
      }else{
        signInWithEmailAndPassword(auth,email,password)
        .then((userDetails)=>{
        const user=userDetails.user;
        console.log(user);
        toast.success("User Login Successfully")
        setIsLoading(false);
         setEmail("");
         setPassword("")
         navigate("/dashboard")
        })
        .catch((error)=>{
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setIsLoading(false);

        })
      }
    }

  const createDoc = async (user) => {
    // Add a new document in collection "users"
    //before check that user exists or not..
    if(!user) return;
    //npe if there is user then then get it----->
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);
  //now we have to just check that the userData we got is preExisting or not,if not then we will proceed----->
    if(!userData.exists()){
   try{
    await setDoc(doc(db, "users", user.uid), {
      name: user.displayName?user.displayName:name,
      email:user.email,
      photoURL:user.photoURL?user.photoURL:"",
      createdAt:new Date(),
    });
    console.log("doc created successfully")
   }catch(error){
     toast.error(error.message);
   }
  }else{
    toast.error("Doc already exists!!")
  }
 
    }

   function signUpWithGoogle(){
    setIsLoading(true);
    try{
      signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        toast.success("User Created Successfully")
        console.log("user>>>>>",user)
        createDoc(user);
        setIsLoading(false);
        navigate("/dashboard")
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        setIsLoading(false)
      });
    }catch(error){
     toast.error(error.message);
    }

   } 
    return(
        <div className="signup-wrapper">
          {
            loginForm==false?(
              <>
              <h2 className="signup-wrapper-title">Sign Up On <span style={{color:"var(--theme)"}}>Financely</span></h2>
          <Input label={"Full Name"} type={"name"} placeholder={"John Doe"} state={name} setState={setName}/>
          <Input label={"Email"} type={"email"} placeholder={"JohnDoe@gmail.com"} state={email} setState={setEmail}/>
          <Input label={"password"} type={"password"} placeholder={"Your Password"} state={password} setState={setPassword}/>
          <Input label={"Confirm Password"} type={"password"} placeholder={"Confirm Password"} state={confirmPassword} setState={setConfirmPassword}/>
          <Button disabled={isLoading} text={isLoading?"Loading...":"Signup With Email"} onClick={signUpUser}/>
          <p style={{textAlign:"center",margin:0}}>or</p>
          <Button disabled={isLoading} text={isLoading?"Loading...":"Signup Using Google"} blue={true} onClick={signUpWithGoogle}/>
          <p style={{textAlign:"center",margin:0}}>Already have an account?<span style={{color:"var(--theme)", cursor:"pointer"}} onClick={()=>setLoginForm(!loginForm)}>Click Here</span></p>
              </>
            ):(
              <>
              <h2 className="signup-wrapper-title">Login Here <span style={{color:"var(--theme)"}}>Financely</span></h2>
          
          <Input label={"Email"} type={"email"} placeholder={"JohnDoe@gmail.com"} state={email} setState={setEmail}/>
          <Input label={"password"} type={"password"} placeholder={"Your Password"} state={password} setState={setPassword}/>
          
          <Button disabled={isLoading} text={isLoading?"Loading...":"Login"} onClick={loginUser}/>
          <p style={{textAlign:"center",margin:0}}>or</p>
          <Button disabled={isLoading} text={isLoading?"Loading...":"Login Using Google"} blue={true} onClick={signUpWithGoogle}/>
          <p style={{textAlign:"center",margin:0}}>Don't have any account?<span style={{color:"var(--theme)", cursor:"pointer"}} onClick={()=>setLoginForm(!loginForm)}>Click Here</span></p>
          
              </>
            )
          }
          
        </div>
    )
}
export default SignupSignin;