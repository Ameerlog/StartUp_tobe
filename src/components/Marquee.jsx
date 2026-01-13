// components/MarqueeRow.jsx
import React from "react";
import Marquee from "react-fast-marquee";

export default function MarqueeRow({
  data,
  renderItem,
  speed = 25,
  direction = "left",
}) {
  return (
    <Marquee speed={speed} direction={direction} gradient={false}
    pauseOnHover={true}>
      {data.map((item, index) => (
        <div key={index}>{renderItem(item)}</div>
      ))}
    </Marquee>
  );
}
