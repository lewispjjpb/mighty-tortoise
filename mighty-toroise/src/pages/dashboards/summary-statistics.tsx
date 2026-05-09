import React from 'react';
import type {ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';
import clsx from "clsx";
import styles from "@site/src/pages/index.module.css";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";


const DashBoardHeader = () => {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.smallBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  )
}

const DashBoardPage = (): ReactNode => {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
    title={`Hello from ${siteConfig.title}`}
    description="Description will go into a meta tag in <head />">
    <DashBoardHeader />
    <main>
      asdf
    </main>
  </Layout>
  )
}

export default DashBoardPage;