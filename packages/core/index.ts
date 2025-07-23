import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { makeInstaller } from "@baize-ui/utils";
import components from "./components";
import '@baize-ui/theme/index.css'

library.add(fas);
const installer = makeInstaller(components);

export * from "../components";
export default installer;