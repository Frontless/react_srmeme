export const refUsername = {
	required: "아이디를 입력하세요",
	minLength: {
		value: 5,
		message: "아이디는 5글자 이상 입력해야합니다",
	},
	maxLength: {
		value: 15,
		message: "아이디는 16글자 이상 입력할 수 없습니다",
	},
	pattern: {
		value: /^[A-za-z0-9]{5,15}/,
		message: "아이디는 영문자 및 숫자로만 이루어져야 합니다.",
	},
};
export const refNickname = {
	required: "닉네임을 입력하세요",
	minLength: {
		value: 2,
		message: "닉네임은 2글자 이상 입력해야합니다.",
	},
	maxLength: {
		value: 8,
		message: "닉네임은 9글자 이상 입력할 수 없습니다",
	},
	pattern: {
		value: /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]{2,8}/,
		message: "닉네임은 한글과 영문자 및 숫자로만 이루어져야 합니다.",
	},
};
export const refPassword = {
	required: "비밀번호를 입력하세요",
	minLength: {
		value: 8,
		message: "비밀번호는 8글자 이상 입력해야합니다.",
	},
	maxLength: {
		value: 16,
		message: "비밀번호는 17글자 이상 입력할 수 없습니다",
	},
	pattern: {
		value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/,
		message: "비밀번호는 영어 대,소문자와 특수문자로 이루어져야 합니다",
	},
};
export const refValidAuthCode = {
	required: "인증코드를 입력하세요",
	minLength: {
		value: 6,
		message: "인증코드는 6글자입니다",
	},
	maxLength: {
		value: 6,
		message: "인증코드는 6글자입니다",
	},
};
export const refPasswordConfirm = {
	required: "비밀번호가 일치하지 않습니다.",
};
export const refEmail = {
	required: "이메일을 입력하세요",
	pattern: {
		value:
			/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,5}$/,
		message: "입력한 이메일이 형식에 맞지 않습니다.",
	},
};

export const refUploadCaption = {
	required: "제목을 입력하세요",
	minLength: {
		value: 0,
		message: "제목는 1글자 이상 입력해야합니다",
	},
	maxLength: {
		value: 20,
		message: "제목는 30글자 이상 입력할 수 없습니다",
	},
};
export const refUploadTags = {
	required: "적어도 1개 이상의 태그가 있어야합니다",
};
export const refUploadMedia = {
	required: "이미지 및 영상을 업로드 해야합니다",
};
