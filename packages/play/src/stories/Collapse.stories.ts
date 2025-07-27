import type { Meta, StoryObj } from "@storybook/vue3";
import { BaizeCollapse, BaizeCollapseItem } from "baize-ui";
import "baize-ui/dist/theme/Collapse.css";

type Story = StoryObj<typeof BaizeCollapse>;

const meta: Meta<typeof BaizeCollapse> = {
  title: "Components/Collapse",
  component: BaizeCollapse,
  subcomponents: { BaizeCollapseItem },
  tags: ["autodocs"],
};

export const Default: Story = {
  render: (args) => ({
    components: {
      BaizeCollapse,
      BaizeCollapseItem,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
    <baize-collapse v-bind="args">
      <baize-collapse-item name="a" title="Title a">
        <div>this is content a</div>
      </baize-collapse-item>
      <baize-collapse-item name="b" title="title b">
        <div>this is content b</div>
      </baize-collapse-item>
      <baize-collapse-item name="c" title="title c  disable" disabled>
        <div>this is content c</div>
      </baize-collapse-item>
    </baize-collapse>
    `,
  }),
  args: {
    accordion: true,
    modelValue: ["a"],
  },
};

export default meta;