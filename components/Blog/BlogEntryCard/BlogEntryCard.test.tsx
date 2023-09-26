import { render, screen } from "@testing-library/react";
import { BlogEntryCard } from "./BlogEntryCard";
import { IBlogEntryMetaData } from "../IBlogEntryMetaData";

describe("BlogEntryCard", () => {
    const blogEntryMetaData: IBlogEntryMetaData = {
        title: "Test Blog Entry",
        date: "2022-01-01",
        description: "This is a test blog entry",
        author: "John Doe",
    };

    it("renders the title and date", () => {
        render(<BlogEntryCard {...blogEntryMetaData} />);
        const titleElement = screen.getByText(blogEntryMetaData.title);
        const dateElement = screen.getByText(blogEntryMetaData.date);
        expect(titleElement).toBeInTheDocument();
        expect(dateElement).toBeInTheDocument();
    });

    it("renders the description", () => {
        render(<BlogEntryCard {...blogEntryMetaData} />);
        const descriptionElement = screen.getByText(blogEntryMetaData.description);
        expect(descriptionElement).toBeInTheDocument();
    });

    it("renders the author", () => {
        render(<BlogEntryCard {...blogEntryMetaData} />);
        const authorElement = screen.getByText(blogEntryMetaData.author);
        expect(authorElement).toBeInTheDocument();
    });
});