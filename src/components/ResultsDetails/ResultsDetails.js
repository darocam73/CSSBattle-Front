import Iframe from './Iframe';
import Subtitle from '../Subtitle';
import styles from './ResultsDetails.module.scss';

const ResultsDetails = ({ scores, onClose }) => {
  const getImageUrl = (filename) => (
    `${process.env.REACT_APP_IMAGES_URL}/${filename}`
  );

  return (
    <>
      <Subtitle title={unescape(scores[0]?.username)} />
      <div className="w-100 d-flex justify-content-between">
        <p className="h6 text-light">DETAILS</p>
        <button
          type="button"
          className="btn btn-link mx-0 px-0 text-light mb-3"
          onClick={onClose}
        >
          [ X ] Close
        </button>
      </div>
      {scores?.map(({
        id,
        html,
        css,
        image,
        matching,
        points,
        htmlLengthSolution,
        cssLengthSolution,
        htmlLength,
        cssLength,
      }) => (
        <div className="container-fluid mb-5" key={id}>
          <div className="row">
            <Iframe html={unescape(html)} css={unescape(css)} />
            <div className={styles['target-image']}>
              {image && <img src={getImageUrl(image)} alt="target" />}
            </div>
            <ul className="list-group mt-2" style={{ width: '400px' }}>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <span>Image matching: <strong>{matching}%</strong></span>
                <span>{points.matchingPoints || 0}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <span>
                  HTML length: <strong>{htmlLengthSolution}</strong> characters <small>(max {htmlLength})</small>
                </span>
                <span>{points.htmlPoints || 0}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <span>
                  CSS length: <strong>{cssLengthSolution}</strong> characters <small>(max {cssLength})</small>
                </span>
                <span>{points.cssPoints || 0}</span>
              </li>
              {points.bonus && (
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Bonus
                  <span>{points.bonus || 0}</span>
                </li>
              )}
              <li className="list-group-item d-flex justify-content-between align-items-center bg-warning">
                <strong>Total</strong>
                <strong><span>{points.total || 0}</span></strong>
              </li>
            </ul>
          </div>
        </div>
      ))}
    </>
  );
}

export default ResultsDetails;
