import React, { useState, useEffect } from "react";
import { CardInterface } from "../../types";

interface UseActiveCategoryProps {
  cards: CardInterface[];
  sectionRefs: React.MutableRefObject<{ [key: string]: HTMLElement | null }>;
}

export const useActiveCategory = ({
  cards,
  sectionRefs,
}: UseActiveCategoryProps) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      const visibleSection = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visibleSection) {
        setActiveCategory(visibleSection.target.id);
      }
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    Object.values(sectionRefs.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [cards, sectionRefs]);

  return { activeCategory, setActiveCategory };
};
