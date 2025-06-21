type HighlightProps = {
  text: string;
  highlight: string;
};

function Texthighlighter({ text, highlight }: HighlightProps) {
  if (!highlight.trim()) return <>{text}</>;

  const regex = new RegExp(`(${highlight})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-yellow-200 text-black">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

export default Texthighlighter;
