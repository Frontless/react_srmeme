import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { VALIDATE_PASSWORD_MUTATION } from "../../shared/mutation";
import { refPassword } from "../../shared/sharedRef";
import { Button } from "../../style/default";
import FormError from "../universial/FormError";
import TabUserInfoUpdate from "./TabUserInfoUpdate";

function TabUserInfo({ userData }) {
	const [passwordConfirmed, setPasswordConfirmed] = useState(false);

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
			validatePassword: { ok, error, token },
		} = data;

		if (!ok) {
			return setError("result", {
				message: error,
			});
		}
		setPasswordConfirmed(true);
	};
	const [validatePassword, { loading }] = useMutation(
		VALIDATE_PASSWORD_MUTATION,
		{
			onCompleted,
		}
	);
	const onSubmitValid = (data) => {
		console.log(loading);
		if (loading) {
			return;
		}
		const { password } = getValues();
		console.log(userData?.username, password, data);

		validatePassword({
			variables: { username: userData?.username, password: password },
		});
	};
	const clearLoginError = () => {
		clearErrors("result");
	};

	return (
		<>
			{passwordConfirmed ? (
				<TabUserInfoUpdate userData={userData} />
			) : (
				<form onSubmit={handleSubmit(onSubmitValid)}>
					<div>본인 확인을 위하여 비밀번호를 입력하세요</div>
					<input
						ref={register(refPassword)}
						onChange={clearLoginError}
						name="password"
						type="password"
						placeholder="비밀번호"
					/>

					<Button
						type="submit"
						value={loading ? "대기중" : "로그인"}
						disabled={!formState.isValid || loading}
					/>
					<FormError
						message={errors?.password?.message}
						disabled={!formState.isValid || loading}
					/>
				</form>
			)}
		</>
	);
}
export default TabUserInfo;
