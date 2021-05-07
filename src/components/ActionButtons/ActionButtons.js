import { useState, useCallback, useMemo } from 'react';
import Subtitle from '../Subtitle';
import { Modal, Button } from 'react-bootstrap';
import { useBattle } from '../../lib/hooks/useBattle';
import messages from './messages';

const ActionButtons = () => {
  const {
    levels,
    currentLevelId,
    imageMatching,
    isLoadingLevel,
    setCurrentLevelId,
    submitCurrentSolution,
    setMatchingValue,
    getMatchingValue,
  } = useBattle();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState(undefined);
  const [showNextButton, setShowNextButton] = useState(true);

  const currentIndex = useMemo(() => {
    const levelData = levels?.find(({ id }) => id === currentLevelId);
    return levels?.indexOf(levelData);
  }, [currentLevelId, levels]);

  const handleSubmitCurrentSolution = async () => {
    const matchingValue = await submitCurrentSolution();
    setMatchingValue(`${matchingValue}%`);
    if (matchingValue < 90) {
      setMessage(messages('low'));
    } else if (matchingValue < 97) {
      setMessage(messages('good'));
    } else {
      setMessage(messages('high'));
    }
    if (levels.length <= currentIndex + 1) {
      setShowNextButton(false);
    } else {
      setShowNextButton(true);
    }
    setShow(true);
  };

  const goToNextChallenge = useCallback(() => {
    const nextLevelId = levels[currentIndex + 1].id;
    setCurrentLevelId(nextLevelId);
    setShow(false);
  }, [levels, currentIndex, setCurrentLevelId]);

  return (
    <>
      <Subtitle title='Actions' />
      <div className="d-flex justify-content-between mt-3">
        <button
          type="button"
          className="btn btn-light btn-md"
          onClick={getMatchingValue}
          disabled={isLoadingLevel}
        >
          Check matching
        </button>
        <button
          type="button"
          className="btn btn-warning btn-md"
          onClick={handleSubmitCurrentSolution}
          disabled={isLoadingLevel}
        >
          Submit solution!
        </button>
      </div>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Solution saved!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 className="text-center text-info">Image matching {imageMatching}</h4>
          <h5 className="mt-5 text-center">{message}</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            {showNextButton ? 'Stay here' : 'Close'}
          </Button>
          {showNextButton && (
            <Button variant="primary" onClick={goToNextChallenge}>
              Next challenge
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ActionButtons;
