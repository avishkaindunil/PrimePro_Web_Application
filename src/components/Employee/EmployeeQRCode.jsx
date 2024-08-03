import QRCode from "qrcode.react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import moment from "moment";
import PropTypes from "prop-types";

const EmployeeQRCode = ({ employeeId }) => {
  const today = moment().format("YYYY-MM-DD");
  const uniqueString = `${employeeId}-${today}`;
  const MySwal = withReactContent(Swal);

  const showQRCodePopup = () => {
    MySwal.fire({
      title: "Employee Attendance QR Code",
      html: (
        <div className="flex flex-col items-center">
          <QRCode id="qrcode" value={uniqueString} />
          <br />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={downloadQRCode}
          >
            Download QR Code
          </button>
        </div>
      ),
      showConfirmButton: false,
    });
  };

  const downloadQRCode = () => {
    const canvas = document.getElementById("qrcode");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `QRCode_${employeeId}_${today}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mx-4 text-sm"
        onClick={showQRCodePopup}
      >
        Show QR Code
      </button>
    </div>
  );
};

EmployeeQRCode.propTypes = {
  employeeId: PropTypes.string,
};

export default EmployeeQRCode;
