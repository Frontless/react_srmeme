import { ApolloProvider } from "@apollo/client";
import { HelmetProvider } from "react-helmet-async";
import { GlobalStyles } from "./style/default";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./shared/routes";
import Layout from "./components/universial/Layout";
import PageTitle from "./components/universial/PageTitle";
import Home from "./page/Home";
import Login from "./page/Login";
import NotFound from "./page/NotFound";
import User from "./page/User";
import Media from "./page/Media";
import Search from "./page/Search";
import Upload from "./page/Upload";
import Signup from "./page/Signup";
import Welcome from "./page/Welcome";
import Test from "./page/Test";
import TOS from "./page/TOS";
import Privacypolicy from "./page/Privacypolicy";
import License from "./page/License";
import Withdrawal from "./page/Withdrawal";
import Toast from "./components/universial/Toast";
import { client } from "./shared/apollo";
function App() {
	return (
		<ApolloProvider client={client}>
			<HelmetProvider>
				<GlobalStyles />
				<Router>
					<Switch>
						<Route path={routes.home} exact>
							<Layout>
								<PageTitle title="홈" />
								<Home />
							</Layout>
						</Route>
						<Route path={routes.test} exact>
							<Layout>
								<PageTitle title="테스트" />
								<Test />
							</Layout>
						</Route>
						<Route path={routes.tos} exact>
							<Layout>
								<PageTitle title="이용약관" />
								<TOS />
							</Layout>
						</Route>
						<Route path={routes.policyPrivacy} exact>
							<Layout>
								<PageTitle title="개인정보처리방침" />
								<Privacypolicy />
							</Layout>
						</Route>
						<Route path={routes.login} exact>
							<Layout>
								<PageTitle title="로그인" />
								<Login />
							</Layout>
						</Route>
						<Route path={routes.signup} exact>
							<Layout>
								<PageTitle title="회원가입" />
								<Signup />
							</Layout>
						</Route>
						<Route path={routes.welcome} exact>
							<Layout>
								<PageTitle title="환영합니다" />
								<Welcome />
							</Layout>
						</Route>
						<Route path={routes.upload} exact>
							<Layout>
								<PageTitle title="업로드" />
								<Upload />
							</Layout>
						</Route>
						<Route path={routes.search} exact>
							<Layout>
								<PageTitle title="검색" />
								<Search />
							</Layout>
						</Route>
						<Route path={routes.media} exact>
							<Layout>
								<Media />
							</Layout>
						</Route>
						<Route path={routes.user} exact>
							<Layout>
								<User />
							</Layout>
						</Route>
						<Route path={routes.license} exact>
							<Layout>
								<License />
							</Layout>
						</Route>
						<Route path={routes.withdrawal} exact>
							<Layout>
								<Withdrawal />
							</Layout>
						</Route>
						<Route>
							<Layout>
								<NotFound />
							</Layout>
						</Route>
					</Switch>
				</Router>
			</HelmetProvider>
			{Toast()}
		</ApolloProvider>
	);
}

export default App;
