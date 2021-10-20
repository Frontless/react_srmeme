import styled from "styled-components";
import { Container } from "./default";

export const WelcomeContainer = styled(Container)`
	display: flex;
	justify-content: center;
	font-size: 20px;
	margin: 100px 0px;
`;
export const WelcomeWrapper = styled.div`
	display: grid;
	width: 500px;
	gap: 20px;
`;
export const LinkToLogin = styled.div`
	display: flex;
	justify-content: center;
	div {
		margin-top: 30px;
		display: flex;
		width: 300px;
		height: 50px;
		border: 1px solid white;
		justify-content: center;
		align-items: center;
		&:hover {
			background-color: #121212;
		}
		&:active {
			transform: scale(0.9);
		}
	}
`;
