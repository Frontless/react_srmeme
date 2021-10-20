import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logUserOut } from "../shared/apollo";
import { ME_QUERY } from "../shared/query";

function useUser() {
	const hasToken = useReactiveVar(isLoggedInVar);
	const { data } = useQuery(ME_QUERY, {
		skip: !hasToken,
	});
	useEffect(() => {
		if (data?.me === null) {
			logUserOut();
		}
	}, [data]);
	return { data };
}
export default useUser;
