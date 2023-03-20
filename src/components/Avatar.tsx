import styles from './Avatar.module.css'
import { ImgHTMLAttributes } from 'react';

export interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
    hasBorder?: boolean;
}

export function Avatar({hasBorder = true, ...props } : AvatarProps){
    return (
        <img 
            className={hasBorder ? styles.avatarWithBorder : styles.AvatarWithNoBorder}
            {...props}
        />
    );
}