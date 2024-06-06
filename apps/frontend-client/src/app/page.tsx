
import { Button } from 'ms-ui-components'
import logger, { loggerBeautifulObject } from '@utils/logger';

export default function Home() {
  logger('hello')
  loggerBeautifulObject({
    foo: 'bar',
    'arr': [1, 2, 3],
    nested: {
      hello: "world"
    }
  })
  return (
    <main className="flex  flex-col  justify-between p-24">

    </main>
  );
}
