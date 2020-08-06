import React, { TextareaHTMLAttributes } from 'react';

import './styles.css';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: string;
    label: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, name, ...rest }) => (
    <div className="textarea-block">
        <label htmlFor={name}>{label}</label>
        <textarea name={name} id={name} {...rest} />
    </div>
);
