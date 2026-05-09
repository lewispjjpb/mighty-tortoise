import { useState, JSX } from 'react'
import clsx from "clsx";
import styles from "@site/src/pages/index.module.css";
import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";

export const DashBoardHeader = () => {
  return (
    <header className={clsx('hero hero--primary', styles.smallBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__subtitle">
          Influenza A at a Glance
        </Heading>
      </div>
    </header>
  )
}