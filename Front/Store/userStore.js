import {create} from "zustand";

const userStore = create(set => ({

    // --- 로그인 상태 ---
    loginState: {
        id: '',
        password: '',
        isChecked: false, 
    },
    setLoginField: (field, value) =>
        set(state => ({
            loginState: { ...state.loginState, [field]: value },
        })),
    resetLoginState: () => set({
        loginState: { id: '', password: '', isChecked: false }
    }),

    // --- 회원가입 상태 ---
    signupState: {
        userId: '',
        password: '',
        passwordConfirm: '',
        name: '',
        contact: '',
        email: '',
        birthdate: '',
        address: '',
        gender: null,
        isIdChecked: false,
        verifyNum: '',
        verifyMessage: '',
        modalVisible: false, // ✅ 모달 상태 추가
    },
    setSignupField: (field, value) =>
        set(state => ({
            signupState: { ...state.signupState, [field]: value },
        })),
    resetSignupState: () => set({
        signupState: {
            userId: '', password: '', passwordConfirm: '', name: '',
            contact: '', email: '', birthdate: '', address: '', gender: null,
            isIdChecked: false, verifyNum: '', verifyMessage: '', modalVisible: false,
        }
    }),
    // ✅ 회원가입용 모달 닫기 액션 추가
    closeSignupModal: () => set ({
        signupState: {
            ...state.signupState,
            modalVisible: false,
            verifyNum: '',
            verifyMessage: '',
        }
    }),

  // --- 아이디/비밀번호 찾기 상태 --- 
  findAccountState: {
    userId: '',
    name: '',
    email: '',
    contact: '',
    verifyNum: '',
    verifyMessage: '',
    modalVisible: false,
    isVerified: false,
    newPassword: '',
    newPasswordConfirm: '',
    loading: false,
    submitting: false,
  },

  // --- 아이디/비밀번호 찾기 액션 ---
  setFindAccountField: (field, value) =>
    set((state) => ({
      findAccountState: { ...state.findAccountState, [field]: value },
    })),

  // 인증 관련 상태 초기화
  resetVerification: () =>
    set((state) => ({
      findAccountState: {
        ...state.findAccountState,
        isVerified: false,
        verifyNum: '',
        verifyMessage: '',
        loading: false,
      },
    })),

  // 모달 닫을 때 인증번호 관련 상태 초기화
  closeVerificationModal: () =>
    set((state) => ({
      findAccountState: {
        ...state.findAccountState,
        modalVisible: false,
        verifyNum: '',
        verifyMessage: '',
      },
    })),
  
  // 아이디/비밀번호 찾기 페이지를 벗어날 때 모든 관련 상태 초기화
  resetFindAccountState: () =>
    set({
      findAccountState: {
        userId: '',
        name: '',
        email: '',
        contact: '',
        verifyNum: '',
        verifyMessage: '',
        modalVisible: false,
        isVerified: false,
        newPassword: '',
        newPasswordConfirm: '',
        loading: false,
        submitting: false,
      },
    }),
}));

export default userStore;
