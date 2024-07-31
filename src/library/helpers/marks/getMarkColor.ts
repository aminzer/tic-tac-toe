import { Mark } from '@app/constants';
import { Theme } from '../../design';

const getMarkColor = ({
  mark,
  type = 'default',
  theme,
}: {
  mark?: Mark | null;
  type?: 'default' | 'dark';
  theme: {
    palette: Pick<Theme['palette'], 'marks'>;
  };
}): string => {
  return theme.palette.marks[mark === Mark.CROSS ? 'cross' : 'nought'][type];
};

export default getMarkColor;
