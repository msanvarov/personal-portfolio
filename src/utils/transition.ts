export const isVisible = (status: string) => status === 'entering' || status === 'entered';

export const reflow = (node: HTMLElement) => node && node.offsetHeight;
