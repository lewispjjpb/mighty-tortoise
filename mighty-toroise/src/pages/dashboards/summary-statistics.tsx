import React from 'react';
import type {ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';
import clsx from "clsx";
import styles from "@site/src/pages/index.module.css";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import {DashBoardHeader} from "@site/src/components/SummaryStatistics/DashBoardHeader";
import {ChartsDash} from "@site/src/components/SummaryStatistics/ChartsDash";

const DashBoardPage = (): ReactNode => {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
    title={`Hello from ${siteConfig.title}`}
    description="Description will go into a meta tag in <head />">
    <DashBoardHeader />
    <ChartsDash />
  </Layout>
  )
}

export default DashBoardPage;