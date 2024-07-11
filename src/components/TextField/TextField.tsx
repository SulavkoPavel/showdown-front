import React from 'react'
import './text-field.css'
import './__label/text-field__label.css'
import './__input/text-field__input.css'
import './__input/_status/_error/text-field__input_status_error.css';
import './_status/_error/text-field_status_error.css'

export interface TextFieldProps {
    id?: string;
    value: string;
    onValueChange: (value: string) => void;
    label: string;
    placeholder?: string;
    inputType?: 'text' | 'password';
    styleStatus?: 'default' | 'error';
    className?: string;
}

const TextField = ({
                       id,
                       value,
                       onValueChange,
                       label,
                       placeholder,
                       inputType = 'text',
                       styleStatus = 'default',
                       className = '',
                   }: TextFieldProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onValueChange(event.target.value);
    };

    const styleStatusDivClassName: Map<TextFieldProps['styleStatus'], string> = new Map([
        ['default', ''],
        ['error', 'text-field_status_error'],
    ]);

    const styleStatusInputClassName: Map<TextFieldProps['styleStatus'], string> = new Map([
        ['default', ''],
        ['error', 'text-field__input_status_error'],
    ]);

    return (
        <div className={`text-field ${className} ${styleStatusDivClassName.get(styleStatus)}`}>
            <input
                className={`text-field__input ${styleStatusInputClassName.get(styleStatus)}`}
                type={inputType}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
            />
            <label
                className='text-field__label'
                htmlFor={id}>
                {label}
            </label>
        </div>
    )
}

export default TextField