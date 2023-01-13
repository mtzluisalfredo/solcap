import { Dispatch, SetStateAction } from 'react';

import { FormikProps } from 'formik';

import { DeepPartial } from '.';

export type CurrentAuthenticatedUser = {
  signInUserSession: {
    idToken: {
      jwtToken: string;
    };
  };
  deviceKey: string;
};

export type SignUpData = {
  name: string;
  surname: string;
  secondSurname?: string;
  email: string;
  password: string;
  verificationCode?: string;
  termsAndConditions: boolean;
};

export type SignInData = {
  email: string;
  password: string;
};

export type PasswordRecoveryData = {
  email: string;
  password: string;
  verificationCode: string;
};

export type CognitoUserData = {
  username: string;
  attributes: {
    email: string;
  };
};

export type User = {
  username: string;
  attributes: {
    [key: string]: string;
  };
};

export type State = User & {
  user: null | any;
  signUp: SignUpData;
  authenticated: boolean;
  error?: string | null;
  loading: boolean;
  group: string;
};

export type Context = {
  state: State;
  // eslint-disable-next-line no-unused-vars
  setState: (nextState: DeepPartial<State>) => void;
  getUser: () => Promise<CognitoUserData>;
  signOut: () => Promise<void>;
};

export type CognitoUser = {
  deviceKey: string;
  attributes: {
    name: string;
    email: string;
  };
  getDevice: (callbacks: {
    onSuccess: (device: any) => void;
    onFailure: (err: Error) => void;
  }) => any;
};

export interface PasswordRecoveryFormType {
  email: string;
  password: string;
  passwordConfirm: string;
  verificationCode: string;
}

export type PropsStepsPasswordRecovery = {
  loading: boolean;
  formik: FormikProps<PasswordRecoveryFormType>;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export type AttributeCognito = {
  email?: string;
  email_verified?: boolean;
  family_name?: string;
  name?: string;
  sub?: string;
};
