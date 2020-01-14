import { useContext, useEffect, useRef, useState } from 'react';
import FirebaseContext from './contexts';

const useQuestion = () => {
  const [question, setQuestion] = useState('');
  const [loadingQuestion, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const functionsRef = useRef(useContext(FirebaseContext));
  const { f } = functionsRef.current;
  if (!f) throw new Error('Functions is not initialized');

  useEffect(() => {
    setLoading(true);
    const questionFunction = f.httpsCallable('question');
    try {
      questionFunction()
        .then(result => {
          setQuestion(result.data);
          setError(null);
        })
        .catch((err: Error) => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (err) {
      console.error(err);
      setError(err);
    }
  }, [f]);

  return { question, loadingQuestion, error };
};

export default useQuestion;
