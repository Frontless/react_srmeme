import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useUser from "../../hooks/useUser";
import { isLoggedInVar, logUserOut } from "../../shared/apollo";
import { SEARCH_TAGS_QUERY } from "../../shared/query";
import routes from "../../shared/routes";
import { searchTagsListVar, selectedTagsListvar } from "../../shared/sharedVar";
import { EncryptUserIdNicknameQuery } from "../../shared/utils";
import { Logo } from "../../style/default";
import {
	HeaderContainer,
	HeaderContent,
	HeaderMenu,
	HeaderNickname,
	HeaderUserInfo,
} from "../../style/header";
import Avatar from "./Avatar";

import DropDownSelect from "./DropDownSelect";
import Loading from "./Loading";

function Header() {
	const isLoggedIn = useReactiveVar(isLoggedInVar);
	const { data: userData } = useUser();

	const searchTagsList = useReactiveVar(searchTagsListVar);
	const selectedTagsList = useReactiveVar(selectedTagsListvar);
	useEffect(() => {
		if (selectedTagsList === undefined) {
			console.log("없음");
		}
		console.log("selectedTagsList[0]?.tags: ", selectedTagsList);
	}, [selectedTagsList]);

	const handleLogoutClicked = () => {
		logUserOut();
	};

	const searchTags = useQuery(SEARCH_TAGS_QUERY);

	if (searchTags?.loading) return <Loading width={512} height={512} />;
	if (searchTags?.error) return `Error! ${searchTags?.error.message}`;
	if (searchTags?.data?.searchTags?.ok) {
		if (searchTagsList.length === 0) {
			searchTagsListVar(searchTags?.data?.searchTags?.tags);
		}
	}
	return (
		<HeaderContainer id={"remote-header"}>
			<Link to={routes.home}>
				<Logo
					src={
						"https://darmi.s3.ap-northeast-2.amazonaws.com/logo/logo_ssm.png"
					}
					onClick={() => {
						window.location.replace(routes.home);
					}}
				/>
			</Link>
			<div>
				<DropDownSelect
					create={false}
					multi={false}
					addPlaceholder={""}
					clearable={false}
					isHeaderSearch={true}
					placeholder={"검색할 내용을 입력하세요"}
					searchTagsList={searchTagsList}
					selectedTagsListvar={selectedTagsListvar}
				/>
			</div>
			<HeaderContent>
				{isLoggedIn ? (
					<>
						<HeaderUserInfo>
							<Link
								to={`/user/${EncryptUserIdNicknameQuery(
									userData?.me?.username,
									userData?.me?.nickname
								)}`}
							>
								<Avatar avatarUrl={userData?.me?.avatar} />
							</Link>
							<Link
								to={`/user/${EncryptUserIdNicknameQuery(
									userData?.me?.username,
									userData?.me?.nickname
								)}`}
							>
								<HeaderNickname>{userData?.me?.nickname}</HeaderNickname>
							</Link>
						</HeaderUserInfo>
						<Link to={routes.upload}>
							<HeaderMenu>업로드</HeaderMenu>
						</Link>
						<HeaderMenu onClick={handleLogoutClicked}>로그아웃</HeaderMenu>
					</>
				) : (
					<>
						<Link to={routes.login}>
							<HeaderMenu>로그인</HeaderMenu>
						</Link>
						<Link to={routes.signup}>
							<HeaderMenu>회원가입</HeaderMenu>
						</Link>
					</>
				)}
			</HeaderContent>
		</HeaderContainer>
	);
}
export default Header;
