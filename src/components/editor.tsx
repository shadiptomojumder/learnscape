"use client";
import { useMemo } from "react";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";



export const Editor: React.FC<{ onChange: (value: string) => void; value: string }> = ({ onChange, value }) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  return (
    <div className="bg-white">
      <ReactQuill theme="snow" value={value} onChange={onChange} />
    </div>
  );
};
