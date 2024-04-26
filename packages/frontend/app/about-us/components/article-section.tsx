/**
 * A common component which displays article sections
 *
 * @param props - The props object
 * @param props.sectionHeading - The heading of the article section
 * @param props.sectionText - The content of the section
 * @returns
 */
export function ArticleSection({
  sectionHeading,
  sectionText,
}: {
  sectionHeading: string;
  sectionText: string;
}) {
  return (
    <section className="flex flex-col items-center gap-y-2 mt-4">
      <h2 className="text-4xl">{sectionHeading}</h2>
      <p className="w-1/2">{sectionText}</p>
    </section>
  );
}
