import React from "react";

export default async function handleRegistrationSubmit(
  userInfo,
  setPopupHook,
  signIn,
  historyHook
) {
  try {
    setPopupHook({
      isPopup: true,
      massage: "You Logined successfully",
      isError: false,
    });
    await signIn(userInfo.email, userInfo.password);
    await historyHook.push("/user");
  } catch {
    setPopupHook({
      isPopup: true,
      massage: "Faild to login",
      isError: true,
    });
  }
  return true;
}
