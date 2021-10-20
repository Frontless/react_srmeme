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
const PhotoImg = styled.img`
	display: flex;
	max-height: 150px;
	min-height: 150px;
	cursor: pointer;
	transition: all 0.15s ease-in-out 0.1s;
	&:hover {
		opacity: 0.2;
	}
`;
const PhotoVid = styled.video`
	display: flex;
	max-height: 150px;
	min-height: 150px;
	cursor: pointer;
	transition: all 0.15s ease-in-out 0.1s;
	&:hover {
		opacity: 0.2;
	}
`;

function TabUploadedImages({ data }) {
	return (
		<Container>
			{data?.map((media, index) => (
				<ThumbnailContainer key={index}>
					<Link to={`/media/${media?.id}`}>
						{checkMediaExt(
							media?.originUrl.split(".")[
								media?.originUrl.split(".").length - 1
							]
						) === "img" ? (
							<>
								<MediaImg src={media?.originUrl} />
								<FeedDetail media={media} />
							</>
						) : (
							<>
								<MediaVid autoPlay loop src={media?.originUrl} />
								<FeedDetail media={media} />
							</>
						)}
					</Link>
				</ThumbnailContainer>
			))}
		</Container>
	);
}
export default TabUploadedImages;
