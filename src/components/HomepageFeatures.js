import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: '轻松使用',
    Svg: require('../../static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
          AppSpace 提供一键部署方式，提供iOS Android Flutter React-Native等SDK
      </>
    ),
  },
  {
    title: '简单一点',
    Svg: require('../../static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
          AppSpace 专注移动端Bug管理功能，摇一摇直接截图提交
      </>
    ),
  },
  {
    title: '安全靠谱',
    Svg: require('../../static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        AppSpace 私有化部署，更安全 更灵活 支持二次开发
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
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
