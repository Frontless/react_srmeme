import styled from "styled-components";
import { Button, Container } from "./default";

export const UploadContainer = styled(Container)`
	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.uploadContainer {
		display: flex;

		flex-direction: column;
		align-items: center;
		width: 100%;
	}
	.uploadCheckBoxDiv {
		display: flex;
		align-items: center;
		span {
			font-size: 17px;
		}
		.uploadCheckBox {
			width: 20px;
			height: 20px;
		}
		gap: 10px;
		margin-bottom: 10px;
	}
	.uploadDropDownSelect {
		display: flex;
		justify-content: center;
	}
`;
export const UploadContent = styled.div`
	width: 80%;
	margin: 20px 10px;
`;
export const UploadSpan = styled.div`
	display: flex;
	box-sizing: border-box;
	font-size: 20px;

	margin-bottom: 14px;
	width: 100%;
`;
export const UploadSubmit = styled(Button)`
	font-size: 17px;
`;
export const UploadImg = styled.img`
	max-width: 200px;
	max-height: 200px;
	margin-top: 10px;
	padding: 0px 10px;
	border-radius: 6%;
`;
export const UploadVideo = styled.video`
	max-width: 200px;
	max-height: 200px;
	margin-top: 10px;
	padding: 0px 10px;
	border-radius: 6%;
`;
export const UploadMedia = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 10px;
`;
