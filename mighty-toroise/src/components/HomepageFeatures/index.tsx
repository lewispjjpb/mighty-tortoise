import type { ReactNode, ComponentType, ComponentProps } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

type FeatureItem = {
  title: string;
  Svg: ComponentType<ComponentProps<'svg'>>;
  description: ReactNode;
  link?: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Summary Dashboard',
    Svg: require('@site/static/img/virus-svgrepo-com.svg').default,
    description: <>View recent statistics on Influenza A</>,
    link: '/dashboards/summary-statistics',
  },
  {
    title: 'Documentation and Requirements',
    Svg: require('@site/static/img/docs-svgrepo-com.svg').default,
    description: <>Check out the documentation and requirements for sample collection</>,
    link: '/docs/category/operating-references',
  },
];

function Feature({ title, Svg, description, link }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
      {Boolean(link) && (
        <div className="text--center">
          <Link className="button button--secondary button--lg" to={link}>
            View
          </Link>
        </div>
      )}
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
