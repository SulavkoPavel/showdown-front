import './button.css'
import './button-container.css'
import './_color/_red/button_color_red.css'
import './_color/_black/button_color_black.css'
import './_type/_primary/button_type_primary.css'
import './_type/_primary-disabled/button_type_primary-disabled.css'
import './_type/_primary-small/button_type_primary-small.css'
import './_type/_secondary/button_type_secondary.css'
import './_type/_tertiary/button_type_tertiary.css'

interface Props {
    text: string;
    styleType?: 'primary' | 'primary-disabled' | 'primary-small' | 'secondary' | 'tertiary';
    color?: 'default' | 'red' | 'black';
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
}

const Button = ({
                    text,
                    styleType = 'primary',
                    color = 'default',
                    onClick,
                    disabled = false,
                    className = ''
                }: Props) => {
    const accentClassName: Map<Props['styleType'], string> = new Map([
        ['primary', 'button_type_primary'],
        ['primary-disabled', 'button_type_primary-disabled'],
        ['primary-small', 'button_type_primary-small'],
        ['secondary', 'button_type_secondary'],
        ['tertiary', 'button_type_tertiary']
    ]);

    const colorClassName: Map<Props['color'], string> = new Map([
        ['default', ''],
        ['red', 'button_color_red'],
        ['black', 'button_color_black']
    ]);

    return (
        <div className={`button-container ${className} `} onClick={onClick}>
            <button
                disabled={disabled}
                type='button'
                className={`button ${accentClassName.get(styleType)} ${colorClassName.get(color)}`}
            >
                {text}
            </button>
        </div>
    )
}

export default Button