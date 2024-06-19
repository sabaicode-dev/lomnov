import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import SignupForm from "./SignupForm";

export default {
  title: "Components/SignupForm",
  component: SignupForm,
  argTypes: {
    initialData: { control: "object" },
    onSubmit: { action: "submitted" },
  },
} as Meta<typeof SignupForm>;

const Template: StoryFn<typeof SignupForm> = (args) => <SignupForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  initialData: { username: "", fullname: "", email: "", password: "" },
};
