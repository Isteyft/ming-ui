// 引入 Vue 的相关类型
import type { App, Plugin } from "vue";
// 引入 lodash 的 each 方法，用于遍历数组
import { each } from "lodash-es";

// 定义一个类型 SFCWithInstall，它是一个联合类型，表示一个组件既可以是一个 Vue 组件，也可以是一个 Vue 插件
type SFCWithInstall<T> = T & Plugin;

// 定义一个函数 makeInstaller，用于创建一个插件安装函数
export function makeInstaller(components: Plugin[]) {
  // 定义 install 函数，它接收一个 Vue 应用实例 app
  const install = (app: App) =>
    // 使用 lodash 的 each 方法遍历传入的 components 数组
    each(components, (c) => {
      // 对每个组件调用 app.use 方法，将其注册为 Vue 插件
      app.use(c);
    });

  // 返回 install 函数
  return install;
}

// 定义一个泛型函数 withInstall，用于为 Vue 组件添加 install 方法
export const withInstall = <T>(component: T) => {
  // 将 component 断言为 SFCWithInstall<T> 类型
  (component as SFCWithInstall<T>).install = (app: App) => {
    // 获取组件的名称，如果组件没有定义 name 属性，则默认为 "UnnamedComponent"
    const name = (component as any)?.name || "UnnamedComponent";
    // 使用 app.component 方法将组件注册到 Vue 应用中
    app.component(name, component as SFCWithInstall<T>);
  };
  // 返回经过处理的组件
  return component as SFCWithInstall<T>;
};
