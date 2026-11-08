/** "iconoir-github" → "Github" */
export const profileName = (icon: string) =>
  icon.replace('iconoir-', '').replace(/^./, (c) => c.toUpperCase());
