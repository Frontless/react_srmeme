import { useMutation, useReactiveVar } from "@apollo/client";
import { useForm } from "react-hook-form";
import { isLoggedInVar } from "../shared/apollo";
import {
	UploadContainer,
	UploadContent,
	UploadImg,
	UploadMedia,
	UploadSpan,
	UploadSubmit,
	UploadVideo,
} from "../style/upload";
import RequiredLogin from "../components/universial/RequiredLogin";
import { refUploadCaption, refUploadMedia } from "../shared/sharedRef";
import FormError from "../components/universial/FormError";
import Editor from "../components/universial/Editor";
import { useState } from "react";
import {
	convertByImgOptions,
	convertByVidOptions,
	mediaFileVar,
	mediaUrlVar,
	searchTagsListVar,
	selectedTagsListvar,
} from "../shared/sharedVar";
import DropDownSelect from "../components/universial/DropDownSelect";
import { notify } from "../style/toast";
import { handleChangeImage } from "../shared/utils";
import DropDownCombo from "../components/universial/DropDownCombo";
import { UPLOAD_PHOTO_MUTATION } from "../shared/mutation";
function Upload() {
	const {
		register,
		handleSubmit,
		errors,
		formState,
		getValues,
		setError,
		clearErrors,
	} = useForm({
		mode: "onChange",
	});
	const hasToken = useReactiveVar(isLoggedInVar);
	const mediaFile = useReactiveVar(mediaFileVar);
	const mediaUrl = useReactiveVar(mediaUrlVar);
	const searchTagsList = useReactiveVar(searchTagsListVar);
	const selectedTagsList = useReactiveVar(selectedTagsListvar);
	const [isPrivate, setIsPrivate] = useState(false);
	const [selectedConvertTo, setSelectedConvertTo] = useState("");
	const [desc, setDesc] = useState("");
	const handleIsPrivate = (e) => {
		setIsPrivate(e.target.checked);
	};

	const onCompleted = async (data) => {
		const {
			uploadPhoto: { ok, id, error },
		} = await data;

		if (!ok) {
			return setError("result", {
				message: error,
			});
		}
		selectedTagsListvar([]);
		window.location.replace(`/media/${id}`);
	};

	const [uploadPhoto, { loading }] = useMutation(UPLOAD_PHOTO_MUTATION, {
		onCompleted,
	});

	const onSubmitValid = (data) => {
		if (loading) {
			return;
		}
		if (data.caption === undefined || data.caption === "") {
			notify("error", "????????? ?????????????????????");
			return;
		}
		if (selectedTagsList.length === 0) {
			notify("error", "????????? ????????? 1????????? ?????????????????????");
			return;
		}
		if (data.originUrl[0] === undefined) {
			notify("error", "????????? ???????????? ????????????");
			return;
		}
		if (selectedConvertTo?.length === 0) {
			notify("error", "????????? ???????????? ???????????? ?????????????????????");
			return;
		}
		const caption = data.caption;
		const originUrl = data.originUrl[0];
		const tags = [];
		selectedTagsList.map((value) => {
			tags.push(value?.tags);
		});

		console.log("caption", data.caption);
		console.log("originUrl", data.originUrl[0]);
		console.log("desc", desc);
		console.log("selectedTagsList", selectedTagsList);
		console.log("isPrivate", isPrivate);
		console.log("selectedConvertTo", selectedConvertTo[0]?.ext);
		console.log("????????? ??????");
		uploadPhoto({
			variables: {
				caption,
				originUrl,
				payload: desc,
				tags: tags,
				isPrivate: isPrivate,
				convertTo: selectedConvertTo[0]?.ext,
			},
			errorPolicy: "all",
		});
	};
	return (
		<UploadContainer>
			{hasToken ? (
				<form
					onSubmit={handleSubmit(onSubmitValid)}
					onKeyPress={(e) => {
						e.key === "Enter" && e.preventDefault();
					}}
				>
					<UploadContent>
						<UploadSpan>??????</UploadSpan>
						<input
							ref={register()}
							className="input caption"
							type="text"
							name="caption"
							placeholder="????????? ???????????????"
						/>
					</UploadContent>
					<UploadContent>
						<UploadSpan>??????</UploadSpan>

						<Editor desc={desc} setDesc={setDesc} />
					</UploadContent>
					<UploadContent>
						<UploadSpan>??????</UploadSpan>
						<div className="uploadDropDownSelect">
							<DropDownSelect
								className="tagSelect"
								create={true}
								multi={true}
								clearable={true}
								placeholder={"????????? ????????? ???????????????"}
								addPlaceholder={"+ ????????? ???????????????"}
								searchTagsList={searchTagsList}
								isHeaderSearch={false}
								selectedTagsListvar={selectedTagsListvar}
							/>
						</div>
						<p>
							????????? ?????? ????????? ?????? 10?????? ??????, ??? ???????????? ??? ????????? _
							????????? ?????? ????????? ???????????? ????????????.
						</p>
					</UploadContent>
					<UploadContent>
						<UploadSpan>?????????</UploadSpan>
						<UploadMedia>
							{mediaFile &&
								(mediaFile.type.includes("image") ? (
									<UploadImg src={mediaUrl} alt={mediaFile.name} />
								) : mediaFile.type.includes("video") ? (
									<UploadVideo
										src={mediaUrl}
										alt={mediaFile.name}
										controls={true}
										autoPlay={true}
										loop={true}
									/>
								) : null)}
							<input
								ref={register()}
								name="originUrl"
								type="file"
								accept="image/*,video/*"
								onChange={(e) => {
									if (!handleChangeImage(e, mediaFileVar, mediaUrlVar, 100)) {
										notify("error", "???????????? ????????? ?????? ???????????????");
										mediaFileVar("");
										mediaUrlVar("");
									}
								}}
							/>
							<div>
								<div className="uploadCheckBoxDiv">
									<input
										className="uploadCheckBox"
										type="checkbox"
										onChange={handleIsPrivate}
									/>
									<span>?????????</span>
								</div>
							</div>
							{mediaFile.type ? (
								<div>
									<DropDownCombo
										className={"convertBy"}
										create={false}
										multi={false}
										clearable={false}
										placeholder={"????????? ???????????? ???????????????"}
										options={
											mediaFile.type.includes("image")
												? convertByImgOptions
												: convertByVidOptions
										}
										setSelectedConvertTo={setSelectedConvertTo}
									/>
									<p>?????? ???????????? ?????? .gif ???????????? ???????????? ????????????</p>
								</div>
							) : null}
						</UploadMedia>
					</UploadContent>
					<UploadSubmit type="submit" value={"?????????"}></UploadSubmit>
				</form>
			) : (
				<RequiredLogin />
			)}
		</UploadContainer>
	);
}
export default Upload;
