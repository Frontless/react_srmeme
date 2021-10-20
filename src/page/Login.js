import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { logUserIn } from "../shared/apollo";
import { LOGIN_MUTATION } from "../shared/mutation";
import routes from "../shared/routes";
import { refPassword, refUsername } from "../shared/sharedRef";
import { MainTitle, SubjectDiv } from "../style/default";
import { LoginContainer, LoginWrapper, Logo } from "../style/login";
import {
	AuthContainer,
	AuthContent,
	AuthNotify,
	AuthSpan,
	AuthSubmit,
} from "../style/signup";
function Login() {
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
	const onCompleted = (data) => {
		const {
			login: { ok, error, token },
		} = data;

		if (!ok) {
			AuthNotify("error", "로그인에 실패했습니다");
			return setError("result", {
				message: error,
			});
		}
		if (token) {
			logUserIn(token);
			return window.location.replace(routes.home);
		}
	};
	const [login, { loading }] = useMutation(LOGIN_MUTATION, {
		onCompleted,
	});
	const onSubmitValid = (data) => {
		console.log(loading);
		if (loading) {
			return;
		}
		const { username, password } = getValues();

		login({
			variables: { username, password },
		});
	};
	return (
		<LoginContainer>
			<LoginWrapper>
				<MainTitle>로그인</MainTitle>
				<AuthContainer>
					<form onSubmit={handleSubmit(onSubmitValid)}>
						<Logo
							src={
								"https://darmi.s3.ap-northeast-2.amazonaws.com/logo/logo_ssm.png"
							}
						/>
						<AuthContent>
							<AuthSpan>아이디</AuthSpan>
							<input
								className="input"
								ref={register(refUsername)}
								type="text"
								name="username"
								placeholder="아이디을 입력하세요"
							/>
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
						</AuthContent>
						<AuthSubmit
							type="submit"
							value={loading ? "로그인 중" : "로그인"}
							disabled={!formState.isValid || loading}
						/>
					</form>
				</AuthContainer>
			</LoginWrapper>
		</LoginContainer>
	);
}

export default Login;
