import React from "react";

type Props = {};

export default function Map({}: Props) {
  return (
    <div style={{ width: "100%" }}>
      <iframe
        width="100%"
        height="500"
        src="https://maps.google.com/maps?width=100%25&amp;height=300&amp;hl=en&amp;q=Bangkok&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
      ></iframe>
    </div>
  );
}
