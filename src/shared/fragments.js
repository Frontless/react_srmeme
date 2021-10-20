import gql from "graphql-tag";

export const USER_FRAGMENT = gql`
	fragment UserFragment on User {
		id
		username
		nickname
		email
		cream
		caution
		accountSuspentionDate
		isAdult
		authBy
		createdAt
		updatedAt
		avatar
		isMe
		isAuth
	}
`;
export const PHOTO_FRAGMENT = gql`
	fragment PhotoFragment on Photo {
		id
		user {
			...UserFragment
		}
		tags {
			tag {
				id
				tags
				color
				createdAt
				updatedAt
			}
		}
		caption
		order
		views
		originUrl
		enhanceUrl
		isEnhanced
		createdAt
		updatedAt
		likes
		commentNumber
		isLiked
		isNSFW
		source
		extension
		size
		volume
		isPrivate
		payload
	}
	${USER_FRAGMENT}
`;
