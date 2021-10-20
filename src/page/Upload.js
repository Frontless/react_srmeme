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
			notify("error", "제목을 입력해야합니다");
			return;
		}
		if (selectedTagsList.length === 0) {
			notify("error", "태그는 적어도 1개이상 선택해야합니다");
			return;
		}
		if (data.originUrl[0] === undefined) {
			notify("error", "선택된 미디어가 없습니다");
			return;
		}
		if (selectedConvertTo?.length === 0) {
			notify("error", "변환될 미디어의 확장자를 선택해야합니다");
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
		console.log("업로드 완료");
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
						<UploadSpan>제목</UploadSpan>
						<input
							ref={register()}
							className="input caption"
							type="text"
							name="caption"
							placeholder="제목을 입력하세요"
						/>
					</UploadContent>
					<UploadContent>
						<UploadSpan>내용</UploadSpan>

						<Editor desc={desc} setDesc={setDesc} />
					</UploadContent>
					<UploadContent>
						<UploadSpan>태그</UploadSpan>
						<div className="uploadDropDownSelect">
							<DropDownSelect
								className="tagSelect"
								create={true}
								multi={true}
								clearable={true}
								placeholder={"추가할 태그를 입력하세요"}
								addPlaceholder={"+ 태그를 추가하세요"}
								searchTagsList={searchTagsList}
								isHeaderSearch={false}
								selectedTagsListvar={selectedTagsListvar}
							/>
						</div>
						<p>
							태그를 새로 생성할 경우 10문자 이내, 영 대소문자 및 한글과 _
							문자외 다른 문자는 저장되지 않습니다.
						</p>
					</UploadContent>
					<UploadContent>
						<UploadSpan>미디어</UploadSpan>
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
										notify("error", "미디어의 용량이 초과 되었습니다");
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
									<span>비공개</span>
								</div>
							</div>
							{mediaFile.type ? (
								<div>
									<DropDownCombo
										className={"convertBy"}
										create={false}
										multi={false}
										clearable={false}
										placeholder={"변환할 확장자를 선택하세요"}
										options={
											mediaFile.type.includes("image")
												? convertByImgOptions
												: convertByVidOptions
										}
										setSelectedConvertTo={setSelectedConvertTo}
									/>
									<p>서버 최적화를 위해 .gif 확장자는 지원되지 않습니다</p>
								</div>
							) : null}
						</UploadMedia>
					</UploadContent>
					<UploadSubmit type="submit" value={"업로드"}></UploadSubmit>
				</form>
			) : (
				<RequiredLogin />
			)}
		</UploadContainer>
	);
}
export default Upload;
