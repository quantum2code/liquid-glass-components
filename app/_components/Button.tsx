
export interface BtnProps {
  btntxt?: string;
  bgcolor?: string;
  textcolor?: string;
  onClick?: () => void;
}

export const Btn = ({
  btntxt = "Button",
  bgcolor = "#007AFF",
  textcolor = "white",
  onClick,
}: BtnProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ backgroundColor: bgcolor, color: textcolor }}
      className="py-3 rounded-full px-10 font-medium tracking-wide cursor-pointer hover:opacity-90 transition-opacity"
    >
      {btntxt}
    </button>
  );
};