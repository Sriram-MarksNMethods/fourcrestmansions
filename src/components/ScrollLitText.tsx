"use client";

import { useRef } from "react";
import {
  motion,
  type MotionValue,
  transform,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

// A paragraph whose words light up (grey -> full colour) one after another as it scrolls
// through the screen, like the "Why FIND" section on findrealestate.com.
// With "reduce motion" turned on the text is simply shown in full colour.
export default function ScrollLitText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduceMotion = useReducedMotion();

  // 0 when the paragraph's top reaches 85% down the screen, 1 when its bottom reaches 45%
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });

  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((word, index) => (
        <Word
          key={index}
          progress={scrollYProgress}
          start={index / words.length}
          end={(index + 1) / words.length}
          still={Boolean(reduceMotion)}
        >
          {word}
        </Word>
      ))}
    </p>
  );
}

function Word({
  children,
  progress,
  start,
  end,
  still,
}: {
  children: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
  still: boolean;
}) {
  // Each word goes from 20% to full opacity during its own small slice of the scroll
  const opacity = useTransform(progress, (p) =>
    transform(p, [start, end], [0.2, 1]),
  );

  return (
    <>
      <motion.span style={still ? undefined : { opacity }}>
        {children}
      </motion.span>{" "}
    </>
  );
}
