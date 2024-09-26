import { Box, Typography } from '@mui/material';
import React from 'react';
import questionsJson from '../static/questions/questions.json';

class QuestionRecord {
    question: string;
    author: string;

    constructor(question: string, author: string) {
        this.question = question;
        this.author = author;
    }
}

const questions = questionsJson.map((question: any) => new QuestionRecord(question.question, question.author));

const Question = ({ question }: { question: QuestionRecord }) => {
    return <Box sx={{ my: 8 }}>
        <Typography variant="h5" component="blockquote" sx={{ fontStyle: 'italic', marginBottom: 2, textAlign: 'center' }}>
            {question.question}
        </Typography>
        <Typography variant="subtitle1" component="cite" sx={{ display: 'block', textAlign: 'right' }}>
            {question.author}
        </Typography>
    </Box>;
}

export const Questions = () => (
    <Box sx={{ my: 4, maxWidth: '800px', mx: 'auto' }}>
        {questions.map((question, index) => (
            <Question key={index} question={question} />
        ))}
    </Box>
);