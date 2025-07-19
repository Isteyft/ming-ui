import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { makeInstaller } from "@ming-ui/utils";
import components from "./components";
import '@ming-ui/theme/index.css'

library.add(fas);
const installer = makeInstaller(components);

export * from "@ming-ui/components";
export default installer;