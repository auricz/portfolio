interface TagsProp {
  tags: string[] | null;
}

// Reusable component for a list (or row) of tags
export default function TagsRow({ tags }: TagsProp) {
  return (tags &&
    <ul className="mt-4 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full border border-neutral-400 px-3 py-1 text-xs text-neutral-600 dark:border-neutral-500 dark:text-neutral-300"
        >
          {tag}
        </li>
      ))}
    </ul>
  )
}