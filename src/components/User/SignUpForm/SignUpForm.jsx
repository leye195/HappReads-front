import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames/bind";

import SocialLogin from "../../SocialLogin/SocialLogin";

import style from "../Form.scss";

const cx = classnames.bind(style);
const SignUpForm = ({ handleSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({
    p1: "",
    p2: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const { p1, p2 } = password;
    if (p1 === p2) {
      handleSignUp(email, p1);
    }
  };
  const handleEmail = useCallback((e) => {
    const { target } = e;
    setEmail(target.value);
  }, []);
  const handlePassword1 = useCallback(
    (e) => {
      const { target } = e;
      setPassword({
        ...password,
        p1: target.value,
      });
    },
    [password]
  );
  const handlePassword2 = useCallback(
    (e) => {
      const { target } = e;
      setPassword({
        ...password,
        p2: target.value,
      });
    },
    [password]
  );
  return (
    <section className={cx("signup-form", "form-container")}>
      <h2>회원가입</h2>
      <SocialLogin />
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={handleEmail}
          placeholder="이메일"
          required
        />
        <input
          type="password"
          value={password.p1}
          onChange={handlePassword1}
          placeholder="비밀번호"
          required
        />
        <input
          type="password"
          value={password.p2}
          onChange={handlePassword2}
          placeholder="비밀번호 재입력"
          required
        />
        <input type="submit" value="가입" />
      </form>
      <Link to="/login">
        <button>로그인 이동</button>
      </Link>
    </section>
  );
};

export default SignUpForm;
