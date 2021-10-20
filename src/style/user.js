import styled from "styled-components";
import { Container } from "./default";

export const UserContainer = styled(Container)``;
export const TabContainer = styled.div`
	display: grid;
	padding: 20px;
	gap: 10px;
`;
export const TabWrapper = styled.div`
	display: flex;

	height: 100%;
	width: 100%;
	font-size: 15px;
	gap: 10px;
`;
export const TabIndex = styled.div`
	border: 1px solid white;
	padding: 8px 20px;
	border-radius: 5px;
	cursor: pointer;
	transition: background-color ease-in-out 0.15s;
	background-color: #485460;
	&:hover {
		background-color: #4b7bec;
	}
	&:active {
		transform: scale(0.9);
	}
`;
export const TabContent = styled.div`
	padding: 10px;
`;
export const TabWritedCommentsContainer = styled.div`
	display: flex;
	gap: 3px;
	width: 100%;
	flex-direction: column;
`;
export const TabWritedCommentsTitle = styled.div`
	display: grid;
	grid-template-columns: 8% auto 69% auto 7%;
`;
export const TabWritedCommentsContent = styled.div`
	display: grid;
	grid-template-columns: 8% auto 80% auto auto;
	gap: 5px;
	margin: 2px;
	align-items: center;
`;
export const TabWritedCommentsPhotoId = styled.div`
	color: #a5b1c2;
`;
export const TabWritedCommentsPayload = styled.div`
	word-break: break-all;
	word-wrap: break-word;
	white-space: pre-line;
	padding: 5px 10px;
	transition: color ease-in-out 0.15s;
	&:hover {
		color: #4b7bec;
		text-decoration: underline;
	}
	&:active {
		color: #eb3b5a;
		text-decoration: underline;
	}
`;

export const TabUserInfoContainer = styled.div`
	display: flex;

	justify-content: center;
	align-items: center;
	flex-direction: column;
	padding: 35px 40px 25px 40px;
	margin-bottom: 10px;
	font-size: 15px;
	gap: 5px;
	width: 100%;
	form {
		margin-top: 35px;
		width: 100%;
		display: flex;
		justify-items: center;
		flex-direction: column;
		align-items: center;
	}
`;
export const TabUserInfoContent = styled.div`
	display: grid;
	width: 60%;
	grid-template-columns: 20% auto;
	gap: 10px;
	margin-bottom: 15px;
	div {
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
	.tabUserInfoText {
		margin: 0px 10px;
		border: 1px solid #d2dae2;
		padding: 10px 10px;
		border-radius: 5px;
		width: 100%;
	}
	span {
		width: 100%;
	}
	.EmailAuth {
		all: revert;
		margin-left: 10px;
	}
	.NSFW {
		all: revert;
		margin-left: 10px;
	}
	img {
		border: 1px solid #d2dae2;
		width: 48px;
		height: 48px;
	}
`;
