/*
  645 - Diff
  -------
  by ZYSzys (@ZYSzys) #medium #object

  ### Question

  Get an `Object` that is the difference between `O` & `O1`

  > View on GitHub: https://tsch.js.org/645
*/

/* _____________ Your Code Here _____________ */

type MyExclude1<S extends string | number | symbol, T extends S> = keyof {
  [V in S as (V extends T ? never : V)]: string
}

type MyExcludeOfficial<T, U> = T extends U ? never : T

type Same<O extends Object, O1 extends Object> = {
  [V in keyof O as (V extends keyof(O1) ? V : never)]: O[V]
}
type DiffKeys<O extends Object, O1 extends Object> = MyExcludeOfficial<(keyof O | keyof O1), keyof Same<O, O1>>
type Diff<O extends Object, O1 extends Object> = {
  [V in DiffKeys<O, O1>]: V extends keyof O ? O[V] : (V extends keyof O1 ? O1[V] : never)
}

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Foo = {
  name: string
  age: string
}
type Bar = {
  name: string
  age: string
  gender: number
}
type Coo = {
  name: string
  gender: number
}

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string, gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string, gender: number }>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/645/answer
  > View solutions: https://tsch.js.org/645/solutions
  > More Challenges: https://tsch.js.org
*/
