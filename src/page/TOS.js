import Remote from "../components/universial/Remote";
import { Policy_TermsOfUse } from "../shared/Policy";
import { Container } from "../style/default";

function TOS() {
	return (
		<Container>
			<div>{Policy_TermsOfUse}</div>
		</Container>
	);
}

export default TOS;
