import { useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { isLoggedInVar } from "../shared/apollo";
import { READ_ACCOUNT_QUERY } from "../shared/query";
import routes from "../shared/routes";
import { getDecryptContext, getDetailTime } from "../shared/utils";
import {
	LinkToLogin,
	WelcomeContainer,
	WelcomeContent,
	WelcomeWrapper,
} from "../style/welcome";
//http://localhost:3333/welcome/YXNzaG9sZQ==
function Welcome() {
	const location = useLocation();
	const pathname = location?.pathname.split("/")[2];
	const username = getDecryptContext(pathname);
	const isLoggedIn = useReactiveVar(isLoggedInVar);
	// useEffect(() => {
	// 	window.location.replace(routes.home);
	// }, [isLoggedIn]);
	const readAccountQuery = useQuery(READ_ACCOUNT_QUERY, {
		variables: {
			username,
		},
	});
	const userInfo = readAccountQuery?.data?.readAccount?.users[0];
	return (
		<WelcomeContainer>
			{isLoggedIn ? null : (
				<WelcomeWrapper>
					<div>환영합니다. {userInfo?.nickname}</div>
					<div>{`닉네임: ${userInfo?.nickname}`}</div>
					<div>{`아이디: ${userInfo?.username}`}</div>
					<div>{`이메일: ${userInfo?.email}`}</div>
					<div>{`가입일: ${getDetailTime(userInfo?.createdAt, false)}`}</div>
					<LinkToLogin>
						<Link to={routes.login}>
							<div>로그인 하러가기</div>
						</Link>
					</LinkToLogin>
				</WelcomeWrapper>
			)}
		</WelcomeContainer>
	);
}

export default Welcome;
