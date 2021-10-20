import { Link } from "react-scroll";
import {
	PageContainer,
	PageCountBlock,
	PageCountSelectedBlock,
} from "../../style/page";

function Page({ commentPage, commentIndex, setCommentIndex }) {
	const handleCommentIndexClick = (i) => {
		setCommentIndex(i);
	};
	const handleCommentIndexPrev = () => {
		if (commentIndex > 1) {
			setCommentIndex(commentIndex - 1);
		}
	};
	const handleCommentIndexNext = (commentPageIndex) => {
		if (commentIndex < commentPageIndex) {
			setCommentIndex(commentIndex + 1);
		}
	};
	const pageCount = (commentPage) => {
		// console.log("commentPage", commentPage, "commentIndex", commentIndex);
		const result = [];
		const commentPageIndex = Math.ceil(commentPage / 40);
		result.push(
			<Link to="remote-comment-count" spy={true} offset={-100} smooth={true}>
				<PageCountBlock key={"prev"} onClick={handleCommentIndexPrev}>
					이전
				</PageCountBlock>
			</Link>
		);
		for (let i = 0; i < commentPageIndex; i++) {
			result.push(
				commentIndex === i + 1 ? (
					<Link
						to="remote-comment-count"
						spy={true}
						offset={-100}
						smooth={true}
					>
						<PageCountSelectedBlock
							key={i}
							onClick={() => {
								handleCommentIndexClick(i + 1);
							}}
						>
							{i + 1}
						</PageCountSelectedBlock>
					</Link>
				) : (
					<Link
						to="remote-comment-count"
						spy={true}
						offset={-100}
						smooth={true}
					>
						<PageCountBlock
							key={i}
							onClick={() => {
								handleCommentIndexClick(i + 1);
							}}
						>
							{i + 1}
						</PageCountBlock>
					</Link>
				)
			);
		}
		result.push(
			<Link to="remote-comment-count" spy={true} offset={-100} smooth={true}>
				<PageCountBlock
					key={"next"}
					onClick={() => {
						handleCommentIndexNext(commentPageIndex);
					}}
				>
					다음
				</PageCountBlock>
			</Link>
		);
		return result;
	};
	return <PageContainer>{pageCount(commentPage)}</PageContainer>;
}
export default Page;
