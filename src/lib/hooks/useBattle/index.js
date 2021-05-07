import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
} from 'react';
import { getAllLevels, getLevelById } from '../../api/levels';
import { getMatchingImageValue, submitSolution } from '../../api/solutions';

const initialState = {
  htmlCode: '',
  cssCode: '',
  score: 0,
  imageMatching: 'No checked yet...',
  levels: null,
  currentLevelId: null,
  currentLevel: null,
  isLoadingLevel: true,
  battleId: null,
  username: null,
  timer: 0,
};

const BattleContext = createContext(initialState);

BattleContext.displayName = 'BattleContext';

const BattleReducer = (state, action) => {
  switch (action.type) {
    case 'HTML_CODE': {
      return {
        ...state,
        htmlCode: unescape(action.htmlCode),
      };
    }
    case 'CSS_CODE': {
      return {
        ...state,
        cssCode: unescape(action.cssCode),
      };
    }
    case 'LEVELS': {
      return {
        ...state,
        levels: action.levels,
      };
    }
    case 'CURRENT_LEVEL_ID': {
      return {
        ...state,
        currentLevelId: action.currentLevelId,
      };
    }
    case 'CURRENT_LEVEL': {
      return {
        ...state,
        currentLevel: action.currentLevel,
      };
    }
    case 'BATTLE_ID': {
      return {
        ...state,
        battleId: action.battleId,
      };
    }
    case 'MATCHING_VALUE': {
      return {
        ...state,
        imageMatching: action.imageMatching,
      };
    }
    case 'LOADING': {
      return {
        ...state,
        isLoadingLevel: action.isLoadingLevel,
      };
    }
    case 'USERNAME': {
      return {
        ...state,
        username: action.username,
      };
    }
    case 'TIMER': {
      return {
        ...state,
        timer: action.timer,
      };
    }
    default:
      return state;
  }
};

const BattleProvider = (props) => {
  const [state, dispatch] = useReducer(BattleReducer, initialState);

  const setHtmlCode = useCallback((htmlCode) => {
    dispatch({ type: 'HTML_CODE', htmlCode })
  }, []);

  const setCssCode = useCallback((cssCode) => {
    dispatch({ type: 'CSS_CODE', cssCode })
  }, []);

  const setUrlImage = useCallback((urlImage) => {
    dispatch({ type: 'URL_IMAGE', urlImage })
  }, []);

  const setLevels = useCallback((levels) => {
    dispatch({ type: 'LEVELS', levels })
  }, []);

  const setCurrentLevelId = useCallback((currentLevelId) => {
    dispatch({ type: 'CURRENT_LEVEL_ID', currentLevelId })
  }, []);

  const setCurrentLevel = useCallback((currentLevel) => {
    dispatch({ type: 'CURRENT_LEVEL', currentLevel })
  }, []);

  const setBattleId = useCallback((battleId) => {
    dispatch({ type: 'BATTLE_ID', battleId })
  }, []);

  const setMatchingValue = useCallback((imageMatching) => {
    dispatch({ type: 'MATCHING_VALUE', imageMatching })
  }, []);

  const seiIsLoadingLevel = useCallback((isLoadingLevel) => {
    dispatch({ type: 'LOADING', isLoadingLevel })
  }, []);

  const setUsername = useCallback((username) => {
    dispatch({ type: 'USERNAME', username: username ? unescape(username) : null })
  }, []);

  const setTimer = useCallback((timer) => {
    dispatch({ type: 'TIMER', timer })
  }, []);

  const imageUrl = useMemo(() => {
    return `${process.env.REACT_APP_IMAGES_URL}/${state.currentLevel?.image}`;
  }, [state.currentLevel?.image]);

  const getLevel = useCallback(async (id) => {
    seiIsLoadingLevel(true);
    const level = await getLevelById(id);
    setCurrentLevel(level);
    setHtmlCode(level.html || level.initialHtml || '');
    setCssCode(level.css || level.initialCss || '');
    if (typeof level.matching === 'number') {
      setMatchingValue(`${level.matching}%`);
    } else {
      setMatchingValue('No checked yet...');
    }
    seiIsLoadingLevel(false);
  }, [seiIsLoadingLevel, setCssCode, setCurrentLevel, setHtmlCode, setMatchingValue]);

  const getLevels = useCallback(async () => {
    if (!state.battleId) return;
    try {
      const { levels, userName } = await getAllLevels(state.battleId);
      setLevels(levels);
      setUsername(userName);
      if (!state.currentLevelId) {
        setCurrentLevelId(levels[0]?.id);
      }
    } catch (error) {
      console.log('Error getAllLevels', error);
    }
  }, [setCurrentLevelId, setLevels, setUsername, state.battleId, state.currentLevelId]);

  const getMatchingValue = useCallback(async () => {
    try {
      setMatchingValue('loading');
      const { result } = await getMatchingImageValue({
        challengeId: state.currentLevelId,
        html: state.htmlCode,
        css: state.cssCode,
      });
      if (typeof result === 'number') {
        setMatchingValue(`${result}%`)
      }
    } catch (error) {
      console.error('Error analyzing image...', error);
      setMatchingValue('Error! please try again...')
    }
  }, [setMatchingValue, state.cssCode, state.currentLevelId, state.htmlCode]);

  const submitCurrentSolution = useCallback(async () => {
    try {
      const { matchingPercent } = await submitSolution({
        challengeId: state.currentLevelId,
        battleId: state.battleId,
        html: state.htmlCode,
        css: state.cssCode,
      });
      getLevels();
      return matchingPercent;
    } catch (error) {
      console.error('Error saving solution...', error);
    }
  }, [getLevels, state.battleId, state.cssCode, state.currentLevelId, state.htmlCode]);

  return (
    <BattleContext.Provider
      value={{
        ...state,
        imageUrl,
        setHtmlCode,
        setCssCode,
        setUrlImage,
        setCurrentLevelId,
        setCurrentLevel,
        getLevelById,
        setBattleId,
        getMatchingValue,
        setMatchingValue,
        submitCurrentSolution,
        getLevel,
        getLevels,
        setLevels,
        setTimer,
        setUsername,
      }}
      {...props}
    />
  );
};

export const useBattle = () => {
  const context = useContext(BattleContext);
  if (context === undefined) {
    throw new Error('useBattle must be used within a BattleProvider');
  }
  return context;
};

export const ManagedBattleContext = ({ children }) => (
  <BattleProvider>{children}</BattleProvider>
);
