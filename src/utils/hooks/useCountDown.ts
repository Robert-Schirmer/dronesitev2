import { useEffect, useMemo, useState } from 'react';

const useCountDown: (date: Date | null) => string = (date) => {
  const [seconds, setSeconds] = useState(date ? getSecondsUntil(date) : 0);
  const time = useMemo(() => {
    return secondsToTime(seconds);
  }, [seconds]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (!date) {
      setSeconds(0);
    } else {
      setSeconds(getSecondsUntil(date));
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          const newSeconds = prevSeconds - 1;
          return newSeconds <= 0 ? 0 : newSeconds;
        });
      }, 1000);
    }

    return () => {
      interval && clearInterval(interval);
    };
  }, [date]);

  return `${prepend(2, time.d)}D ${prepend(2, time.h)}H ${prepend(2, time.m)}M ${prepend(2, time.s)}S`;
};

export default useCountDown;

const getSecondsUntil = (releaseDate: Date): number => {
  const seconds = (releaseDate.getTime() - new Date().getTime()) / 1000;
  return seconds > 0 ? Math.round(seconds) : 0;
};

const prepend = (length: number, value: string | number): string => {
  let _value = value.toString();
  while (_value.length < length) {
    _value = '0' + _value;
  }

  return _value;
};

// secs should not have decimals
const secondsToTime = (secs: number): { d: number; h: number; m: number; s: number } => {
  const d = Math.floor(secs / (60 * 60 * 24));

  const hours_divide = secs % (60 * 60 * 24);

  const h = Math.floor(hours_divide / (60 * 60));

  const minutes_divide = secs % (60 * 60);
  const m = Math.floor(minutes_divide / 60);

  const s = minutes_divide % 60;

  return {
    d,
    h,
    m,
    s,
  };
};
