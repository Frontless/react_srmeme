import { Link } from "react-router-dom";
import styled from "styled-components";
import { checkMediaExt } from "../../shared/utils";
import { MediaImg, MediaVid, ThumbnailContainer } from "../../style/default";
import FeedDetail from "../media/FeedDetail";

const Container = styled.div`
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
`;
function TabLikesImages({ index, photoLikes }) {
	console.log("photoLikes", photoLikes);
	return (
		<Container>
			{photoLikes?.map((media, index) => (
				<ThumbnailContainer key={index}>
					<Link to={`/media/${media?.photo?.id}`}>
						{checkMediaExt(
							media?.photo?.originUrl.split(".")[
								media?.photo?.originUrl.split(".").length - 1
							]
						) === "img" ? (
							<>
								<MediaImg src={media?.photo?.originUrl} />
								<FeedDetail media={media?.photo} />
							</>
						) : (
							<>
								<MediaVid autoPlay loop src={media?.photo?.originUrl} />
								<FeedDetail media={media?.photo} />
							</>
						)}
					</Link>
				</ThumbnailContainer>
			))}
			{/* {photoLikes?.map((like, index) => (
				<PhotoLink
					key={like?.photo?.id}
					id={like?.photo?.id}
					originUrl={like?.photo?.originUrl}
					caption={like?.photo?.caption}
					likes={like?.photo?.likes}
					commentNumber={like?.photo?.commentNumber}
					views={like?.photo?.views}
				/>
			))} */}
		</Container>
	);
}
export default TabLikesImages;
