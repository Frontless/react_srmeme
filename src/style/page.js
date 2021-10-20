import styled from "styled-components";
import { Container } from "./default";

export const PageContainer = styled(Container)`
	display: flex;
	justify-content: center;
`;
export const PageCountBlock = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 12px;

	width: 40px;
	height: 40px;
	margin: 4px 4px;
	border: 1px solid white;
	border-radius: 4px;
	cursor: pointer;
	&:hover {
		background-color: #808e9b;
	}
	&:active {
		transform: scale(0.9);
	}
`;
export const PageCountSelectedBlock = styled(PageCountBlock)`
	border: 1px solid red;
	color: red;
`;
