import Image from 'next/image';

interface LogoProps {
    size: number
}

export const Logo:React.FC<LogoProps> = ({size}) => {
    return (
        <>
            <Image priority src={"/z-light.svg"} alt="Z logo" width={size} height={size} loading="eager" className="hidden md:block dark:hidden" />
            <Image priority src={"/z-dark.svg"} alt="Z logo" width={size} height={size} loading="eager" className="hidden md:dark:block" />
        </>
    )
}

export default Logo;