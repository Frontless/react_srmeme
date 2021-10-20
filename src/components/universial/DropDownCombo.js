import Select from "react-dropdown-select";
import styled from "styled-components";

const StyledCombo = styled(Select)`
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
function DropDownCombo(props) {
	const properties = {
		placeholder: props?.placeholder,
		multi: props?.multi,
		disabled: false,
		loading: false,
		selectValues: [],
		searchBy: "ext",
		clearable: props?.clearable,
		searchable: false,
		create: props?.create,
		separator: true,
		handle: true,
		addPlaceholder: props?.addPlaceholder,
		labelField: "ext",
		valueField: "ext",
		color: "#202020",
		keepSelectedInList: true,
		closeOnSelect: true,
		dropdownPosition: "bottom",
		direction: "ltr",
		dropdownHeight: "300px",
		options: props.options,
		dropdownGap: 5,
		noDataLabel: "",
		onDropdownOpen: () => undefined,
		onDropdownClose: () => undefined,
		onClearAll: () => undefined,
		onSelectAll: () => undefined,
	};
	return (
		<div>
			<StyledCombo
				{...properties}
				onChange={(value) => {
					props?.setSelectedConvertTo(value);
				}}
			></StyledCombo>
		</div>
	);
}
export default DropDownCombo;
