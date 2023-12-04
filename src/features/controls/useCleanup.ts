import { clearControls } from './controls-slice';
import { useAppDispatch } from 'store';

export const useCleanup = () => {
  const dispatch = useAppDispatch();
  return () => dispatch(clearControls());
};
