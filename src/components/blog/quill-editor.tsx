"use client";

import { useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import "quill/dist/quill.snow.css";
import { uploadImage } from "@/lib/image-upload";
import { Loader2 } from "lucide-react";

// Dynamically import useQuill to avoid SSR issues
const DynamicQuill = dynamic(
  async () => {
    const { useQuill } = await import("react-quilljs");

    const QuillWrapper = ({
      forwardedRef,
      ...props
    }: {
      forwardedRef?: React.RefObject<any>;
      [key: string]: any;
    }) => {
      const { quill, quillRef } = useQuill(props);

      useEffect(() => {
        if (quill && forwardedRef) {
          forwardedRef.current = quill;
        }
      }, [quill, forwardedRef]);

      return <div ref={quillRef} />;
    };

    QuillWrapper.displayName = "DynamicQuillComponent";
    return QuillWrapper;
  },
  {
    ssr: false,
    loading: () => (
      <div className="h-64 flex items-center justify-center border rounded-md">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="sr-only">Loading editor...</span>
      </div>
    ),
  }
);

/**
 * Custom Quill editor component with image upload support using react-quilljs
 *
 * @param value - The HTML content value
 * @param onChange - Function to handle content changes
 * @param placeholder - Optional placeholder text
 */
export default function QuillEditor({
  value,
  onChange,
  placeholder = "Write your content here...",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const quillInstance = useRef<any>(null);
  const isInitializedRef = useRef(false);

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        ["link", "image"],
        [{ align: [] }],
        ["clean"],
      ],
    },
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    // "bullet",
    "indent",
    "link",
    "image",
    "align",
  ];

  /**
   * Handles custom image uploading inside the Quill editor
   */
  const imageHandler = useCallback(() => {
    if (!quillInstance.current) return;

    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      if (!input.files?.length) return;

      const file = input.files[0];
      const quill = quillInstance.current;
      const range = quill.getSelection(true);

      // Insert temporary uploading placeholder
      quill.insertText(range.index, "Uploading image...", {
        color: "#999",
        italic: true,
      });
      quill.setSelection(range.index + 16);

      try {
        const imageUrl = await uploadImage(file);
        quill.deleteText(range.index, 16);
        quill.insertEmbed(range.index, "image", imageUrl);
        quill.setSelection(range.index + 1);
      } catch (error) {
        console.error("Error uploading image:", error);
        quill.deleteText(range.index, 16);
        quill.insertText(range.index, "Failed to upload image.", {
          color: "red",
          italic: true,
        });
      }
    };
  }, []);

  useEffect(() => {
    const quill = quillInstance.current;
    if (quill && !isInitializedRef.current) {
      isInitializedRef.current = true;

      // Set initial content
      if (value && quill.root.innerHTML !== value) {
        quill.root.innerHTML = value;
      }

      // On text change, update parent
      quill.on("text-change", () => {
        onChange(quill.root.innerHTML);
      });

      // Add custom image handler
      const toolbar = quill.getModule("toolbar");
      toolbar.addHandler("image", imageHandler);
    }
  }, [value, onChange, imageHandler]);

  return (
    <div className="quill-editor">
      <DynamicQuill
        forwardedRef={quillInstance}
        theme="snow"
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
      <style jsx global>{`
        .quill-editor .ql-container {
          min-height: 250px;
          font-size: 16px;
          font-family: inherit;
        }
        .quill-editor .ql-editor {
          min-height: 250px;
          max-height: 600px;
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
}
