import { IBlogEntryMetaData } from "../IBlogEntryMetaData";
import "./BlogEntryCard.css";

export function BlogEntryCard(metaData: IBlogEntryMetaData): JSX.Element {
    const { title, date, description, author } = metaData;

    return (
        <div className="blog-entry-card">
            <div className="blog-entry-card-title-date">
                <div className="blog-entry-card-title">{title}</div>
                <div className="blog-entry-card-date">{date}</div>
            </div>
            <div className="blog-entry-card-description">{description}</div>
            <div className="blog-entry-card-author">{author}</div>
        </div>

    );
}