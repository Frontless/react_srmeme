import gql from "graphql-tag";
export const LOGIN_MUTATION = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			ok
			token
			error
		}
	}
`;
export const SEND_AUTHICATION_CODE_EMAIL_MUTATION = gql`
	mutation sendAuthCodeToEmail($email: String!) {
		sendAuthCodeToEmail(email: $email) {
			ok
			code
			error
		}
	}
`;
export const VALIDATE_ACCOUNT_MUTATION = gql`
	mutation validateAccount($username: String, $email: String) {
		validateAccount(username: $username, email: $email) {
			ok
			target
			error
		}
	}
`;
export const VALIDATE_PASSWORD_MUTATION = gql`
	mutation validatePassword($username: String!, $password: String!) {
		validatePassword(username: $username, password: $password) {
			ok
			error
		}
	}
`;
export const UPLOAD_PHOTO_MUTATION = gql`
	mutation uploadPhoto(
		$originUrl: Upload!
		$caption: String!
		$payload: String
		$tags: [String]!
		$isNSFW: Boolean
		$isPrivate: Boolean
		$convertTo: String
	) {
		uploadPhoto(
			originUrl: $originUrl
			caption: $caption
			tags: $tags
			payload: $payload
			isNSFW: $isNSFW
			isPrivate: $isPrivate
			convertTo: $convertTo
		) {
			ok
			id
			error
		}
	}
`;
export const CREATE_ACCOUNT_MUTATION = gql`
	mutation createAccount(
		$username: String!
		$email: String!
		$password: String!
		$avatar: Upload
		$nickname: String!
		$isAuth: Boolean!
		$isAgreeTermsOfUse: Boolean!
		$isAgreePrivacyPolicy: Boolean!
	) {
		createAccount(
			username: $username
			email: $email
			password: $password
			avatar: $avatar
			nickname: $nickname
			isAuth: $isAuth
			isAgreeTermsOfUse: $isAgreeTermsOfUse
			isAgreePrivacyPolicy: $isAgreePrivacyPolicy
		) {
			ok
			error
		}
	}
`;
export const CREATE_TAGS_MUTATION = gql`
	mutation createTags($keyword: String!, $color: String!) {
		createTags(keyword: $keyword, color: $color) {
			ok
			error
		}
	}
`;
export const TOGGLE_LIKE_MUTATION = gql`
	mutation toggleLike($id: Int!) {
		toggleLike(id: $id) {
			ok
			error
		}
	}
`;
export const CREATE_COMMENT_MUTATION = gql`
	mutation createComment(
		$photoId: Int!
		$payload: String!
		$parentCommentId: Int
	) {
		createComment(
			photoId: $photoId
			payload: $payload
			parentCommentId: $parentCommentId
		) {
			ok
			error
			id
		}
	}
`;
export const DELETE_COMMENT_MUTATION = gql`
	mutation deleteComment($id: Int!) {
		deleteComment(id: $id) {
			ok
			error
		}
	}
`;
export const UPDATE_COMMENT_MUTATION = gql`
	mutation updateComment($id: Int!, $payload: String!) {
		updateComment(id: $id, payload: $payload) {
			ok
			error
		}
	}
`;
export const UPDATE_ACCOUNT_MUTATION = gql`
	mutation updateAccount(
		$username: String
		$email: String
		$password: String
		$avatar: Upload
		$nickname: String
		$isAdult: Boolean!
	) {
		updateAccount(
			username: $username
			email: $email
			password: $password
			avatar: $avatar
			nickname: $nickname
			isAdult: $isAdult
		) {
			ok
			error
		}
	}
`;
