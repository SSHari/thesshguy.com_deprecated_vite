import { useEffect, useState, useRef } from 'react';
import { useFetcher } from 'remix';
import { DialogOverlay, DialogContent } from '@reach/dialog';
import type { DialogOverlayProps } from '@reach/dialog';
import { MDXLayout } from './MDXLayout';

type MDXPreviewerProps = { content: string; fieldName: string };

type MDXPreviewerModalProps = {
  content: string;
  onDismiss: DialogOverlayProps['onDismiss'];
};

type MDXData = { mdxContent: string };

const MDXPreviewerModal = (props: MDXPreviewerModalProps) => {
  const fetcher = useFetcher<MDXData>();

  useEffect(() => {
    if (fetcher.type === 'init' && props.content) {
      fetcher.submit(
        { content: props.content },
        { method: 'post', action: '/admin/bundle-mdx' },
      );
    }
  }, [props.content, fetcher.type, fetcher.submit]);

  return (
    <DialogOverlay
      onDismiss={props.onDismiss}
      className="fixed top-0 right-0 bottom-0 left-0 overflow-auto bg-gray-/80"
    >
      <DialogContent className="my-[10vh] mx-auto max-h-[80vh] w-[60vw] overflow-scroll rounded-lg border-4 border-gray-900 bg-white p-8 outline-none">
        {fetcher.data ? (
          <MDXLayout mdx={fetcher.data.mdxContent} />
        ) : (
          <span className="flex justify-center font-bold">
            You need to provide content to see a preview...
          </span>
        )}
      </DialogContent>
    </DialogOverlay>
  );
};

export const MDXPreviewer = (props: MDXPreviewerProps) => {
  const content = useRef<HTMLTextAreaElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const open = () => setIsModalOpen(true);
  const close = () => setIsModalOpen(false);

  return (
    <>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between">
          <label className="font-bold" htmlFor="mdx-content-editor">
            Content:
          </label>
          <button
            type="button"
            className="font-bold italic text-primary hover:text-gray-800"
            onClick={open}
          >
            Preview
          </button>
        </div>
        <textarea
          id="mdx-content-editor"
          ref={content}
          className="h-96 resize-none rounded border border-gray-900 py-1 px-2"
          defaultValue={props.content ?? ''}
          name={props.fieldName}
        />
      </div>
      {isModalOpen && (
        <MDXPreviewerModal
          content={content.current?.value ?? ''}
          onDismiss={close}
        />
      )}
    </>
  );
};
