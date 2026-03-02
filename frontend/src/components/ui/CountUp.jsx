import { useEffect, useRef, useState } from 'react';
import { useInView, useSpring, useMotionValue } from 'framer-motion';

const CountUp = ({ value, suffix = '', duration = 2 }) => {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000 });
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    springValue.on('change', (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return (
    <span ref={ref} className="stats-number">
      {displayValue}{suffix}
    </span>
  );
};

export default CountUp;
