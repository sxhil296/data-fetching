"use client";
import { useFormStatus } from "react-dom";

export default function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded cursor-pointer text-white"
      disabled={pending}
    >
      {pending ? "Loading..." : "Submit"}
    </button>
  );
}
