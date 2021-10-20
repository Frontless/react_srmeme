import crypto from "crypto-js";
export const setImageFromFile = ({ file, setImageUrl }) => {
	let reader = new FileReader();
	reader.onload = function () {
		setImageUrl({ result: reader.result });
	};
	reader.readAsDataURL(file);
};
export const handleChangeImage = (
	{ target: { files } },
	setAvatarFile,
	setAvatarUrl,
	volumelimitMB
) => {
	const volumnlimitByte = volumelimitMB * 1000000;
	// console.log(files[0].size);
	if (files[0].size > volumnlimitByte) {
		// console.log("용량초과");
		return false;
	}
	if (files.length) {
		setImageFromFile({
			file: files[0],
			setImageUrl: ({ result }) => {
				setAvatarFile(files[0]);
				setAvatarUrl(result);
			},
		});
		return true;
	}
};
export const getEncryptContext = (context) => {
	const encUtf8 = crypto.enc.Utf8.parse(context);
	const encBase64 = crypto.enc.Base64.stringify(encUtf8);

	return encBase64;
};
export const getDecryptContext = (context) => {
	const decBase64 = crypto.enc.Base64.parse(context);
	const decUtf8 = crypto.enc.Utf8.stringify(decBase64);
	return decUtf8;
};
export const EncryptUserIdNicknameQuery = (username, nickname) => {
	return getEncryptContext(`${username}|${nickname}`);
};
export const DecryptUserIdNicknameQuery = (context) => {
	return getDecryptContext(context).split("|");
};
export const getDetailTime = (tickDate, isDetail) => {
	let DetailTime = null;
	const date = new Date(Number(tickDate));
	const SimpleTime = `${date.getFullYear().toString().padStart(2, "0")}년 ${(
		date.getMonth() + 1
	)
		.toString()
		.padStart(2, "0")}월 ${date.getDate().toString().padStart(2, "0")}일 `;
	if (isDetail) {
		DetailTime = `${date.getHours().toString().padStart(2, "0")}시 ${date
			.getMinutes()
			.toString()
			.padStart(2, "0")}분 ${date.getSeconds().toString().padStart(2, "0")}초`;
		return SimpleTime + DetailTime;
	}
	return SimpleTime;
};
export const getElapsedTime = (time) => {
	const now = new Date().getTime();
	const timeSec = (now - time) / 1000;
	let result = "";
	let elapsedTime = 0;

	if (timeSec < 60) {
		result = "방금 전";
	} else if (timeSec < 3600 && timeSec >= 60) {
		elapsedTime = Math.round(timeSec / 60);
		result = `${elapsedTime}분 전`;
	} else if (timeSec < 86400 && timeSec >= 3600) {
		elapsedTime = Math.round(timeSec / 60 / 60);
		result = `${elapsedTime}시간 전`;
	} else if (timeSec < 2628000 && timeSec >= 86400) {
		elapsedTime = Math.round(timeSec / 24 / 60 / 60);
		result = `${elapsedTime}일 전`;
	} else if (timeSec < 31535308 && timeSec >= 2628000) {
		elapsedTime = Math.round(timeSec / 30.416 / 24 / 60 / 60);
		result = `${elapsedTime}달 전`;
	} else {
		elapsedTime = Math.round(timeSec / 12 / 30.416 / 24 / 60 / 60);
		result = `${elapsedTime}년 전`;
	}
	return result;
};
export const checkMediaExt = (ext) => {
	let ImgOrVid = "";
	switch (ext) {
		case "jpg":
			ImgOrVid = "img";
			break;
		case "webp":
			ImgOrVid = "img";
			break;
		case "gif":
			ImgOrVid = "img";
			break;
		case "mp4":
			ImgOrVid = "vid";
			break;
		case "webm":
			ImgOrVid = "vid";
			break;

		default:
			break;
	}
	return ImgOrVid;
};
