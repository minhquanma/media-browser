import { useState, useEffect, useRef } from "react";

// TODO: Add useManual boolean to implement manual load feature
export const useInfiniteScroll = ({ inputList = [], endRef, count }) => {
  const [list, setList] = useState([]);
  const loadedIndex = useRef(0);
  const loadedLength = useRef(list.length);
  const inputLength = useRef(inputList.length);

  useEffect(() => {
    // Observe the end of the list
    if (!endRef) return;

    const observer = new IntersectionObserver(
      (entries, observer) => {
        for (const entry of entries) {
          // Load more articles;
          if (entry.isIntersecting) {
            if (loadedLength.current < inputLength.current) {
              appendList();
            } else {
              observer.unobserve(endRef.current);
            }
          }
        }
      },
      {
        threshold: 1,
      }
    );
    observer.observe(endRef.current);

    // Initial loads
    appendList(true);
  }, []);

  //   useEffect(() => {
  //     loadedLength.current = list.length;
  //     console.log("Loaded: " + loadedLength.current);
  //   }, [list]);

  //   useEffect(() => {
  //     loadedLength.current = 0;
  //     loadedIndex.current = 0;

  //     appendList(true);
  //   }, [inputList]);

  const appendList = (isInit) => {
    if (isInit) {
      setList([...inputList.slice(0, count)]);
    } else {
      setList((list) => {
        return [
          ...list,
          ...inputList.slice(loadedIndex.current, loadedIndex.current + count),
        ];
      });
    }

    loadedIndex.current += count;
  };
  return { list, isFullyLoaded: list.length === inputList.length };
};
