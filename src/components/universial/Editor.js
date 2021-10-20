import "react-quill/dist/quill.snow.css";
import { editorFormats, editorModules } from "../../style/editor";
import Quill from "react-quill";
import { useState } from "react";
import styled from "styled-components";
const Container = styled.div`
	display: flex;
	justify-content: center;
	height: 300px;
`;
function Editor({ desc, setDesc }) {
	// const [desc, setDesc] = useState("");
	function onEditorChange(value) {
		setDesc(value);
	}
	return (
		<Container>
			<Quill
				style={{ width: "95%", height: "90%" }}
				theme="snow"
				modules={editorModules}
				formats={editorFormats}
				value={desc || ""}
				onChange={(content, delta, source, editor) =>
					onEditorChange(editor.getHTML())
				}
			/>
		</Container>
	);
}
export default Editor;
