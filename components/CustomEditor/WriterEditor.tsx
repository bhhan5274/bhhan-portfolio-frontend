'use client';

import React, { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

type CustomEditorProps = {
  initialData?: string;
  onChange?: (data: string) => void;
};

export function WriteEditor({ initialData, onChange }: CustomEditorProps) {
  const [value, setValue] = useState(initialData ?? '');

  useEffect(() => {
    setValue(initialData ?? '');
  }, [initialData]);

  useEffect(() => {
    document.body.style.overflowX = 'hidden';

    return () => {
      document.body.style.overflowX = 'auto';
    };
  }, []);

  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_EDITOR_TOKEN}
      init={{
        menubar: false,
        plugins: [
          'advlist',
          'autolink',
          'lists',
          'link',
          'image',
          'charmap',
          'preview',
          'anchor',
          'searchreplace',
          'visualblocks',
          'code',
          'fullscreen',
          'insertdatetime',
          'media',
          'table',
          'code',
          'help',
          'wordcount',
        ],
        toolbar:
          'undo redo | blocks | link image table |' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
        height: 320,
        autoresize_bottom_margin: 0,
        autoresize_overflow_padding: 0,
        resize: false,
        statusbar: false,
        width: '100%',
        convert_newlines_to_brs: true,
        br_newlines: true,
        entity_encoding: 'raw',
        br_in_pre: false,
      }}
      value={value}
      onEditorChange={(newValue) => {
        setValue(newValue);
        onChange?.(newValue);
      }}
    />
  );
}
