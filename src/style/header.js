import styled from "styled-components";
import { Container, Underline } from "./default";

export const HeaderContainer = styled(Container)`
	display: grid;
	grid-template-columns: repeat(3, auto);
	justify-content: space-around;
	align-items: center;
	background-color: #121212;
	width: 100%;

	height: 80px;
`;
export const HeaderContent = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 22px;
	gap: 20px;
`;
export const HeaderMenu = styled(Underline)`
	cursor: pointer;
`;
export const HeaderUserInfo = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	width: 200px;
	gap: 10px;
`;
export const HeaderNickname = styled(Underline)`
	cursor: pointer;
`;
