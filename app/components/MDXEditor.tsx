import CodeMirror from '@uiw/react-codemirror';
import type { ReactCodeMirrorProps } from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { EditorView } from '@codemirror/view';
import { vim } from '@replit/codemirror-vim';

type MDXEditorProps = {
  content: string;
  onChange: ReactCodeMirrorProps['onChange'];
  labeledBy: string;
};

export const MDXEditor = ({ content, onChange, labeledBy }: MDXEditorProps) => {
  return (
    <CodeMirror
      value={content}
      onChange={onChange}
      className="text-lg"
      height="500px"
      theme="dark"
      aria-labelledby={labeledBy}
      extensions={[
        vim(),
        markdown({ base: markdownLanguage, codeLanguages: languages }),
        EditorView.lineWrapping,
      ]}
    />
  );
};
