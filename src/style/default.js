import styled, { createGlobalStyle } from "styled-components";
import "normalize.css";
export const GlobalStyles = createGlobalStyle`


	body{
		background-color: #202020
	}
	div, a, span{
		color: white;
		text-decoration: none;
		
	}

	/* Change the white to any color */
	input:-webkit-autofill,
	input:-webkit-autofill:hover, 
	input:-webkit-autofill:focus, 
	input:-webkit-autofill:active{
		-webkit-box-shadow: 0 0 0 30px #202020 inset !important;
	}
	/*Change text in autofill textbox*/
	input:-webkit-autofill{
		-webkit-text-fill-color: white !important;
	}

`;
export const FatText = styled.span`
	font-weight: 600;
`;
export const Container = styled.div`
	width: 1200px;
	height: auto;
	font-size: 12px;
	white-space: pre-wrap;
	line-height: 20px;
	.input {
		box-sizing: border-box;
		border: none;
		width: 100%;
		height: 20px;
		font-size: 15px;
		background-color: #202020;
		color: white;
		border-bottom: 1px solid white;
		// border: 1px solid white;
		// border-radius: 5px;
		padding: 18px 10px;
		margin: 0px 10px;
		margin-bottom: 10px;
	}
`;
export const MainTitle = styled.div`
	font-size: 35px;
`;
export const SubjectDiv = styled.div`
	font-size: 20px;
	margin: 50px 0px;
`;
export const Button = styled.input`
	width: 300px;
	height: 40px;
	background-color: #202020;
	color: white;
	cursor: pointer;
	border-radius: 5px;
	border: 1px solid white;
	&:hover {
		background-color: #121212;
	}
	&:active {
		transform: scale(0.9);
	}
`;
export const Logo = styled.img`
	display: flex;
	align-items: center;
	justify-content: center;
	max-width: 400px;
	margin: 0px 50px;
	margin-top: 5px;
`;
export const ImgAvatar = styled.img`
	width: 48px;
	height: 48px;
	border-radius: 50%;
`;
export const Underline = styled.div`
	position: relative;
	text-decoration: none;

	&:before,
	&:after {
		content: "";
		position: absolute;
		bottom: -10px;
		left: 0;
		right: 0;
		height: 2px;
		background-color: #d1d8e0;
	}
	&:before {
		opacity: 0;
		transform: translateY(-8px);
		transition: transform 0s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0s;
	}
	&:after {
		opacity: 0;
		transform: translateY(8px/2);
		transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275),
			opacity 0.2s;
	}
	&:hover,
	&:focus {
		&:before,
		&:after {
			opacity: 1;
			transform: translateY(0);
		}
		&:before {
			transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275),
				opacity 0.2s;
		}
		&:after {
			transition: transform 0s 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275),
				opacity 0s 0.2s;
		}
	}
`;
export const Separator = styled.div`
	background-color: #a5b1c2;
`;
export const ColumnSeparator = styled(Separator)`
	height: 1px;
	width: 100%;
`;
export const RowSeparator = styled(Separator)`
	height: 100%;
	width: 1px;
`;
export const MediaImg = styled.img`
	display: flex;
	max-height: 150px;
	min-height: 150px;
	cursor: pointer;
	transition: all 0.15s ease-in-out 0.05s;
	&:hover {
		opacity: 0.2;
	}
`;
export const MediaVid = styled.video`
	display: flex;
	max-height: 150px;
	min-height: 150px;
	cursor: pointer;
	transition: all 0.15s ease-in-out 0.1s;
	&:hover {
		opacity: 0.2;
	}
`;
export const ThumbnailContainer = styled.div`
	border-radius: 4px;
	border: 1px soild white;
	justify-content: center;
	align-items: center;
	margin: 10px;
	border: 3px solid white;
	position: relative;
	font-family: "Nanum Gothic", sans-serif;
	&:hover {
		.hover-detail {
			opacity: 1;
			color: white;
		}
	}

	&:active {
		border: 3px solid red;
		transform: scale(0.9);
	}
	.hover-detail {
		opacity: 0;
		transition: all 0.05s ease-in-out 0.05s;
		position: absolute;
		pointer-events: none;
	}
	.hover-detail-caption {
		width: 80%;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;

		top: 6%;
		left: 8%;
		font-weight: 600;
		font-size: 15px;
		white-space: nowrap;
	}
	.hover-detail-icon {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(3, 10px);
		top: 45%;
		left: 50%;
		transform: translate(-50%, -50%);
		gap: 8px;
	}
	.hover-detail-tags {
		white-space: nowrap;
		width: 95%;
		display: flex;
		overflow: hidden;
		top: 85%;
		left: 50%;
		transform: translate(-50%, -50%);
		gap: 8px;
		justify-content: center;
		font-size: 12px;
	}
	.hover-detail-tag {
		border: 1px solid white;
		padding: 3px 8px;
		border-radius: 4px;
	}
`;
