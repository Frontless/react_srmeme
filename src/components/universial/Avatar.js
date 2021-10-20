import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ImgAvatar } from "../../style/default";

function Avatar({ avatarUrl }) {
	return (
		<div>
			{avatarUrl ? (
				<ImgAvatar src={avatarUrl} />
			) : (
				<div>
					<FontAwesomeIcon
						icon={faUserCircle}
						style={{
							width: 48,
							height: 48,
							borderRadius: "50%",
						}}
					/>
				</div>
			)}
		</div>
	);
}
export default Avatar;
