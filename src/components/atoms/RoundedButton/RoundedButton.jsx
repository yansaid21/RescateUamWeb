import PropTypes from "prop-types";
import "./RoundedButton.css";

RoundedButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string,
  imageSrc: PropTypes.any,
  buttonClass: PropTypes.object,
  disabled: PropTypes.bool,
  disabledText: PropTypes.string,
  disabledImageSrc: PropTypes.any,
  disabledClass: PropTypes.object,
};

export default function RoundedButton({
  onClick,
  text = null,
  imageSrc = null,
  buttonClass = {},
  disabled = false,
  disabledText = "",
  disabledImageSrc = null,
  disabledClass = {},
}) {
  const btnText = disabled ? (disabledText != "" ? disabledText : text) : text;
  const image = disabled
    ? disabledImageSrc
      ? disabledImageSrc
      : imageSrc
    : imageSrc;

  const style = disabled
    ? { ...buttonClass, ...disabledClass }
    : { ...buttonClass };
  return (
    <button
      onClick={onClick}
      className={`roundedButton  ${disabled ? "roundedButtonDisabled " : ""}`}
      style={
        image
          ? {
              backgroundImage: `url(${image})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",

              ...style,
            }
          : { ...style }
      }
      disabled={disabled}
    >
      {btnText}
    </button>
  );
}
