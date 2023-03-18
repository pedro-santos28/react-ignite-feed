import styles from './Avatar.module.css'

export interface AvatarProps {
    hasBorder?: boolean;
}

export function Avatar({hasBorder = true} : AvatarProps){
    return (
        <img className={hasBorder ? styles.avatarWithBorder : styles.AvatarWithNoBorder} src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&"/>
    );
}