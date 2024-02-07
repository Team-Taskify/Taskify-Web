/** @type 로그인 할 때 사용하는 폼 타입 선언 */
export interface SignInForm {
  email: string;
  password: string;
}

/** @type 회원가입 할 때 사용하는 폼 타입 선언 */
export interface SignUpForm extends SignInForm {
  nickname: string;
}

export interface ChangeProfileForm {
  nickname: string;
  image: File | undefined;
}

export interface ChangePasswordForm {
  password: string;
  newPassword: string;
}

export interface UserData {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

/** @type 로그인 시도시 받아오는 userData 타입 선언 */
export interface SignInData {
  user: UserData;
  accessToken: string;
}
