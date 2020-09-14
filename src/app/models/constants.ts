import { CancelConfirmModalOptions } from './cancel-confirm-modal-options';

export const characters = [
  'Anakaris',
  'Aulbath',
  'Bishamon',
  'Bulleta',
  'Demitri',
  'Felicia',
  'Gallon',
  'Jedah',
  'Lei-Lei',
  'Lilith',
  'Morrigan',
  'Q-Bee',
  'Sasquatch',
  'Victor',
  'Zabel'
];

export const ADD_MATCH_MODAL_OPTIONS: CancelConfirmModalOptions = {
  width: '250px',
  data: {
    title: 'Login required',
    description: 'You must sign in with Twitter to add a match.',
    cancelText: 'Cancel',
    confirmText: 'Login'
  }
};

export const ADD_VIDEO_MODAL_OPTIONS: CancelConfirmModalOptions = {
  width: '250px',
  data: {
    title: 'Login required',
    description: 'You must sign in with Twitter to add a video.',
    cancelText: 'Cancel',
    confirmText: 'Login'
  }
};

export const DELETE_MATCH_LOGIN_MODAL_OPTIONS: CancelConfirmModalOptions = {
  width: '250px',
  data: {
    title: 'Login required',
    description: 'You must sign in with Twitter to delete a match.',
    cancelText: 'Cancel',
    confirmText: 'Login'
  }
};

export const DELETE_MATCH_CONFIRM_MODAL_OPTIONS: CancelConfirmModalOptions = {
  width: '250px',
  data: {
    title: 'Are you sure?',
    description: 'Are you sure you want to delete this match? This action cannot be undone.',
    cancelText: 'Cancel',
    confirmText: 'Delete'
  }
};

export const SIGN_IN_BUTTON_MODAL_OPTIONS: CancelConfirmModalOptions = {
  width: '250px',
  data: {
    title: 'Login',
    description: 'Sign in with Twitter? You will be redirected to Twitter.',
    cancelText: 'Cancel',
    confirmText: 'Login'
  }
};

export const SIGN_OUT_BUTTON_MODAL_OPTIONS: CancelConfirmModalOptions = {
  width: '250px',
  data: {
    title: 'Logout',
    description: 'Are you sure you want to sign out?',
    cancelText: 'Cancel',
    confirmText: 'Logout'
  }
};

export const EDIT_VIDEO_MODAL_OPTIONS: CancelConfirmModalOptions = {
  width: '250px',
  data: {
    title: 'Login required',
    description: 'You must sign in with Twitter to edit a video.',
    cancelText: 'Cancel',
    confirmText: 'Login'
  }
};
