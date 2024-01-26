import React from "react";

type Props = {
  text: string;
};

export default function Tag({ text }: Props) {
  return (
    <div>
      <span className="uppercase bg-primary py-1 px-3 text-white inline-block rounded-md text-sm self-center my-2">
        {text}
      </span>
    </div>
  );
}
