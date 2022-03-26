import { useEffect, useState } from 'react';

/*
 * Add moving dots to the end of text
 */
const useLoadingText = (text: string): string => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    setTitle(text);
    const interval = setInterval(() => {
      setTitle((prevTitle) => {
        if (prevTitle.length > text.length + 6) {
          return text;
        }
        return ' ' + prevTitle + '.';
      });
    }, 300);

    return () => {
      clearInterval(interval);
    };
  }, [text]);

  return title;
};

export default useLoadingText;
