import { useMutation } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TOGGLE_LIKE_MUTATION } from "../../shared/mutation";

import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { Like, LikeContainer } from "../../style/media";
import { notify } from "../../style/toast";
function LikeContents({ isLiked, likes, photoId }) {
	const updateToggleLike = (cache, result) => {
		const {
			data: {
				toggleLike: { ok },
			},
		} = result;
		if (ok) {
			const id = `Photo:${photoId}`;
			cache.modify({
				id: id,
				fields: {
					isLiked(prev) {
						return !prev;
					},
					likes(prev) {
						if (isLiked) {
							notify("error", "좋아요를 취소했습니다");
							return prev - 1;
						}
						notify("success", "좋아요를 눌렀습니다");
						return prev + 1;
					},
				},
			});
		} else {
			notify("error", "로그인 후 가능합니다");
		}
	};
	const [toggleLikeMutation, { loading }] = useMutation(TOGGLE_LIKE_MUTATION, {
		variables: {
			id: photoId,
		},
		update: updateToggleLike,
	});
	return (
		<LikeContainer key={photoId}>
			<Like onClick={toggleLikeMutation}>
				<FontAwesomeIcon icon={isLiked ? SolidHeart : faHeart} size="lg" />
				&nbsp;좋아요
			</Like>
		</LikeContainer>
	);
}
export default LikeContents;
