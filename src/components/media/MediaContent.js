import { ImgComparisonSlider } from "@img-comparison-slider/react";
import Loader from "react-loader-spinner";
import styled from "styled-components";
const MeidaContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	// grid-template-columns: 1fr 1fr;

	height: 100%;
	white-space: nowrap;
	margin: 10px;
	img {
		min-width: 512px;
		max-width: 512px;

		border-radius: 20px;
		border: 3px solid white;
	}
	video {
		min-width: 512px;
		max-width: 512px;

		border-radius: 20px;
		border: 3px solid white;
	}
	margin-bottom: 100px;
	.coloured-slider {
		--divider-color: rgba(0, 0, 0, 0.5);
		--default-handle-color: rgba(0, 0, 0, 0.5);
		--default-handle-shadow: 0px 0px 20px rgba(0, 0, 0, 1);
		--divider-width: 3px;
	}
`;
function MediaContents({ data }) {
	return (
		<MeidaContainer>
			<ImgComparisonSlider class="coloured-slider">
				<img slot="first" src={data?.originUrl}></img>
				<img slot="second" src={data?.originUrl}></img>

				{/* {data?.originUrl.split(".")[data?.originUrl.split(".").length - 1] ===
				"gif" ? (
					<img src={data?.originUrl} />
				) : data?.originUrl.split(".")[
						data?.originUrl.split(".").length - 1
				  ] === "mp4" ? (
					<video autoPlay loop src={data?.originUrl} />
				) : null}
				<div>
					{data?.isEnhanced ? (
						<div>
							{data?.enhanceUrl.split(".")[
								data?.enhanceUrl.split(".").length - 1
							] === "gif" ? (
								<img src={data?.enhanceUrl} />
							) : data?.enhanceUrl.split(".")[
									data?.enhanceUrl.split(".").length - 1
							  ] === "mp4" ? (
								<video autoPlay loop src={data?.enhanceUrl} />
							) : (
								<Loader
									type="Oval"
									color="#00BFFF"
									height={256}
									width={256}
									timeout={0}
								/>
							)}
						</div>
					) : (
						<Loader
							type="Oval"
							color="#00BFFF"
							height={256}
							width={256}
							timeout={0}
						/>
					)}
				</div> */}
			</ImgComparisonSlider>
		</MeidaContainer>
	);
}
export default MediaContents;
