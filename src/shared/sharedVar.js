import { makeVar } from "@apollo/client";

export const searchTagsListVar = makeVar([]);
export const selectedTagsListvar = makeVar([]);

export const mediaFileVar = makeVar("");
export const mediaUrlVar = makeVar("");

export const homeUnlimitScrollPageVar = makeVar(0);
export const convertByImgOptions = [
	{
		ext: "webp",
	},
	{
		ext: "jpg",
	},
];
export const convertByVidOptions = [
	{
		ext: "webm",
	},
	{
		ext: "mp4",
	},
];
