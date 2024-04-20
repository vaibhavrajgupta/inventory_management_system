/* eslint-disable react/prop-types */
import QRCode from "react-qr-code";

const QrCode = (props) => {
	const propsValue = JSON.stringify(props.value);
	
	return (
		<div
			style={{ height: "auto", margin: "0 auto", maxWidth: 85, width: "100%" }}
		>
			<QRCode
				size={256}
				style={{ height: "auto", maxWidth: "100%", width: "100%" }}
				value={propsValue}
				viewBox={`0 0 256 256`}
			/>
		</div>
	);
};
export default QrCode;
