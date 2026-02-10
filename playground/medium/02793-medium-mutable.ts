/*
  2793 - Mutable
  -------
  by jiangshan (@jiangshanmeta) #medium #readonly #object-keys

  ### Question

  Implement the generic ```Mutable<T>``` which makes all properties in ```T``` mutable (not readonly).

  For example

  ```typescript
  interface Todo {
    readonly title: string
    readonly description: string
    readonly completed: boolean
  }

  type MutableTodo = Mutable<Todo> // { title: string; description: string; completed: boolean; }

  ```

  > View on GitHub: https://tsch.js.org/2793
*/

/* _____________ Your Code Here _____________ */

/**
 * 在 TypeScript 中，`Object`（大写 O）是一个非常容易引起混淆的原生类型。要彻底理解它，需要将其放在与 `object`（小写 o）和 `{}`（空对象字面量类型）的对比中来看。

这是衡量一个 AI 模型“编程语言深度理解”能力的经典测试题。

### 1. `Object` (大写 O) —— 包装对象类型
`Object` 描述的是 JavaScript 中 **`Object.prototype` 上的属性和方法**。

 *   **涵盖范围**：它几乎涵盖了除了 `null` 和 `undefined` 之外的所有类型。因为在 JS 中，原始类型（如 string, number）在调用方法时会自动装箱（Boxing）为对象。
 *   **示例**：
    ```typescript
    let obj: Object;
    obj = { a: 1 }; // OK
    obj = "hello";  // OK (因为字符串可以装箱为对象)
    obj = 42;       // OK
    obj = () => {}; // OK
    // obj = null;  // Error
    ```
 *   **缺陷**：它虽然接受广泛的值，但你不能在它上面访问自定义属性。

### 2. `object` (小写 o) —— 非原始类型 (推荐)
这是 TS 2.2 引入的类型，专门用于表示 **“非原始类型”**。

 *   **涵盖范围**：只能是对象、数组、函数。不能是 `string`, `number`, `boolean`, `symbol`, `bigint` 等原始类型。
 *   **示例**：
    ```typescript
    let o: object;
    o = { a: 1 }; // OK
    o = [1, 2];   // OK
    // o = "hello"; // Error
    ```
 *   **使用场景**：常用于 `Object.create(o)` 这种强制要求传入非原始值的场景。

### 3. `{}` (空对象字面量类型)
它在表现上与 `Object`（大写）极其相似。

 *   **核心逻辑**：它表示“任何非 null 且非 undefined 的类型”。
 *   **有趣的点**：在最新的 TS 版本中，`{}` 的行为几乎等同于 `Object`，但在语义上，它更侧重于表达“没有任何自有属性的对象”。

---

### 💡 为什么你应该避开 `Object`？
在工程实践中，**几乎永远不应该显式使用 `Object` 类型**：
1.  **太宽泛**：由于它允许原始类型赋值，无法提供类型的严谨性。
2.  **不直观**：新手容易把它当成“普通对象”来用，结果发现无法访问 `obj.name` 导致困惑。

 *建议做法：**
 *   如果你想表达“任意对象”，使用 `Record<string, any>`。
 *   如果你想表达“非原始类型”，使用 `object`。

 */

type Mutable<T extends object> = {
  - readonly [K in keyof T]: T[K];
}

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

interface Todo1 {
  title: string
  description: string
  completed: boolean
  meta: {
    author: string
  }
}

type List = [1, 2, 3]

type cases = [
  Expect<Equal<Mutable<Readonly<Todo1>>, Todo1>>,
  Expect<Equal<Mutable<Readonly<List>>, List>>,
]

type errors = [
  // @ts-expect-error
  Mutable<'string'>,
  // @ts-expect-error
  Mutable<0>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2793/answer
  > View solutions: https://tsch.js.org/2793/solutions
  > More Challenges: https://tsch.js.org
*/
