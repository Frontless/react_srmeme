import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UPDATE_ACCOUNT_MUTATION } from "../../shared/mutation";
import { getDetailTime, handleChangeImage } from "../../shared/utils";
import { Button } from "../../style/default";
import { AuthNotify } from "../../style/signup";
import { notify } from "../../style/toast";
import { TabUserInfoContainer, TabUserInfoContent } from "../../style/user";
import FormError from "../universial/FormError";

function TabUserInfoUpdate({ userData }) {
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
	const [isNSFW, setIsNSFW] = useState(userData?.isAdult);
	const [avatarFile, setAvatarFile] = useState("");
	const [avatarUrl, setAvatarUrl] = useState("");
	const handleNSFWChange = (e) => {
		setIsNSFW(e.target.checked);
	};
	useEffect(() => {
		console.log(isNSFW);
	}, [isNSFW]);

	const onSubmitValid = (data) => {
		const regex =
			/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/;
		console.log(data?.password);
		if (!regex.test(data?.password) && data?.password !== "") {
			if (data?.password === data?.passwordConfirm) {
				return setError("result", {
					message:
						"비밀번호는 영어 대,소문자와 특수문자로 이루어져야 하며 비밀번호는 8글자 이상 16글자 이하로 입력해야합니다.",
				});
			} else {
				return setError("result", {
					message: "비밀번호가 일치하지 않습니다.",
				});
			}
		}
		updateAccount({
			variables: {
				username: userData?.username,
				password: data?.password,
				avatar: data?.avatar[0],
				isAdult: isNSFW,
			},
		});
	};

	const onCompleted = (data) => {
		const {
			updateAccount: { ok, error },
		} = data;

		if (!ok) {
			return setError("result", {
				message: error,
			});
		}
		notify("success", "정보가 성공적으로 수정되었습니다");
	};
	const [updateAccount, { loading }] = useMutation(UPDATE_ACCOUNT_MUTATION, {
		onCompleted,
	});
	const clearLoginError = () => {
		clearErrors("result");
	};
	return (
		<>
			<div>사용자 정보 조회 / 수정</div>
			<TabUserInfoContainer>
				<form onSubmit={handleSubmit(onSubmitValid)}>
					<TabUserInfoContent>
						<div>아이디:</div>
						<input
							className="tabUserInfoText"
							type="text"
							defaultValue={userData?.username}
							disabled
							style={{ opacity: "70%" }}
						/>
					</TabUserInfoContent>
					<TabUserInfoContent>
						<div>닉네임:</div>
						<input
							className="tabUserInfoText"
							type="text"
							defaultValue={userData?.nickname}
							disabled
							style={{ opacity: "70%" }}
						/>
					</TabUserInfoContent>
					<TabUserInfoContent>
						<div>비밀번호:</div>
						<input
							ref={register()}
							className="tabUserInfoText"
							name="password"
							type="password"
							onChange={clearLoginError}
							placeholder="비밀번호를 입력하세요"
						/>
						<div></div>
						<FormError message={errors?.password?.message} />
					</TabUserInfoContent>
					<TabUserInfoContent>
						<div>비밀번호 확인:</div>
						<input
							ref={register()}
							className="tabUserInfoText"
							name="passwordConfirm"
							type="password"
							onChange={clearLoginError}
							placeholder="비밀번호를 한번 더 입력하세요"
						/>
						<div></div>
						<FormError message={errors?.passwordConfirm?.message} />
					</TabUserInfoContent>
					<TabUserInfoContent>
						<div>이메일:</div>
						<input
							className="tabUserInfoText"
							type="text"
							defaultValue={userData?.email}
							disabled
							style={{ opacity: "70%" }}
						/>
					</TabUserInfoContent>
					<TabUserInfoContent>
						<div>생성일:</div>
						<input
							className="tabUserInfoText"
							type="text"
							defaultValue={getDetailTime(userData?.createdAt, true)}
							disabled
							style={{ opacity: "70%" }}
						/>
					</TabUserInfoContent>
					<TabUserInfoContent>
						<div>이메일 인증:</div>
						<input
							className="EmailAuth"
							type="checkbox"
							checked={userData?.isAuth ? true : false}
							disabled
						/>
					</TabUserInfoContent>
					<TabUserInfoContent>
						<div>아바타:</div>
						<div
							style={{ display: "flex", flexDirection: "column", gap: "10px" }}
						>
							{userData?.avatar ? (
								<img className="avatar" src={userData?.avatar}></img>
							) : null}

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
								<AuthNotify>
									아바타 용량은 약 1MB를 넘지 않아야 합니다
								</AuthNotify>
								<AuthNotify>아바타 사이즈는 48 x 48를 권장합니다</AuthNotify>
								<AuthNotify>
									아바타를 지정하지 않으면 기본 아바타로 생성됩니다
								</AuthNotify>
							</div>
						</div>
					</TabUserInfoContent>
					<TabUserInfoContent>
						<div>후방 주의:</div>
						<input
							ref={register()}
							className="NSFW"
							name="isAdult"
							type="checkbox"
							checked={isNSFW}
							onChange={handleNSFWChange}
						/>
					</TabUserInfoContent>
					<>
						<Button type="submit" value={loading ? "대기중" : "수정하기"} />
					</>

					<FormError
						message={errors?.result?.message}
						disabled={!formState.isValid || loading}
					/>
				</form>
			</TabUserInfoContainer>
		</>
	);
}

export default TabUserInfoUpdate;
