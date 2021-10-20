import {
	faCommentAlt,
	faEye,
	faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import invert from "invert-color";
import stc from "string-to-color";
function FeedDetail({ media }) {
	return (
		<>
			<div className="hover-detail hover-detail-caption">{media?.caption}</div>
			<div className="hover-detail hover-detail-icon">
				<FontAwesomeIcon icon={faEye} />
				<span>{media?.views}</span>
				<FontAwesomeIcon icon={faCommentAlt} />
				<span>{media?.commentNumber}</span>
				<FontAwesomeIcon icon={faHeart} />
				<span>{media?.likes}</span>
			</div>
			<div className="hover-detail hover-detail-tags">
				{media?.tags?.map((tags, index) => (
					<div
						key={index}
						className="hover-detail-tag"
						style={{
							backgroundColor: `${stc(tags?.tag?.tags)}`,
							color: `${invert(stc(tags?.tag?.tags), true)}`,
						}}
					>
						{tags?.tag?.tags}
					</div>
				))}
			</div>
		</>
	);
}
export default FeedDetail;
