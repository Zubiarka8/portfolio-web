/**
 * Accent full stop for Doto display text. Doto's own "." glyph renders as a
 * five-dot cross at heavy weights and takes a full 0.6em advance, so the
 * period is drawn as a single dot the size of one Doto dot (~0.082em).
 */
export function AccentDot() {
  return (
    <span
      aria-hidden="true"
      className="relative -top-[0.009em] ml-[0.04em] inline-block size-[0.082em] rounded-full bg-accent"
    />
  );
}
