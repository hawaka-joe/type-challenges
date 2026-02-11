/*
  3196 - Flip Arguments
  -------
  by jiangshan (@jiangshanmeta) #medium #arguments

  ### Question

  Implement the type version of lodash's ```_.flip```.

  Type ```FlipArguments<T>``` requires function type ```T``` and returns a new function type which has the same return type of T but reversed parameters.

  For example:

  ```typescript
  type Flipped = FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void>
  // (arg0: boolean, arg1: number, arg2: string) => void
  ```

  > View on GitHub: https://tsch.js.org/3196
*/

/* _____________ Your Code Here _____________ */

type Reverse<T extends unknown[]> = T extends [infer L, ...infer R] ? [...Reverse<R>, L] : []

// type FlipArguments<T extends Function> = T extends ((... infer Args) => infer R) ? (...Reverse<Args> => R) : never;
type FlipArguments<T extends Function> = T extends ((...args: infer Args) => infer R) ? (...args: Reverse<Args>) => R : never

/* _____________ What I've learned _____________ */
/*
  type FlipArguments<T extends Function> = T extends ((... infer Args) => infer R) ? (...Reverse<Args> => R) : never;
  type FlipArguments<T extends Function> = T extends ((...args: infer Args) => infer R) ? (...args: Reverse<Args>) => R : never

  使用 infer 接收函数参数时，应使用...args: infer Args 这种形式
*/

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FlipArguments<() => boolean>, () => boolean>>,
  Expect<Equal<FlipArguments<(foo: string) => number>, (foo: string) => number>>,
  Expect<Equal<FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void>, (arg0: boolean, arg1: number, arg2: string) => void>>,
]

type errors = [
  // @ts-expect-error
  FlipArguments<'string'>,
  // @ts-expect-error
  FlipArguments<{ key: 'value' }>,
  // @ts-expect-error
  FlipArguments<['apple', 'banana', 100, { a: 1 }]>,
  // @ts-expect-error
  FlipArguments<null | undefined>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3196/answer
  > View solutions: https://tsch.js.org/3196/solutions
  > More Challenges: https://tsch.js.org
*/
