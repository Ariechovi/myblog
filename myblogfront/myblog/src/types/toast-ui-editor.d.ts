declare module '@toast-ui/editor' {
  import type { EditorOptions } from '@toast-ui/editor/types/editor'
  export default class Editor {
    constructor(options: EditorOptions)
    getMarkdown(): string
    getHTML(): string
    setMarkdown(markdown: string): void
    destroy(): void
  }
}
