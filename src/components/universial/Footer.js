import { Link } from "react-router-dom";
import routes from "../../shared/routes";
import { FooterContainer } from "../../style/footer";

function Footer() {
	return (
		<FooterContainer id={"remote-footer"}>
			<div>스르메 Copyright (c) srmeme.net All Right Reserved.</div>
			<div>이메일 : srmeme.net@gmail.com</div>
			<Link to={routes.tos}>이용약관</Link>
			<Link to={routes.policyPrivacy}>개인정보처리방침</Link>
			<Link to={routes.withdrawal}>회원탈퇴</Link>
		</FooterContainer>
	);
}
export default Footer;
