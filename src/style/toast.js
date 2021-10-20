import { toast } from "react-toastify";
export const toastProps = {
	position: "top-right",
	autoClose: 5000,
	hideProgressBar: false,
	newestOnTop: false,
	closeOnClick: true,
	rtl: false,
	pauseOnFocusLoss: false,
	draggable: false,
	pauseOnHover: false,
	theme: "dark",
	progressStyle: { backgroundColor: "#3867d6" },
	style: { width: "auto" },
};
export const notify = (type, caption) => {
	switch (type) {
		case "info":
			toast.info(caption);
			break;
		case "success":
			toast.success(caption);
			break;
		case "warning":
			toast.warning(caption);
			break;
		case "error":
			toast.error(caption);
			break;
		case "default":
			toast.default(caption);
			break;
		default:
			break;
	}
};
