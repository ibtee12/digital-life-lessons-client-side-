import { useEffect } from 'react';

export const useDocumentTitle = (title) => {
  useEffect(() => {
    const prevTitle = document.title;
    if (title) {
      document.title = `${title} — Digital Life Lessons`;
    } else {
      document.title = 'Digital Life Lessons — Premium Wisdom Sharing Platform';
    }

    return () => {
      document.title = prevTitle;
    };
  }, [title]);
};
