import styled from "styled-components";
import { Container } from "./default";

export const HomeContainer = styled(Container)`
	font-size: 15px;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
`;
export const HomeCallMore = styled.div`
	display: flex;
	width: 100%;
	height: 60px;
	align-items: center;
	justify-content: center;
	margin: 10px;
	border: 1px solid white;

	cursor: pointer;
	&:hover {
		border: 1px solid rgba(75, 101, 132, 1);
		background-color: rgba(75, 101, 132, 0.2);
		box-shadow: 0 2px 4px 0 rgba(75, 101, 132, 0.2);
		transition: all ease 0.2s 0s;
	}
	&:active {
		transform: scale(0.9);
	}
`;
