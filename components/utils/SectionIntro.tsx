import { SectionIntroData } from "@/lib/data";
import TagsRow from "@/components/utils/TagsRow";
import AnimateOnMount from "@/components/utils/AnimateOnMount";

interface IntroProps {
  intro: SectionIntroData | null;
}

export default function SectionIntro({ intro }: IntroProps) {
  return intro &&
    <AnimateOnMount variant="right" className="pb-6 border-b border-neutral-300 dark:border-neutral-600">
      <div className="flex flex-col items-center">
        <p
          className="text-sm max-w-2xl text-center text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300"
          dangerouslySetInnerHTML={{ __html: intro.intro }}
        />
        <TagsRow tags={intro.tags} />
      </div>
    </AnimateOnMount>;
}