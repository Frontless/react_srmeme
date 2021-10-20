import { ColumnSeparator, RowSeparator } from "../../style/default";
import {
	TabWritedCommentsContainer,
	TabWritedCommentsContent,
	TabWritedCommentsPayload,
	TabWritedCommentsPhotoId,
} from "../../style/user";

import { Link } from "react-router-dom";
import { getElapsedTime } from "../../shared/utils";
function TabWritedComments({ photoComments }) {
	console.log("photoComments", photoComments);
	return (
		<TabWritedCommentsContainer>
			<TabWritedCommentsContent>
				<div>이미지 번호</div>
				<RowSeparator />
				<div>댓글 내용</div>
				<RowSeparator />
				<div>작성 시간</div>
			</TabWritedCommentsContent>
			<ColumnSeparator />
			<ColumnSeparator />
			{photoComments?.map((comment, index) => (
				<div key={`comments_${index}`}>
					{comment?.isDeleted ? null : (
						<div>
							<TabWritedCommentsContent>
								<TabWritedCommentsPhotoId>
									{comment?.photo?.id}
								</TabWritedCommentsPhotoId>
								<RowSeparator />
								<Link to={`/media/${comment?.photo?.id}`}>
									<TabWritedCommentsPayload>
										{comment.payload}
									</TabWritedCommentsPayload>
								</Link>
								<RowSeparator />
								<span>{getElapsedTime(Number(comment.createdAt))}</span>
							</TabWritedCommentsContent>
							<ColumnSeparator />
						</div>
					)}
				</div>
			))}
		</TabWritedCommentsContainer>
	);
}
export default TabWritedComments;
