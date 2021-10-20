import { useState } from "react";
import { Policy_Privacy, Policy_TermsOfUse } from "../shared/Policy";
import { Avatar, Button, ImgAvatar, SubjectDiv } from "../style/default";
import { Timer } from "../components/auth/AuthExpiredTimer";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import {
	CREATE_ACCOUNT_MUTATION,
	SEND_AUTHICATION_CODE_EMAIL_MUTATION,
	VALIDATE_ACCOUNT_MUTATION,
} from "../shared/mutation";

import { getEncryptContext, handleChangeImage } from "../shared/utils";
import {
	refEmail,
	refNickname,
	refPassword,
	refPasswordConfirm,
	refUsername,
} from "../shared/sharedRef";
import FormError from "../components/universial/FormError";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import {
	AuthContainer,
	PolicyDiv,
	PolicyTextArea,
	SignContainer,
	SignPolicy,
	AuthSpan,
	AuthContent,
	AuthNotify,
	AuthSendedContent,
	AuthSubmit,
} from "../style/signup";

function Signup() {
	const {
		register,
		handleSubmit,
		errors,
		formState,
		getValues,
		setError,
		clearErrors,
	} = useForm({
		mode: "onChange",
	});

	const [isTOS, setIsTOS] = useState(false);
	const [isPolicyPrivacy, setIsPolicyPrivacy] = useState(false);
	const [emailAuthCode, setEmailAuthCode] = useState("");
	const [isAuthEmailSended, setIsAuthEmailSended] = useState(false);
	const [isEmailValidInRegex, setIsEmailValidInRegex] = useState(false);
	const [isAuthCodeValid, setIsAuthCodeValid] = useState(false);
	const [avatarFile, setAvatarFile] = useState("");
	const [avatarUrl, setAvatarUrl] = useState("");
	const [isEmailValidInAccount, setIsEmailValidInAccount] = useState(false);
	const handlePolicyChange = (e) => {
		switch (e.target.className) {
			case "login-checked-tos":
				setIsTOS(!isTOS);
				break;
			case "login-checked-privacy":
				setIsPolicyPrivacy(!isPolicyPrivacy);
				break;
			default:
				break;
		}
	};
	const onCompleted = (data) => {
		const { ok, code, error } = data?.sendAuthCodeToEmail;

		if (ok) {
			setEmailAuthCode(code);

			console.log(code);
		}

		console.log(ok, code, error);
	};
	const [sendAuthCodeToEmail, { loading }] = useMutation(
		SEND_AUTHICATION_CODE_EMAIL_MUTATION,
		{
			onCompleted,
		}
	);
	const handleSendAuthCode = () => {
		const { email } = getValues();
		const valid =
			/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,5}$/.test(
				email
			);

		setIsEmailValidInRegex(valid);
	};
	const handleEmailAuthSubmit = (e) => {
		e.preventDefault();
		const { email } = getValues();
		setIsAuthEmailSended(true);
		sendAuthCodeToEmail({
			variables: { email },
		});
	};
	const handleAuthCodeValid = (e) => {
		e.preventDefault();
		const { authCode } = getValues();
		console.log(
			"authCode === emailAuthCode",
			authCode === emailAuthCode,
			authCode,
			emailAuthCode
		);
		if (authCode === emailAuthCode) {
			setIsAuthCodeValid(true);
			setIsAuthEmailSended(false);
		}
	};

	const onValidateAccountComplete = (data) => {
		const {
			validateAccount: { ok, error, target },
		} = data;
		if (!ok) {
			if (target === "username") {
				return setError("username", {
					message: error,
				});
			}
			if (target === "email") {
				setIsEmailValidInAccount(false);
				return setError("email", {
					message: error,
				});
			}
		}
		setIsEmailValidInAccount(true);
	};
	const [validateAccount] = useMutation(VALIDATE_ACCOUNT_MUTATION, {
		onCompleted: onValidateAccountComplete,
	});
	const handleValidateAccount = (e) => {
		const { username, email } = getValues();

		if (e.target.name === "username") {
			validateAccount({
				variables: { username, email: "" },
			});
		}
		if (e.target.name === "email")
			validateAccount({
				variables: { username: "", email },
			});
	};
	const onSubmitValid = (data) => {
		const { password, passwordConfirm, email } = getValues();

		if (loadingCreateAccount) {
			return;
		}
		if (password !== passwordConfirm) {
			return setError("result", {
				message: "비밀번호가 일치하지 않습니다",
			});
		}
		createAccount({
			variables: {
				username: data?.username,
				email: email,
				password: data?.password,
				avatar: data?.avatar[0],
				nickname: data?.nickname,
				isAuth: isAuthCodeValid,
				isAgreeTermsOfUse: isTOS,
				isAgreePrivacyPolicy: isPolicyPrivacy,
			},
		});
	};
	const onCreateAccountCompleted = (data) => {
		const { username, password, nickname } = getValues();
		const {
			createAccount: { ok, error },
		} = data;
		console.log(ok, error);
		if (!ok) {
			return setError("result", {
				message: error,
			});
		}
		const encryptUsername = getEncryptContext(`${username}`);

		window.location.replace(`/welcome/${encryptUsername}`);
	};
	const [createAccount, { loadingCreateAccount }] = useMutation(
		CREATE_ACCOUNT_MUTATION,
		{
			onCompleted: onCreateAccountCompleted,
		}
	);
	return (
		<SignContainer>
			<SignPolicy>
				<SubjectDiv>이용약관</SubjectDiv>
				<PolicyTextArea readOnly defaultValue={Policy_TermsOfUse} />
				<PolicyDiv>
					<input
						className="login-checked-tos"
						type="checkbox"
						checked={isTOS}
						onChange={handlePolicyChange}
					/>
					<span>[필수] 이용약관에 동의합니다</span>
				</PolicyDiv>
				<SubjectDiv>개인정보 수집 및 이용에 대한 동의</SubjectDiv>
				<PolicyTextArea readOnly defaultValue={Policy_Privacy} />
				<PolicyDiv>
					<input
						className="login-checked-privacy"
						type="checkbox"
						checked={isPolicyPrivacy}
						onChange={handlePolicyChange}
					/>
					<span>[필수] 개인정보처리방침에 동의합니다</span>
				</PolicyDiv>
			</SignPolicy>
			<AuthContainer>
				<form onSubmit={handleSubmit(onSubmitValid)}>
					<AuthContent>
						<AuthSpan>아이디</AuthSpan>
						<input
							className="input"
							ref={register(refUsername)}
							type="text"
							name="username"
							placeholder="아이디을 입력하세요"
							onChange={(e) => {
								handleValidateAccount(e);
							}}
						/>
						<FormError message={errors?.username?.message} />
					</AuthContent>
					<AuthContent>
						<AuthSpan>닉네임</AuthSpan>
						<input
							className="input"
							ref={register(refNickname)}
							type="text"
							name="nickname"
							placeholder="닉네임을 입력하세요"
						/>
						<FormError message={errors?.nickname?.message} />
					</AuthContent>
					<AuthContent>
						<AuthSpan>비밀번호</AuthSpan>
						<input
							className="input"
							ref={register(refPassword)}
							type="password"
							name="password"
							placeholder="비밀번호을 입력하세요"
						/>
						<FormError message={errors?.password?.message} />
					</AuthContent>
					<AuthContent>
						<AuthSpan>비밀번호 확인</AuthSpan>
						<input
							className="input"
							ref={register(refPasswordConfirm)}
							type="password"
							name="passwordConfirm"
							placeholder="비밀번호를 다시 한번 입력하세요"
						/>
						<FormError message={errors?.passwordConfirm?.message} />
					</AuthContent>
					<AuthContent>
						<AuthSpan>이메일</AuthSpan>
						<input
							className="input"
							ref={register(refEmail)}
							type="text"
							name="email"
							placeholder="이메일을 입력하세요"
							onChange={(e) => {
								handleValidateAccount(e);
								handleSendAuthCode();
							}}
							readOnly={isAuthCodeValid}
							disabled={isAuthCodeValid}
						/>
						<FormError message={errors?.email?.message} />
						<AuthSubmit
							type="button"
							value="인증 코드 전송"
							onClick={handleEmailAuthSubmit}
							disabled={
								!isEmailValidInRegex ||
								isAuthCodeValid ||
								!isEmailValidInAccount ||
								isAuthEmailSended
							}
						/>

						{isAuthEmailSended ? (
							<AuthSendedContent>
								<AuthNotify>인증 코드가 발송되었습니다</AuthNotify>
								<Timer
									isAuthEmailSended={isAuthEmailSended}
									setIsAuthEmailSended={setIsAuthEmailSended}
									setEmailAuthCode={setEmailAuthCode}
								/>
								<input
									className="input"
									ref={register()}
									name="authCode"
									type="text"
									placeholder="인증코드를 입력하세요"
								></input>
								<AuthSubmit
									type="button"
									value="인증 코드 확인"
									onClick={handleAuthCodeValid}
								/>
							</AuthSendedContent>
						) : null}
						{isAuthCodeValid ? <AuthNotify>인증되었습니다</AuthNotify> : null}
					</AuthContent>
					<AuthContent>
						{avatarUrl ? (
							<ImgAvatar
								style={{ width: "48px", height: "48px", borderRadius: "50%" }}
								className="avatar"
								src={avatarUrl}
							/>
						) : (
							<div
								style={{
									width: "48px",
									height: "48px",
									borderRadius: "50%",
									border: "1px solid white",
								}}
							>
								<FontAwesomeIcon icon={faUserCircle} size="4x" />
							</div>
						)}

						<input
							ref={register()}
							name="avatar"
							type="file"
							accept="image/*"
							onChange={(e) => {
								clearErrors("avatar");
								if (!handleChangeImage(e, setAvatarFile, setAvatarUrl, 1)) {
									return setError("avatar", {
										message: "용량이 초과 되었습니다.",
									});
								}
							}}
						/>
						<FormError message={errors?.avatar?.message} />
						<div>
							<AuthNotify>아바타 용량은 약 1MB를 넘지 않아야 합니다</AuthNotify>
							<AuthNotify>아바타 사이즈는 48 x 48를 권장합니다</AuthNotify>
							<AuthNotify>
								아바타를 지정하지 않으면 기본 아바타로 생성됩니다
							</AuthNotify>
						</div>
					</AuthContent>
					<AuthSubmit
						type="submit"
						value={loading ? "Loading..." : "회원가입"}
						disabled={
							!formState.isValid ||
							loading ||
							!isAuthCodeValid ||
							!isTOS ||
							!isPolicyPrivacy
						}
					/>
				</form>
			</AuthContainer>
		</SignContainer>
	);
}

export default Signup;
