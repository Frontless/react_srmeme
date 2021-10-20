import styled from "styled-components";
import { Button, Container, MainTitle, SubjectDiv } from "../../style/default";

const RequiredLoginContainer = styled(Container)``;
function RequiredLogin() {
	return (
		<RequiredLoginContainer>
			<MainTitle>로그인없이 접근할 수 없습니다.</MainTitle>
			<SubjectDiv>로그인을 해야합니다</SubjectDiv>
			<Button type="button" value="로그인 하러가기" />
		</RequiredLoginContainer>
	);
}
export default RequiredLogin;
