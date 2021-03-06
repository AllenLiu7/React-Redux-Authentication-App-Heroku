import { call, takeLatest, all, put } from 'redux-saga/effects';
import axios from 'axios';

import UserActionTypes from './user.type';
import {
  signInSuccess,
  signInFailure,
  signOutFailure,
  signOutSuccess,
  signUpSuccess,
  signUpFailure,
} from './user.action';

export function* emailSignInAsync({ payload: { email, password, history } }) {
  try {
    const response = yield axios({
      method: 'post',
      url: '/login',
      data: {
        email,
        password,
      },
      withCredentials: true,
    });
    yield put(signInSuccess(response.data.user));
    history.push('/secrets');
  } catch (error) {
    yield put(signInFailure(error.response.data.error));
    history.push('/');
  }
}

export function* signUpAsync({ payload: { email, password, history } }) {
  try {
    const response = yield axios({
      method: 'post',
      url: '/signup',
      data: {
        email,
        password,
      },
      withCredentials: true,
    });
    yield put(signUpSuccess(response.data.user));
    history.push('/secrets');
  } catch (error) {
    yield put(signUpFailure(error.response.data.error));
    history.push('/');
  }
}

export function* signOutAsync({ payload: { history } }) {
  try {
    const response = yield axios.get('/logout', {
      withCredentials: true,
    });
    yield put(signOutSuccess(response.data));
    history.push('/');
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const response = yield axios.get('/login_check  ', {
      withCredentials: true,
    });
    yield put(signInSuccess(response.data));
  } catch (error) {
    yield put(signInFailure(error.response.data.error));
  }
}

//-----------------watcher-----------------

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, emailSignInAsync);
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOutAsync);
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUpAsync);
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSagas() {
  yield all([
    call(onEmailSignInStart),
    call(onSignOutStart),
    call(onCheckUserSession),
    call(onSignUpStart),
  ]);
}
