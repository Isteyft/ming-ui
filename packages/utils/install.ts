import type { App, Plugin } from "vue";
import { each } from "lodash-es";

// 定义一个类型 SFCWithInstall，它是一个联合类型，表示一个组件既可以是一个 Vue 组件，也可以是一个 Vue 插件
type SFCWithInstall<T> = T & Plugin;

// 定义一个函数 makeInstaller，用于创建一个插件安装函数（传值也是plugin插件
export function makeInstaller(components: Plugin[]) {
  //给每个plugin遍历并且use他，就不用一个个use
  const install = (app: App) =>
    each(components, (c) => {
      app.use(c);
    });

  return install;
}

// 定义一个泛型函数 withInstall，用于为 Vue 组件添加 install 方法
export const withInstall = <T>(component: T) => {
  //断言component为SFCWithInstall类型
  (component as SFCWithInstall<T>).install = (app: App) => {
    //用组件里面的name，如果没有就给一个默认值
    const name = (component as any)?.name || "UnnamedComponent";
    //注册组件，然后传承组件名，组件
    app.component(name, component as SFCWithInstall<T>);
  };
  // 返回注册过的组件
  return component as SFCWithInstall<T>;
};
