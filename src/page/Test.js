import { useCallback, useEffect, useRef, useState } from "react";

function Test() {
	const [commentTextArea, setCommentTextArea] = useState("");
	const ref = useRef(null);
	const handleResizeHeight = useCallback(() => {
		if (ref === null || ref.current === null) {
			return;
		}
		ref.current.style.height = "38px";
		ref.current.style.height = ref.current.scrollHeight + "px";
	}, []);
	const onValid = (e) => {
		console.log(e.target);
		console.log(ref.current.value);
	};
	return (
		<>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					onValid(e);
				}}
			>
				<textarea
					ref={ref}
					onInput={handleResizeHeight}
					defaultValue={commentTextArea}
				/>
				<button>제출</button>
			</form>
		</>
	);
}

export default Test;
