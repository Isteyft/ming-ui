import Button from './Button.vue'
import ButtonGroup from './ButtonGroup.vue'
import { withInstall } from '@baize-ui/utils'

//注册组件
export const BaizeButton = withInstall(Button)
export const BaizeButtonGroup = withInstall(ButtonGroup)

export * from "./types";