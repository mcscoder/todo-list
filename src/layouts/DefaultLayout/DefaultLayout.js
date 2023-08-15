import classNames from "classnames/bind";
import style from "./DefaultLayout.module.scss";

const cx = classNames.bind(style);

function DefaultLayout({ children }) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("main")}>{children}</div>
    </div>
  );
}

export default DefaultLayout;
