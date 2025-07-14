import { makeInstaller } from "@ming-ui/utils";
import components from "./components";
import '@ming-ui/theme/index.css'

const installer = makeInstaller(components);

export * from "@ming-ui/components";
export default installer;