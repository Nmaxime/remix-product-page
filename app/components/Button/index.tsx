import { PropsWithChildren } from "react";

export interface IButtonProps extends PropsWithChildren<{}> {
  mode?: "black" | "white";
}

const Button = ({ children, mode = "white" }: IButtonProps) => {
  return (
    <button className={"button"} data-button-mode={mode}>
      {children}
    </button>
  );
};

export default Button;
