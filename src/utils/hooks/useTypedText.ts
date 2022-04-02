import { useEffect, useState } from 'react';

const useTypedText = (text: string, typeSpeed: number = 100): [string, boolean] => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    setTitle('_');
    let interval: ReturnType<typeof setInterval> | null = null;
    const to = setTimeout(() => {
      interval = setInterval(() => {
        setTitle((prevTitle) => {
          if (prevTitle.length === text.length) {
            interval && clearInterval(interval);
            return text;
          }
          return text.substring(0, prevTitle.length) + '_';
        });
      }, typeSpeed);
    }, 300);

    return () => {
      interval && clearInterval(interval);
      clearTimeout(to);
    };
  }, [text, typeSpeed]);

  return [title, text.length === title.length];
};

export default useTypedText;
