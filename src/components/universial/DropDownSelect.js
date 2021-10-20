import { useMutation } from "@apollo/client";
import Select from "react-dropdown-select";
import { useHistory } from "react-router";
import stc from "string-to-color";
import styled from "styled-components";
import { CREATE_TAGS_MUTATION } from "../../shared/mutation";
const StyledSelect = styled(Select)`
	.react-dropdown-select-dropdown {
		overflow: initial;
	}
	background: #202020;
	border: 1px solid white !important;
	font-size: 15px;
	color: #fff;
	.react-dropdown-select-clear,
	.react-dropdown-select-dropdown-handle {
		color: #fff;
		width: auto;
	}
	.react-dropdown-select-option {
		border: 1px solid #fff;
	}
	.react-dropdown-select-item {
		color: white;
	}
	.react-dropdown-select-input {
		color: #fff;
		width: 440px;
	}
	.react-dropdown-select-separator {
		width: auto;
	}
	.react-dropdown-select-dropdown {
		border: 1px solid white !important;
		position: absolute;
		left: 0;
		border: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		border-radius: 2px;
		max-height: 300px;
		overflow: auto;
		z-index: 9;
		background: #333;
		box-shadow: none;
		color: #fff !important;
	}
	.react-dropdown-select-item {
		color: white;
		border-bottom: 1px solid #333;
		:hover {
			color: #ffffff80;
		}
	}
	.react-dropdown-select-item.react-dropdown-select-item-selected,
	.react-dropdown-select-item.react-dropdown-select-item-active {
		//background: #111;
		border-bottom: 1px solid #333;
		color: #fff;
		font-weight: bold;
	}
	.react-dropdown-select-dropdown-add-new,
	.react-dropdown-select-no-data {
		color: #fff;
	}
`;
function DropDownSelect(props) {
	const history = useHistory();
	const properties = {
		placeholder: props?.placeholder,
		multi: props?.multi,
		disabled: false,
		loading: false,
		selectValues: [],
		searchBy: "tags",
		clearable: props?.clearable,
		searchable: true,
		create: props?.create,
		separator: true,
		handle: true,
		addPlaceholder: props?.addPlaceholder,
		labelField: "tags",
		valueField: "tags",
		color: "#202020",
		keepSelectedInList: true,
		closeOnSelect: true,
		dropdownPosition: "bottom",
		direction: "ltr",
		dropdownHeight: "300px",
		options: [],
		dropdownGap: 5,
		noDataLabel: "일치하는 태그가 없습니다",
		onDropdownOpen: () => undefined,
		onDropdownClose: () => undefined,
		onClearAll: () => undefined,
		onSelectAll: () => undefined,
	};
	const ValidRegEx = (tags) => {
		const pattern = /^[A-Za-z0-9ㄱ-ㅎㅏ-ㅣ가-힣_]{0,10}$/;
		const isMatched = pattern.test(tags);
		// console.log("tags", tags, "isMatched", isMatched);
		if (!isMatched) {
			return false;
		}
		return true;
	};
	const onCompletedCreateTags = (data) => {
		const {
			createTags: { ok, error },
		} = data;
	};
	const [createTags] = useMutation(CREATE_TAGS_MUTATION, {
		onCompleted: onCompletedCreateTags,
	});
	const onCreateNew = (data) => {
		const { tags } = data;
		if (ValidRegEx(tags)) {
			createTags({
				variables: {
					keyword: tags,
					color: stc(tags),
				},
			});
		}
	};

	function handleKeyDownFn(value) {
		if (props?.isHeaderSearch && value?.event?.code === "Enter") {
			console.log("value?.state?.search:", value?.state?.search);
			if (
				!props.searchTagsList.includes(value?.state?.search) &&
				value?.state?.search
			) {
				history.push(`/search/${value?.state?.search}`);
			}
		}
	}

	return (
		<div>
			<div style={{ margin: "0px" }}>
				<StyledSelect
					{...properties}
					onChange={(value) => {
						const tag = value[value.length - 1]?.tags;
						if (tag !== undefined) {
							if (props?.isHeaderSearch) {
								console.log("check value[0]?.tags: ", tag);
								history.push(`/search/${tag}`);
							}
							if (ValidRegEx(tag)) {
								props.selectedTagsListvar(value);
							}
							if (props?.clearLoginError !== undefined) {
								props.clearLoginError();
							}
						}
					}}
					options={props.searchTagsList}
					onCreateNew={onCreateNew}
					handleKeyDownFn={handleKeyDownFn}
				/>
			</div>
		</div>
	);
}
export default DropDownSelect;
