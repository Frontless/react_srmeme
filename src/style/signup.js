import styled from "styled-components";
import { Button, Container } from "./default";

export const SignContainer = styled(Container)`
	display: flex;
	flex-direction: column;
	width: 100%;
`;
export const SignPolicy = styled.div`
	width: 100%;
`;
export const PolicyTextArea = styled.textarea`
	box-sizing: border-box;
	width: 100%;
	height: 300px;
	background-color: #202020;
	color: white;
	font-size: 14px;
	margin-bottom: 20px;
	resize: none;
	padding: 10px 60px;
	line-height: 20px;
`;
export const PolicyDiv = styled.div`
	width: 100%;
	display: flex;
	margin-left: 20px;
	align-items: center;
	gap: 10px;
	input {
		width: 15px;
		height: 15px;
	}
	span {
		font-size: 15px;
	}
`;

export const AuthContainer = styled(Container)`
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 20px 20px;
	width: 100%;
	// border: 1px solid white;
	form {
		width: 30%;
		flex-direction: column;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;
export const AuthContent = styled(Container)`
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	margin: 10px 0px;

	button {
		width: 300px;
		height: 40px;
		background-color: #202020;
		border-radius: 5px;
		border: 1px solid white;
		color: white;
		cursor: pointer;
		&:hover {
			background-color: #121212;
		}
		&:active {
			transform: scale(0.9);
		}
	}
`;
export const AuthNotify = styled.div`
	font-size: 14px;
	margin: 10px;
`;
export const AuthSendedContent = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 10px 0px;
	gap: 10px;
`;
export const AuthSpan = styled.div`
	display: flex;
	box-sizing: border-box;
	font-size: 18px;

	margin-bottom: 14px;
	width: 100%;
`;
export const AuthSubmit = styled(Button)`
	font-size: 16px;
	margin: 10px 0px;
`;
