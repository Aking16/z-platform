"use client"

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Moon, Sun, SunMoon } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function LightTheme() {
    const { theme, setTheme } = useTheme();

    function ThemeChanger() {
        if (theme === "light") {
            setTheme("dark")
        } else {
            setTheme("light")
        }
    }

    return (
        <nav className="shadow-md py-2">
            <Container flex justifyBetween>
                <h1 className="text-xl font-bold">Z Platform API Overview</h1>
                <Button
                    variant="secondary"
                    onClick={ThemeChanger}>
                    {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
                </Button>
            </Container>
        </nav>
    )
}