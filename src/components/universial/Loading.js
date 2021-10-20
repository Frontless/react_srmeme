import PageTitle from "./PageTitle";
import Loader from "react-loader-spinner";
import styled from "styled-components";
const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 10%;
`;
function Loading({ width, height }) {
	return (
		<Container>
			<PageTitle title="로딩중..." />
			<Loader
				type="Grid"
				color="#808e9b"
				height={height}
				width={width}
				timeout={0}
			/>
		</Container>
	);
}
export default Loading;
