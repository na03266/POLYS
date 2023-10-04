import React from "react";
import { AiFillHome } from "react-icons/ai";

function Confirmerror() {
  const goRegist = () => {
    window.location.href = "/regist";
  };

  const goHome = () => {
    window.location.href = "/";
  };
  const iconStyle = {
    position: "fixed",
    bottom: "10px",
    right: "10px",
    fontSize: "35px",
    cursor: "pointer",
  };

  const buttonStyle = {
    position: "fixed",
    bottom: "10px",
    left: "10px",
  };
  return (
    <div>
      인식이 안되었을때 경우
      <h2>
        인식이 안됩니다.
        <br></br>
        카드로 인식해주세요.
      </h2>
      <button style={buttonStyle} onClick={goRegist}>
        회원가입
      </button>
      <AiFillHome style={iconStyle} onClick={goHome} />
    </div>
  );
}

export default Confirmerror;
