import styled from "styled-components";
import { Container } from "./default";

export const MediaContainer = styled(Container)``;
export const MediaCaptionWrapper = styled.div`
	display: flex;
	// border: 1px solid white;
	width: 100%;
	align-items: center;
	padding: 0px 20px;
	height: 50px;
	justify-content: space-between;
	margin-bottom: 30px;
`;
export const MediaCaption = styled.div`
	margin-left: 20px;
	font-size: 24px;
	width: 100%;
`;
export const MediaDetail = styled.div`
	display: flex;
	// border: 1px solid white;
	width: 100%;
	padding: 0px 30px;
	align-items: center;
	justify-content: flex-end;
	font-size: 15px;
	div:nth-child(1) {
		margin-right: 10px;
	}
	div:nth-child(2) {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		justify-items: center;
		align-items: center;
		gap: 2px;
		margin-right: 10px;
	}
`;
export const MeidaWrapper = styled.div`
	width: 100%;
	// display: grid;
	// grid-template-columns: 100px 1fr 100px;
`;
export const LikeContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 30px;
	div:nth-child(1) {
		margin-right: 30px;
	}
	div:nth-child(2) {
		margin-left: 30px;
	}
`;
export const Like = styled.div`
	width: 130px;
	height: 45px;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px solid white;
	cursor: pointer;
	border-radius: 5px;
	font-size: 15px;
	&:hover {
		border: 1px solid rgba(228, 89, 89, 0.3);
		background-color: rgba(228, 89, 89, 0.02);
		box-shadow: 0 2px 4px 0 rgba(228, 89, 89, 0.2);
		transition: all ease 0.2s 0s;
	}
	&:active {
		transform: scale(0.9);
	}
`;
