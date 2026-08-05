export interface SyzygyAnimation {
  duration: { fast: number; normal: number; slow: number };
}
export const defaultAnimation: SyzygyAnimation = {
  duration: { fast: 150, normal: 300, slow: 500 },
};
