import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { makeInstaller } from "@baize-ui/utils";
import components from "./components";
import printLogo from "./printLogo";
import '@baize-ui/theme/index.css'

printLogo()

library.add(fas);
const installer = makeInstaller(components);

export * from "@baize-ui/components";
export default installer;