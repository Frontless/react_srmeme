import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";
import Remote from "./Remote";
import ScrollToTop from "./ScrollToTop";
const Content = styled.main`
	margin: 0 auto;
	margin-top: 45px;
	max-width: 1200px;
	width: 100%;
	font-family: "Nanum Gothic", sans-serif;
`;
function Layout({ children }) {
	return (
		<>
			<Header />
			<Content>{children}</Content>
			<Footer />
			<ScrollToTop />
			<Remote />
		</>
	);
}
export default Layout;
