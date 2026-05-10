import React from 'react';
import type { ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { DashBoardHeader } from '@site/src/components/SummaryStatistics/DashBoardHeader';
import { ChartsDash } from '@site/src/components/SummaryStatistics/ChartsDash';
import BrowserOnly from '@docusaurus/BrowserOnly';

const DashBoardPage = (): ReactNode => {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Review wastewater sampling data and procedures"
    >
      <DashBoardHeader />
      <BrowserOnly fallback={<div>Loading...</div>}>
        {() => <ChartsDash/>}
      </BrowserOnly>
    </Layout>
  );
};

export default DashBoardPage;
