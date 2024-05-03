import { navigate } from "@navigation";
import { SCREENS } from "@shared-constants";
import { userSignIn } from "controllers/accountController";
import { logger } from "helper/helperFunctions";
import { IApiResponse } from "models/ApiResponses/IApiResponse";
import { ISignInUserData, SignInResponse } from "models/ApiResponses/SignInResponse";
import { ISignInUser } from "models/interface/ISignIn";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { saveUserdata } from "redux/actions/AccountAction";
import { setLoaderVisibility } from "redux/actions/LoaderAction";
import { setRememberMe } from "shared/constants/accountService";
import SignInScreen from "views/signIn/SignIn";
const SignInViewModel = () => {
  const signInUser :ISignInUser= {
    upn: useRef<string>(""),
    password: useRef<string>(""),
    rememberMe: useRef<number>(1),
  };

  const dispatch = useDispatch();

  const loginAPICAllingHandler = async (values: ISignInUserData) => {
    dispatch(setLoaderVisibility(true));
    try {
      const res: IApiResponse<SignInResponse> |undefined= await userSignIn(
        values
      );
      if (res?.isSuccess) {
        dispatch(saveUserdata(res.data));
        setRememberMe(signInUser?.rememberMe?.current)
        navigate(SCREENS.TAB)
      } 
      else {

      }
    } catch (error) {
      logger(error,"Error in Login Api Calling")

    }
    finally{
    dispatch(setLoaderVisibility(false));
  }
  };



  const onSubmit = () => {
    
    const values={
        upn: signInUser?.upn?.current,
        password: signInUser?.password?.current,
      }
   loginAPICAllingHandler(values)
  
  };

  function handleOnTextChange(text:string,id:number){
    if(id!=2)
    signInUser[Object.keys(signInUser)[id]].current=text;
    else 
    signInUser.rememberMe.current=Number(text);
  }

  return (
    <SignInScreen
      {...{
        onSubmit,
        handleOnTextChange,
        signInUser,
      }}
    />
  );
};

export default SignInViewModel;
