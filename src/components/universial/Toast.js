import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { toastProps } from "../../style/toast";

function Toast() {
	return (
		<>
			<ToastContainer {...toastProps} />
		</>
	);
}
export default Toast;
