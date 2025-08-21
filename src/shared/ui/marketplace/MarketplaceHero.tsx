import React from "react";
import styles from "./MarketplaceHero.module.css";

export type MarketplaceHeroProps = {
  backgroundImageUrl?: string;
  children?: React.ReactNode;
};

export const MarketplaceHero: React.FC<MarketplaceHeroProps> = ({
  backgroundImageUrl = "https://images.unsplash.com/photo-1659115516377-25ed306a3551?w=2560&q=80",
  children,
}) => {
  return (
    <section
      className={`${styles.section} pt-20`}
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div className="max-w-6xl mr-auto ml-auto pt-12 pr-6 pb-12 pl-6">
        {children}
      </div>
    </section>
  );
};


