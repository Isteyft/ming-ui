import type { Plugin } from "vue";
import { describe, it, expect } from "vitest";
import {
  BaizeAlert,
  BaizeButton,
  BaizeButtonGroup,
  BaizeCollapse,
  BaizeCollapseItem,
  BaizeIcon,
} from "..";
import { get, map } from "lodash-es";

const comps = [
  BaizeAlert,
  BaizeButton,
  BaizeButtonGroup,
  BaizeCollapse,
  BaizeCollapseItem,
  BaizeIcon,
] as Plugin[];

describe("components/index", () => {
  it.each(map(comps, (c) => [get(c, "name") ?? "", c]))(
    "%s should be exported",
    (_, component) => {
      expect(component).toBeDefined();
      expect(component.install).toBeDefined();
    }
  );
});