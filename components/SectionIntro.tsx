interface IntroProps {
  intro?: string | null;
}

export default function SectionIntro({ intro }: IntroProps) {
  return intro ?
    <div className="flex flex-col pb-6 border-b border-neutral-300 dark:border-neutral-600 animate-slide-in-right">
      <p className="text-sm max-w-2xl text-center self-center text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300">
        {intro}
      </p>
    </div>
    :
    <></>;
}