"use client";

import classNames from "classnames";
import type { MouseEvent } from "react";
import styles from "./styles.module.scss";

export default function Checkbox({
  isActive,
  setActive,
}: {
  isActive?: boolean;
  setActive?: (value: boolean) => void;
}) {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setActive?.(!isActive);
  };

  return (
    <button
      className={classNames(styles.input)}
      onClick={(e) => handleClick(e)}
    >
      {isActive ? (
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 3.63672H5C3.9 3.63672 3 4.53672 3 5.63672V19.6367C3 20.7367 3.9 21.6367 5 21.6367H19C20.1 21.6367 21 20.7367 21 19.6367V5.63672C21 4.53672 20.1 3.63672 19 3.63672ZM19 19.6367H5V5.63672H19V19.6367ZM17.99 9.63672L16.58 8.21672L9.99 14.8067L7.41 12.2367L5.99 13.6467L9.99 17.6367L17.99 9.63672Z"
            fill="#747474"
          />
        </svg>
      ) : (
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 5.63672V19.6367H5V5.63672H19ZM19 3.63672H5C3.9 3.63672 3 4.53672 3 5.63672V19.6367C3 20.7367 3.9 21.6367 5 21.6367H19C20.1 21.6367 21 20.7367 21 19.6367V5.63672C21 4.53672 20.1 3.63672 19 3.63672Z"
            fill="#747474"
          />
        </svg>
      )}
    </button>
  );
}
