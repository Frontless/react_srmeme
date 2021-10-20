import styled from "styled-components";

export const CommentsContainer = styled.div`
	height: 100%;
	width: 100%;
	font-size: 15px;
`;
export const CommentInputWapper = styled.div`
	padding: 10px;

	justify-content: space-between;
`;
export const NestedCommentInputWapper = styled.div`
	padding: 10px;
	width: 100%;
	margin-left: 20px;

	font-size: 13px;
	justify-content: space-between;
	//여기가 숨기는 부분
`;
export const CommentViewWapper = styled.div`
	margin-top: 20px;
	padding: 0px 20px;
`;
export const CommentForm = styled.form`
	display: flex;
	flex-direction: column;

	.comment-textarea-wrapper {
		display: flex;
		width: 100%;
		justify-content: center;
	}
	.comment-button-wrapper {
		display: flex;
		justify-content: flex-end;
	}
`;
export const CommentTextArea = styled.textarea`
	display: flex;
	width: 100%;
	border-radius: 5px;
	resize: none;
	padding: 10px 10px;
`;
export const CommentInput = styled.input`
	display: flex;
	border: 1px solid;
	margin: 10px;
	width: 90%;
	padding: 5px 20px;
	border-radius: 5px;
`;
export const CommentButton = styled.button`
	display: flex;
	padding: 10px;
	width: 90px;
	margin: 10px 5px;
	border-radius: 5px;
	border: 1px solid;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	font-size: 13px;
	&:hover {
		border: 1px solid ${(props) => props.theme.accent};
	}
	&:active {
		transform: scale(0.9);
	}
`;
export const CommentCancel = styled.div`
	display: flex;
	padding: 10px;
	width: 80px;
	margin: 10px 5px;
	border-radius: 5px;
	border: 1px solid;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	&:hover {
		border: 1px solid ${(props) => props.theme.accent};
	}
	&:active {
		transform: scale(0.9);
	}
`;
export const CommentContainer = styled.div`
	display: flex;
	height: 100%;
	width: 100%;
	justify-content: flex-end;
`;
export const CommentWrapper = styled.div`
	font-size: 15px;
	height: 100%;
	width: 100%;
	padding: 0px 10px;
	div: nth-child(1) {

	}
	div: nth-child(2) {

	}
`;
export const CommentUser = styled.div`
	font-size: 14px;
	display: flex;
	height: 100%;
	width: 100%;
	padding: 9px 0px;
	justify-content: space-between;
	align-items: center;
	border-radius: 3px;
	div:nth-child(1) {
		margin-left: 30px;
		span {
			margin-right: 10px;
		}
		span:nth-child(2) {
			margin: 0px 30px;
		}
	}
	div:nth-child(2) {
		display: flex;
		align-items: center;
		margin-right: 10px;
		svg {
			margin: 0px 7px;
			cursor: pointer;
		}
	}
`;
export const CommentCaptionWrapper = styled.div`
	display: flex;
	margin-left: 50px;
	margin-right: 40px;

	margin-top: 10px;
	margin-bottom: 20px;
`;
export const CommentCaption = styled.div`
	font-size: 14px;
	width: 100%;
	word-break: break-all;
	word-wrap: break-word;
	a {
		background-color: inherit;
		color: ${(props) => props.theme.accent};
		cursor: pointer;
		&:hover {
			text-decoration: underline;
		}
	}
`;

export const CommentParentUsername = styled.span`
	font-size: 12px;
	border: 1px solid white;
	padding: 4px 10px;
	border-radius: 30px;
	font-weight: 600;
`;

export const CommentDeleted = styled.span`
	color: #808e9b;
`;
export const ModalCommentContent = styled.div`
	display: flex;

	justify-content: center;
	align-items: center;
	padding: 10px;
`;
export const ModalCommentContentConfirm = styled.div`
	display: flex;
	border: 1px solid white;
	padding: 10px;
	cursor: pointer;
	border-radius: 5px;
	&:hover {
		background-color: #808e9b;
	}
	&:active {
		transform: scale(0.9);
	}
`;
export const ModalCommentContentCancel = styled.div`
	display: flex;
	border: 1px solid white;
	padding: 10px;
	cursor: pointer;
	border-radius: 5px;
	&:hover {
		background-color: #808e9b;
	}
	&:active {
		transform: scale(0.9);
	}
`;
export const ModalCommentDeleteStyles = {
	overlay: {
		backgroundColor: "rgba(30, 39, 46,0.7)",
	},
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		width: "400px",
		height: "150px",
		backgroundColor: "rgba(72, 84, 96,1.0)",
	},
};
