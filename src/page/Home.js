import { useLazyQuery, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FeedDetail from "../components/media/FeedDetail";
import Loading from "../components/universial/Loading";
import { READ_FEED_QUERY } from "../shared/query";
import { homeUnlimitScrollPageVar } from "../shared/sharedVar";
import { checkMediaExt } from "../shared/utils";
import { MediaImg, MediaVid, ThumbnailContainer } from "../style/default";
import { HomeCallMore, HomeContainer } from "../style/home";
import { notify } from "../style/toast";
function Home() {
	const homeUnlimitScrollPage = useReactiveVar(homeUnlimitScrollPageVar);
	const readFeedQuery = useQuery(READ_FEED_QUERY, {
		variables: {
			page: homeUnlimitScrollPage,
		},
	});
	console.log(homeUnlimitScrollPage);
	if (readFeedQuery?.loading) return <Loading width={512} height={512} />;
	if (readFeedQuery?.error)
		return notify("error", "미디어 표시중 에러가 발생했습니다");

	return (
		<>
			<HomeContainer>
				{readFeedQuery?.data?.readFeed?.map((media, index) => (
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
			</HomeContainer>
			<HomeCallMore
				onClick={() => {
					homeUnlimitScrollPageVar(homeUnlimitScrollPage + 1);
				}}
			>
				더 불러오기
			</HomeCallMore>
		</>
	);
}

export default Home;
