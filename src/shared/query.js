import gql from "graphql-tag";
import { PHOTO_FRAGMENT, USER_FRAGMENT } from "./fragments";
export const ME_QUERY = gql`
	query me {
		me {
			id
			username
			avatar
			nickname
			isAdmin
		}
	}
`;
export const SEARCH_TAGS_QUERY = gql`
	query searchTags($keyword: String) {
		searchTags(keyword: $keyword) {
			ok
			error
			tags {
				id
				tags
			}
		}
	}
`;
export const READ_ACCOUNT_QUERY = gql`
	query readAccount(
		$username: String
		$email: String
		$nickname: String
		$isAdmin: Boolean!
	) {
		readAccount(
			username: $username
			email: $email
			nickname: $nickname
			isAdmin: $isAdmin
		) {
			ok
			users {
				...UserFragment
				photos {
					...PhotoFragment
				}
				photoComments {
					id
					payload
					isMine
					createdAt
					isDeleted
					photo {
						...PhotoFragment
					}
				}
				photoLikes {
					id
					photo {
						...PhotoFragment
					}
				}
			}

			error
		}
	}
	${USER_FRAGMENT}
	${PHOTO_FRAGMENT}
`;
export const READ_FEED_QUERY = gql`
	query readFeed($page: Int!) {
		readFeed(page: $page) {
			...PhotoFragment
		}
	}
	${PHOTO_FRAGMENT}
`;
export const READ_PHOTO_QUERY = gql`
	query readPhoto($id: Int!, $page: Int!) {
		readPhoto(id: $id, page: $page) {
			photo {
				...PhotoFragment
				photoComments {
					id
					isDeleted
					user {
						username
						nickname
					}
					payload
					isMine
					createdAt
					parent {
						id
						payload
						createdAt
						user {
							id
							username
							nickname
						}
						children {
							id
							payload
							createdAt
							user {
								id
								username
								nickname
							}
						}
					}
					children {
						id
						payload
						createdAt
						user {
							id
							username
							nickname
						}
						parent {
							id
							payload
							createdAt
							user {
								id
								username
								nickname
							}
						}
					}
				}
			}

			photoComments {
				id
				isDeleted
				user {
					username
					nickname
				}
				payload
				isMine
				createdAt
				parent {
					id
					payload
					createdAt
					user {
						id
						username
						nickname
					}
					children {
						id
						payload
						createdAt
						user {
							id
							username
							nickname
						}
					}
				}
				children {
					id
					payload
					createdAt
					user {
						id
						username
						nickname
					}
					parent {
						id
						payload
						createdAt
						user {
							id
							username
							nickname
						}
					}
				}
			}
			commentPage
		}
	}
	${PHOTO_FRAGMENT}
`;
export const READ_COMMENT_QUERY = gql`
	query readComment($photoId: Int!, $page: Int!) {
		readComment(photoId: $photoId, page: $page) {
			photoComments {
				id
				isDeleted
				payload
				isMine
				createdAt
				user {
					username
					nickname
				}
				parent {
					id
					payload
					createdAt
					user {
						id
						username
						nickname
					}
					children {
						id
						payload
						createdAt
						user {
							id
							username
							nickname
						}
					}
				}
				children {
					id
					payload
					createdAt
					user {
						id
						username
						nickname
					}
					parent {
						id
						payload
						createdAt
						user {
							id
							username
							nickname
						}
					}
				}
			}
			commentPage
		}
	}
`;
