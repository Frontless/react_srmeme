import { useState } from "react";
import { useLocation } from "react-router";
import { READ_ACCOUNT_QUERY } from "../shared/query";
import { DecryptUserIdNicknameQuery } from "../shared/utils";
import {
	TabContainer,
	TabContent,
	TabIndex,
	TabWrapper,
	UserContainer,
} from "../style/user";
import Loading from "../components/universial/Loading";
import { useQuery } from "@apollo/client";
import TabUserInfo from "../components/tab/TabUserInfo";
import TabUploadedImages from "../components/tab/TabUploadedImages";
import TabWritedComments from "../components/tab/TabWritedComments";
import TabLikesImages from "../components/tab/TabLikesImages";
function User() {
	const [key, setKey] = useState("0");
	const location = useLocation();
	let pathname = location?.pathname?.split("/");
	const decryptUserIdNicknameQuery = DecryptUserIdNicknameQuery(
		pathname[pathname.length - 1]
	);
	const userUserName = decryptUserIdNicknameQuery[0];
	const userNickname = decryptUserIdNicknameQuery[1];
	console.log();

	const readAccount = useQuery(READ_ACCOUNT_QUERY, {
		variables: {
			username: userUserName,
			isAdmin: false,
		},
	});
	if (readAccount?.loading) return <Loading width={512} height={512} />;
	if (readAccount?.error) return `Error! ${readAccount?.error.message}`;

	const userData = readAccount?.data?.readAccount?.users[0];
	// console.log(userData);
	const list = [
		{ eventKey: "0", title: "사용자 정보" },
		{ eventKey: "1", title: "업로드한 이미지" },
		{ eventKey: "2", title: "좋아요한 이미지" },
		{ eventKey: "3", title: "작성한 댓글" },
	];
	return (
		<div>
			{userUserName}
			{userNickname} 여기는 유저입니다
			<TabContainer>
				<TabWrapper>
					{list.map((info, index) => (
						<TabIndex
							key={`tabindex_${index}`}
							onClick={() => {
								setKey(info.eventKey);
							}}
						>
							{info.title}
						</TabIndex>
					))}
				</TabWrapper>
				<TabContent>
					{key === "0" ? (
						<TabUserInfo userData={userData} />
					) : key === "1" ? (
						<TabUploadedImages data={userData?.photos} />
					) : key === "2" ? (
						<TabLikesImages photoLikes={userData?.photoLikes} />
					) : key === "3" ? (
						<TabWritedComments photoComments={userData?.photoComments} />
					) : (
						<div></div>
					)}
				</TabContent>
			</TabContainer>
		</div>
	);
}

export default User;
