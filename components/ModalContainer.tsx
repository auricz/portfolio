"use client";

interface ArtModalProps {
  bgAddClassName?: string;
  btnAddClassName?: string;
  ariaLabel: string;
  onClose: () => void;
  closing?: boolean;
  children: React.ReactNode;
}

export default function ModalContainer({
  bgAddClassName = "",
  btnAddClassName = "",
  ariaLabel,
  onClose,
  closing = false,
  children
}: ArtModalProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg bg-black/50 modal-fade ${closing ? "modal-fade-closing" : ""} ${bgAddClassName}`}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close image"
        className={`fixed z-10 h-9 w-9 rounded-full bg-black/50 dark:bg-white/10 text-white cursor-pointer hover:bg-black/70 hover:dark:bg-white/20 ${btnAddClassName}`}
      >
        ✕
      </button>
      {children}
    </div>
  );
}