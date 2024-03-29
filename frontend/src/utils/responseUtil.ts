import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

type ToastType = "success" | "error";

export const showToastMessage = (toastType: ToastType, message: string) => {
  const backgroundColor = toastType === "success" ? "#7CFC00" : "#FF5733";
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      borderRadius: "10px 0px 0px 10px",
      background: backgroundColor,
    },
  }).showToast();
};
