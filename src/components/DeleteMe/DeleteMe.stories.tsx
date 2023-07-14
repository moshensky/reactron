import type { Meta, StoryObj } from "@storybook/react";
import { DeleteMe } from "../DeleteMe";

const meta = {
  title: "Example/DeleteMe",
  component: DeleteMe,
  tags: ["docsPage"],
  argTypes: {
    title: {
      control: { type: "text" },
    },
    description: {
      control: { type: "text" },
    },
  },
} satisfies Meta<typeof DeleteMe>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Primary: Story = {
  args: {
    title: "Card Title",
    description: "This is a card",
  },
};
