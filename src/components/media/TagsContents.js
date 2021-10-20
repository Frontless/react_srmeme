import stc from "string-to-color";
import styled from "styled-components";
import { Link } from "react-router-dom";
import invert from "invert-color";
import { Tags, TagsContainer } from "../../style/tags";

function TagsContents({ tags }) {
	console.log(tags);
	tags?.map((tag) => {
		console.log(tag?.tag?.tags);
	});
	return (
		<TagsContainer>
			{tags?.map((data, index) => (
				<Link to={`/search/${data?.tag?.tags}`} key={`tag_${index}`}>
					<Tags
						style={{
							color: `${invert(stc(data?.tag?.tags), true)}`,
							backgroundColor: `${stc(data?.tag?.tags)}`,
						}}
					>
						{data?.tag?.tags}
					</Tags>
				</Link>
			))}
		</TagsContainer>
	);
}
export default TagsContents;
