interface SectionHeadingProps {
  text: string;
}

export function SectionHeading({ text }: SectionHeadingProps) {
  return (
    <h3 className="font-serif italic text-foreground/70 text-base font-medium mt-6 mb-2 leading-snug">
      {text}
    </h3>
  );
}
