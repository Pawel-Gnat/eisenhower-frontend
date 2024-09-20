interface TextProps {
  text: string;
}

export const HeadingH1 = ({ text }: TextProps) => {
  return (
    <h1 className="select-none text-center text-2xl font-bold sm:text-3xl">{text}</h1>
  );
};
