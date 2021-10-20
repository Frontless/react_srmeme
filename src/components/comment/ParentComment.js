import { useMutation } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
	CREATE_COMMENT_MUTATION,
	DELETE_COMMENT_MUTATION,
	UPDATE_COMMENT_MUTATION,
} from "../../shared/mutation";

import { faComment, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import gql from "graphql-tag";
import Modal from "react-modal";
import { getElapsedTime } from "../../shared/utils";
import { notify } from "../../style/toast";
import {
	CommentButton,
	CommentCancel,
	CommentCaption,
	CommentCaptionWrapper,
	CommentContainer,
	CommentDeleted,
	CommentForm,
	CommentInput,
	CommentParentUsername,
	CommentTextArea,
	CommentUser,
	CommentWrapper,
	ModalCommentContent,
	ModalCommentContentCancel,
	ModalCommentContentConfirm,
	ModalCommentDeleteStyles,
	NestedCommentInputWapper,
} from "../../style/comments";
import { FatText } from "../../style/default";
function ParentComment({ comment, photoId, userData }) {
	const bgColor = "#485460";
	const [showNestedCommentid, setShowNestedCommentid] = useState("");
	const [showNestedComment, setShowNestedComment] = useState(false);
	const [showNestedCommentAction, setShowNestedCommentAction] = useState(null);
	const { register, handleSubmit, setValue, getValues } = useForm();
	const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
	const ref = useRef(null);
	const initRef = () => {
		ref.current.style.height = "38px";
		ref.current.value = "";
	};
	const handleResizeHeight = useCallback(() => {
		if (ref === null || ref.current === null) {
			return;
		}
		ref.current.style.height = "38px";
		ref.current.style.height = ref.current.scrollHeight + "px";
	}, []);
	function openModal(id) {
		setIsOpenDeleteModal(true);
		setShowNestedCommentid(id);
	}

	function afterOpenModal() {
		// references are now sync'd and can be accessed.
		// subtitle.style.color = "#f00";
	}

	function closeModal() {
		setIsOpenDeleteModal(false);
	}
	const createCommentUpdate = (cache, result) => {
		const payload = ref.current.value;
		setValue("payload", "");
		const {
			data: {
				createComment: { ok, id },
			},
		} = result;

		if (ok && userData?.me) {
			const newComment = {
				__typename: "Comment",
				createdAt: Date.now() + "",
				id,
				isMine: true,
				payload,
				user: {
					...userData.me,
				},
			};
			const newCacheComment = cache.writeFragment({
				data: newComment,
				fragment: gql`
					fragment BSName on PhotoComment {
						id
						createdAt
						isMine
						payload
						user {
							username
							avatar
						}
					}
				`,
			});
			cache.modify({
				id: `Photo:${photoId}`,
				fields: {
					photoComments(prev) {
						return [...prev, newCacheComment];
					},
					commentNumber(prev) {
						return prev + 1;
					},
				},
			});
			initRef();
			notify("success", "댓글쓰기가 완료되었습니다");
		} else {
			notify("error", "댓글쓰기 중 문제가 발생했습니다");
		}

		handleClickNestedCommentCancel();
	};

	const onValid = (data) => {
		if (showNestedCommentAction === "create") {
			const payload = ref.current.value;
			if (loading) {
				return;
			}
			createCommentMutation({
				variables: {
					photoId,
					payload,
					parentCommentId: Number(showNestedCommentid.split("_")[1]),
				},
			});
		} else if (showNestedCommentAction === "update") {
			const payload = ref.current.value;
			console.log("payload", payload);
			if (loading) {
				return;
			}
			updateCommentMutation({
				variables: {
					id: Number(showNestedCommentid.split("_")[1]),
					payload,
				},
			});
		}
	};

	const [createCommentMutation, { loading }] = useMutation(
		CREATE_COMMENT_MUTATION,
		{
			update: createCommentUpdate,
		}
	);

	const updateDeleteComment = (cache, result) => {
		const {
			data: {
				deleteComment: { ok },
			},
		} = result;
		console.log("ok", ok);

		if (ok) {
			cache.evict({ id: `PhotoComment:${comment?.id}` });
			cache.modify({
				id: `Photo:${photoId}`,
				fields: {
					commentNumber(prev) {
						// return prev - 1;
					},
				},
			});
			console.log("cache", cache);
			notify("success", "댓글삭제 완료되었습니다");
		} else {
			notify("error", "댓글삭제 중 문제가 발생했습니다");
		}
	};
	const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
		variables: {
			id: comment?.id,
		},
		update: updateDeleteComment,
	});

	const updateUpdateComment = (cache, result) => {
		const {
			data: {
				updateComment: { ok },
			},
		} = result;
		console.log("ok", ok);

		if (ok) {
			cache.evict({
				id: `PhotoComment:${Number(showNestedCommentid.split("_")[1])}`,
			});
			cache.modify({
				id: `Photo:${photoId}`,
				fields: {
					commentNumber(prev) {
						// return prev - 1;
					},
				},
			});
			console.log("cache", cache);
			handleClickNestedCommentCancel();
			// initRef();
			notify("success", "댓글수정이 완료되었습니다");
		} else {
			notify("error", "댓글수정 중 문제가 발생했습니다");
		}
	};

	const [updateCommentMutation] = useMutation(UPDATE_COMMENT_MUTATION, {
		update: updateUpdateComment,
	});

	const onDeleteClick = () => {
		deleteCommentMutation();
	};

	const handleClickNestedComment = (id, action) => {
		setShowNestedCommentAction(action);
		setShowNestedCommentid(id);
		if (showNestedCommentAction === action) {
			// setShowNestedComment(!showNestedComment);
		} else {
			if (showNestedCommentAction !== null) {
				setShowNestedComment(!showNestedComment);
			}
		}
	};
	const handleClickNestedCommentCancel = () => {
		setShowNestedComment(false);
		setShowNestedCommentAction(null);
	};
	useEffect(() => {
		if (showNestedCommentAction !== null) {
			setShowNestedComment(!showNestedComment);
		}
	}, [showNestedCommentAction]);

	return (
		<>
			<CommentContainer className={`parent_${comment?.id}`}>
				<CommentWrapper>
					<CommentUser style={{ backgroundColor: bgColor }}>
						<div>
							<Link to={`/users/${comment?.user?.username}`}>
								<FatText>{comment?.user?.nickname}</FatText>
							</Link>
							<span>{getElapsedTime(Number(comment?.createdAt))}</span>
						</div>
						{comment?.isDeleted ? null : (
							<div>
								<FontAwesomeIcon
									title="댓글 달기"
									icon={faComment}
									onClick={() => {
										handleClickNestedComment(`parent_${comment?.id}`, "create");
									}}
								/>
								{comment?.isMine ? (
									<FontAwesomeIcon
										title="댓글 수정"
										icon={faEdit}
										onClick={() => {
											handleClickNestedComment(
												`parent_${comment?.id}`,
												"update"
											);
										}}
									/>
								) : null}
								{comment?.isMine ? (
									<>
										<FontAwesomeIcon
											title="댓글 삭제"
											icon={faTimes}
											color={"red"}
											onClick={() => {
												openModal(`parent_${comment?.id}`);
											}}
										/>
										<Modal
											isOpen={isOpenDeleteModal}
											onAfterOpen={afterOpenModal}
											onRequestClose={closeModal}
											contentLabel="Example Modal"
											ariaHideApp={false}
											style={ModalCommentDeleteStyles}
										>
											<ModalCommentContent>
												<div>댓글을 정말로 삭제하시겠습니까?</div>
												<div>
													<ModalCommentContentConfirm
														onClick={() => {
															closeModal();
															onDeleteClick();
														}}
													>
														확인
													</ModalCommentContentConfirm>
													<ModalCommentContentCancel onClick={closeModal}>
														취소
													</ModalCommentContentCancel>
												</div>
											</ModalCommentContent>
										</Modal>
									</>
								) : null}
							</div>
						)}
					</CommentUser>
					<CommentCaptionWrapper>
						{comment?.isDeleted ? (
							<CommentDeleted>{comment?.payload}</CommentDeleted>
						) : (
							<CommentCaption>{comment?.payload}</CommentCaption>
						)}
					</CommentCaptionWrapper>
				</CommentWrapper>
			</CommentContainer>
			{showNestedComment ? (
				<NestedCommentInputWapper className={`parent_${comment?.id}`}>
					<CommentForm
						onSubmit={(e) => {
							e.preventDefault();

							onValid(e);
						}}
					>
						{showNestedCommentAction === "create" ? (
							<>
								<div className="comment-textarea-wrapper">
									<CommentTextArea
										name="payload"
										ref={ref}
										onInput={handleResizeHeight}
										type="text"
									/>
								</div>
								<div className="comment-button-wrapper">
									<CommentButton className="comment-button">
										댓글쓰기
									</CommentButton>
									<CommentCancel onClick={handleClickNestedCommentCancel}>
										취소
									</CommentCancel>
								</div>

								{/* <CommentInput
									ref={register({ required: true })}
									name="payload"
									type="text"

									// value={comment?.payload}
								></CommentInput>
								<CommentButton>댓글쓰기</CommentButton> */}
							</>
						) : (
							<>
								<div className="comment-textarea-wrapper">
									<CommentTextArea
										name="payload"
										ref={ref}
										onInput={handleResizeHeight}
										type="text"
									/>
								</div>
								<div className="comment-button-wrapper">
									<CommentButton className="comment-button">
										댓글수정
									</CommentButton>
									<CommentCancel onClick={handleClickNestedCommentCancel}>
										취소
									</CommentCancel>
								</div>
								{/* <CommentInput
									ref={register({ required: true })}
									name="update"
									type="text"
									defaultValue={comment?.payload}
								></CommentInput>
								<CommentButton>댓글수정</CommentButton> */}
							</>
						)}
					</CommentForm>
				</NestedCommentInputWapper>
			) : null}
		</>
	);
}
export default ParentComment;
