export type Post = {
  content: string;
  metadata: Record<string, string>;
  filePath: string;
};

export interface IBlogState {
  readonly posts: Post[];
  readonly tags: string[];
  readonly categories: string[];
}

export enum LanguageEnum {
  EN = 'en',
  FR = 'fr',
}

export enum ThemeModeEnum {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface ILayoutState {
  readonly language: LanguageEnum;
  readonly themeMode: ThemeModeEnum;
  readonly displayMobileNavbar: boolean;
}
