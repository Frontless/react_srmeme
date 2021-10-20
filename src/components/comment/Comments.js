import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { CREATE_COMMENT_MUTATION } from "../../shared/mutation";
import { READ_COMMENT_QUERY } from "../../shared/query";
import {
	CommentButton,
	CommentForm,
	CommentInput,
	CommentInputWapper,
	CommentsContainer,
	CommentTextArea,
	CommentViewWapper,
} from "../../style/comments";
import { notify } from "../../style/toast";
import Loading from "../universial/Loading";

import ChildComment from "./ChildComment";
import ParentComment from "./ParentComment";

function Comments({ data, totalCount, photoId, userData }) {
	// console.log("Comments", data);
	photoId = Number(photoId);
	const { register, handleSubmit, setValue, getValues, onCompleted } =
		useForm();
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
	const onValid = () => {
		const payload = ref.current.value;
		if (loading) {
			return;
		}
		createCommentMutation({
			variables: {
				photoId,
				payload,
				parentCommentId: null,
			},
		});
	};
	const createCommentUpdate = (cache, result) => {
		// const { payload } = getValues();
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
			console.log("cache: ", cache);
			initRef();
			notify("success", "댓글쓰기가 완료되었습니다");
		} else {
			notify("error", "로그인 후 가능합니다");
		}
	};

	const [createCommentMutation, { loading }] = useMutation(
		CREATE_COMMENT_MUTATION,
		{
			update: createCommentUpdate,
		}
	);

	return (
		<CommentsContainer id="remote-comment">
			<div id="remote-comment-count">{totalCount}개의 댓글</div>
			<CommentViewWapper>
				{data?.map((comment, index) =>
					comment?.parent === null ? (
						<div key={`key_comment_${index}`}>
							<ParentComment
								key={`key_parent_${comment?.index}`}
								comment={comment}
								photoId={photoId}
								userData={userData}
							/>
							{comment?.children !== null ? (
								<ChildComment
									key={`key_child_${comment?.index}`}
									comments={data}
									parentId={comment?.id}
									photoId={photoId}
									userData={userData}
								/>
							) : null}
						</div>
					) : null
				)}
			</CommentViewWapper>
			<CommentInputWapper>
				<CommentForm
					onSubmit={(e) => {
						e.preventDefault();

						onValid(e);
					}}
				>
					<div className="comment-textarea-wrapper">
						<CommentTextArea
							name="payload"
							ref={ref}
							onInput={handleResizeHeight}
							type="text"
						/>
					</div>
					<div className="comment-button-wrapper">
						<CommentButton className="comment-button">댓글쓰기</CommentButton>
					</div>
				</CommentForm>

				{/* <CommentForm onSubmit={handleSubmit(onValid)}>
					<CommentInput
						name="payload"
						ref={register({ required: true })}
						type="text"
					></CommentInput>
					<CommentButton>댓글쓰기</CommentButton>
				</CommentForm> */}
			</CommentInputWapper>
		</CommentsContainer>
	);
}
export default Comments;
