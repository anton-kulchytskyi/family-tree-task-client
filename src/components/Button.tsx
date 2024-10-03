type ButtonPrps = {
  text: string;
  click?: () => void;
};

const Button = ({ text, click }: ButtonPrps) => {
  return (
    <button
      type="button"
      className="action-button"
      onClick={click}
    >
      {text}
    </button>
  );
};

export default Button;
