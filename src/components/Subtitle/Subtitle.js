import styles from './Subtitle.module.scss';

const Subtitle = ({ title }) => (
  <div className={styles.subtitle}>
    <p>{title}</p>
    <hr />
  </div>
)

export default Subtitle;
