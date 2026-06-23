import { CKEditor } from "@ckeditor/ckeditor5-react";

import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading,
  List,
  Link,
  Table,
  TableToolbar,
  SourceEditing,
  CodeBlock,
  BlockQuote,
  Image,
  ImageToolbar,
  ImageCaption,
  ImageResize,
  ImageStyle,
  ImageBlock,
  ImageInline,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";

const RichTextEditor = ({ value, onChange }) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={value || ""}
      config={{
        licenseKey: "GPL",

        plugins: [
          Essentials,
          Paragraph,
          Bold,
          Italic,
          Underline,
          Strikethrough,
          Heading,
          List,
          Link,
          Table,
          TableToolbar,
          SourceEditing,
          CodeBlock,
          BlockQuote,
          Image,
  ImageToolbar,
  ImageCaption,
  ImageResize,
  ImageStyle,
  ImageBlock,
  ImageInline,
        ],

        toolbar: [
          "undo",
          "redo",
          "|",
          "heading",
          "|",
          "bold",
          "italic",
          "underline",
          "strikethrough",
          "|",
          "bulletedList",
          "numberedList",
          "|",
          "link",
          "|",
          "insertTable",
          "|",
          "blockQuote",
          "codeBlock",
          "|",
          "sourceEditing",
        ],
        image: {
  toolbar: [
    "toggleImageCaption",
    "imageTextAlternative",
    "|",
    "imageStyle:inline",
    "imageStyle:block",
    "imageStyle:side",
  ],
},
      }}
      onChange={(event, editor) => {
        onChange(editor.getData());
      }}
    />
  );
};

export default RichTextEditor;