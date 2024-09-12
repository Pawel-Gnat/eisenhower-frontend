interface TextProps {
  text: string;
}

export const HeadingH1 = ({ text }: TextProps) => {
  return <h1 className="text-center text-2xl font-bold sm:text-3xl">{text}</h1>;
};
