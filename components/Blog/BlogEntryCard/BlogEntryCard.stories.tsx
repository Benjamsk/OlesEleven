import { StoryObj } from "@storybook/react";
import { BlogEntryCard } from "./BlogEntryCard";
import { IBlogEntryMetaData } from "../IBlogEntryMetaData";

type Story = StoryObj<typeof BlogEntryCard>;

export const Default: Story = {
    render: (args) => <BlogEntryCard {...args} />,
};

const blogEntryMetaData: IBlogEntryMetaData = {
    title: "This is my title",
    date: "2022-03-24",
    description: "A very long description is needed to state what I actually have done and what I intend to be the consequences of my actions. In order to view it properly, there should be something new, something awesome. Some short sentences. Some long wordswordsowrdsonomatipoeticonwihtout somthing else. !!! This is it.",
    author: "Benjamin",
};

export default {
    title: "Blog/BlogEntryCard",
    component: BlogEntryCard,
    args: blogEntryMetaData,
};