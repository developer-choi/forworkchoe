import {Button} from '@forworkchoe/core/components';
import {range} from '@forworkchoe/core/utils';

export default function Page() {
  return (
    <Button>{range(1, 2).join(',')}</Button>
  );
}
