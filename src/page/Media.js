import { useQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router";
import Loading from "../components/universial/Loading";
import PageTitle from "../components/universial/PageTitle";
import useUser from "../hooks/useUser";
import { READ_COMMENT_QUERY, READ_PHOTO_QUERY } from "../shared/query";
import {
	MediaCaption,
	MediaCaptionWrapper,
	MediaContainer,
	MediaDetail,
	MeidaWrapper,
} from "../style/media";
import { notify } from "../style/toast";
import {
	faCommentAlt,
	faEye,
	faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { getElapsedTime } from "../shared/utils";
import { ImgComparisonSlider } from "@img-comparison-slider/react";
import MediaContents from "../components/media/MediaContent";
import LikeContents from "../components/media/LikeContents";
import TagsContents from "../components/media/TagsContents";
import Comments from "../components/comment/Comments";
import Page from "../components/universial/Page";
import { useEffect, useState } from "react";

function Media() {
	const location = useLocation();
	const { data: userData } = useUser();

	const pathname = location?.pathname.split("/");
	const [commentIndex, setCommentIndex] = useState(1);
	useEffect(() => {
		console.log(commentIndex);
	}, [commentIndex]);
	pathname.shift();
	pathname.shift();
	// console.log(pathname);
	console.log("포토", Number(pathname[0]), typeof Number(pathname[0]));
	const readPhotoQuery = useQuery(READ_PHOTO_QUERY, {
		variables: {
			id: Number(pathname[0]),
			page: commentIndex,
		},
	});

	if (readPhotoQuery?.loading) return <Loading width={512} height={512} />;
	if (readPhotoQuery?.error)
		return notify("error", "미디어를 불러오는데 실패했습니다");

	let readPhoto = readPhotoQuery?.data?.readPhoto;
	let photo = readPhotoQuery?.data?.readPhoto?.photo;
	let commentPage = readPhotoQuery?.data?.readPhoto?.commentPage;
	console.log("readPhoto", readPhoto);
	console.log("photo", photo);
	console.log("commentPage", commentPage);
	const commentsSort = readPhoto?.photoComments?.slice().sort(function (a, b) {
		return Number(a.createdAt) < Number(b.createdAt)
			? -1
			: Number(a.createdAt) > Number(b.createdAt)
			? 1
			: 0;
	});

	return (
		<MediaContainer>
			<PageTitle title={photo?.caption} />
			<MediaCaptionWrapper>
				<MediaCaption>{photo?.caption}</MediaCaption>
				<MediaDetail>
					<div>{photo?.user.nickname}</div>
					<div>
						<FontAwesomeIcon icon={faEye} />
						<span>{photo?.views}</span>
						<FontAwesomeIcon icon={faCommentAlt} />
						<span>{photo?.commentNumber.toString()}</span>
						<FontAwesomeIcon icon={faHeart} />
						<span>{photo?.likes.toString()}</span>
					</div>
					<div>{getElapsedTime(Number(photo?.createdAt))}</div>
				</MediaDetail>
			</MediaCaptionWrapper>
			<MeidaWrapper>
				<MediaContents data={photo} />
			</MeidaWrapper>
			<LikeContents {...photo} photoId={photo?.id} />
			<TagsContents tags={photo?.tags} />
			<Comments
				data={commentsSort}
				totalCount={commentPage}
				photoId={photo?.id}
				userData={userData}
			/>
			<Page
				commentPage={commentPage}
				commentIndex={commentIndex}
				setCommentIndex={setCommentIndex}
			/>
		</MediaContainer>
	);
}

export default Media;
