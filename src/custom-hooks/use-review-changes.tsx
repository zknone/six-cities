import { useCallback, useEffect, useState } from 'react';
import { EMPTY_LINE, EMPTY_RATING, Status } from '../const';
import { useAppDispatch } from '../redux-hooks';
import { setCommentStatus } from '../store/app-data/app-data';
import { getCommentStatus } from '../store/app-data/selectors';
import { useAppSelector } from '../redux-hooks';


function useReviewChanges () {
  const dispatch = useAppDispatch();
  const commentStatus = useAppSelector(getCommentStatus);

  const [review, setReview] = useState({
    comment: EMPTY_LINE,
    rating: EMPTY_RATING,
  });

  const chooseStar = useCallback ((event: React.MouseEvent<HTMLInputElement>) => {
    const stars = parseInt((event.target as HTMLInputElement).value, 10);
    setReview({
      ...review,
      rating: stars,
    });
  }, [review]);


  function changeText(event: React.ChangeEvent<HTMLTextAreaElement>){
    const text: string = event.target.value;
    setReview({
      ...review,
      comment: text,
    });
  }

  useEffect(() => {
    if (commentStatus === Status.Success) {
      setReview({...review, comment: EMPTY_LINE, rating: EMPTY_RATING});
      dispatch(setCommentStatus(Status.Idle));
    }
  }, [review, setReview, dispatch, commentStatus]);

  return [changeText, chooseStar, review];
}


export default useReviewChanges;
