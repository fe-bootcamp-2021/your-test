export default async function handleRegistrationSubmit(
  userInfo,
  setPopupHook,
  { signup },
  { historyHook }
) {
  const user = {
    name: userInfo.firstName,
    email: userInfo.email,
    password: userInfo.password,
  };

  try {
    setPopupHook({
      isPopup: true,
      massage: "You registered successfully",
      isError: false,
    });
    await signup(user.email, user.password);
    await historyHook.push("/user");
  } catch {
    setPopupHook({
      isPopup: true,
      massage: "Faild to create an account",
      isError: true,
    });
  }
  return true;

  // setPopupHook({ isPopup: true, massage: "User is exist", isError: true });
  // return false;
}
