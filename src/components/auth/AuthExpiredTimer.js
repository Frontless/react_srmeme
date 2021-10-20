import { useReactiveVar } from "@apollo/client";
import { useEffect, useRef, useState } from "react";

export const Timer = ({
	isAuthEmailSended,
	setIsAuthEmailSended,
	setEmailAuthCode,
}) => {
	const expiredTime = 180;
	const [min, setMin] = useState(expiredTime / 60);
	const [sec, setSec] = useState(0);

	let time = useRef(expiredTime);
	const timerId = useRef(null);
	useEffect(() => {
		if (isAuthEmailSended) {
			timerId.current = setInterval(() => {
				time.current -= 1;
				setMin(parseInt(time.current / 60));
				setSec(time.current % 60);
			}, 1000);
			return () => clearInterval(timerId.current);
		}
	}, [isAuthEmailSended]);

	useEffect(() => {
		if (isAuthEmailSended) {
			// 만약 타임 아웃이 발생했을 경우
			if (time.current <= 0) {
				time.current = expiredTime;
				clearInterval(timerId.current);
				setIsAuthEmailSended(false);
				setEmailAuthCode("");
				setMin(1);
				setSec(0);
			}
		}
	}, [sec]);

	return (
		<div className="timer">
			{isAuthEmailSended
				? time.current > 0
					? `${min} 분 ${sec} 초 후 코드가 만료됩니다.`
					: "코드가 만료되었습니다. 다시 시도하세요"
				: null}
		</div>
	);
};
