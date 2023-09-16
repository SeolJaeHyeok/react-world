import cn from 'classnames';
import { MouseEventHandler, PropsWithChildren } from 'react';

import styles from './button.module.scss';
import { TBtnColor, TReturnComponent, TSize } from '../types/common';

interface Props extends PropsWithChildren {
    className?: string;
    type?: 'button' | 'submit';
    onClick?: MouseEventHandler<HTMLButtonElement>;
    processing?: boolean;
    color?: TBtnColor;
    size?: TSize;
    width?: number;
    height?: number;
}

function Button({
    children,
    className,
    onClick,
    processing,
    type = 'button',
    color = 'primary',
    size = 'medium',
    width,
    height,
}: Props): TReturnComponent {
    return (
        <button
            style={{ width, height }}
            type={type}
            className={cn(
                styles.wrap,
                styles[color],
                styles[size],
                processing && styles.active,
                className,
            )}
            onClick={onClick}
            disabled={!!processing}
        >
            {processing ? (
                <span className={styles.spinner}></span>
            ) : (
                <span>{children}</span>
            )}
        </button>
    );
}

export default Button;
