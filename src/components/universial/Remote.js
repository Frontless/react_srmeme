import {
	faAngleDown,
	faAngleUp,
	faCommentAlt,
	faTh,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { Link } from "react-scroll";

const Container = styled.div`
	position: fixed;
	display: grid;
	grid-template-columns: repeat(1, 40px);
	grid-template-rows: repeat(3, 35px);

	z-index: 99;
	left: 95%;
	top: 83%;
	gap: 5px;
`;
const DivRemote = styled.div`
	background-color: #485460;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 5px 5px;
	border-radius: 5px;
	border: 1px solid white;
	cursor: pointer;
	opacity: 0.7;
	&:active {
		opacity: 0.9;
	}
`;
const Header = styled(DivRemote)`
	padding: 0;
`;
const Comment = styled(DivRemote)``;
const Footer = styled(DivRemote)`
	padding: 0;
`;
function Remote() {
	return (
		<Container>
			<Link to="remote-header" spy={true} smooth={true}>
				<Header>
					<FontAwesomeIcon icon={faAngleUp} size="2x" />
				</Header>
			</Link>
			<Link to="remote-comment" spy={true} offset={-100} smooth={true}>
				<Comment>
					<FontAwesomeIcon icon={faCommentAlt} size="lg" />
				</Comment>
			</Link>
			<Link to="remote-footer" spy={true} offset={-100} smooth={true}>
				<Footer>
					<FontAwesomeIcon icon={faAngleDown} size="2x" />
				</Footer>
			</Link>
		</Container>
	);
}

export default Remote;
