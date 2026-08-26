import { SectionIntroData } from "@/lib/data";
import TagsRow from "@/components/utils/TagsRow";

interface IntroProps {
  intro?: SectionIntroData;
}

export default function SectionIntro({ intro }: IntroProps) {
  return intro ?
    <div className="pb-6 border-b border-neutral-300 dark:border-neutral-600 animate-slide-in-right">
      <div className="flex flex-col items-center">
        <p 
          className="text-sm max-w-2xl text-center text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300" 
          dangerouslySetInnerHTML={{ __html: intro.intro }} 
        />
        <TagsRow tags={intro.tags} />
      </div>
    </div>
    :
    <></>;
}