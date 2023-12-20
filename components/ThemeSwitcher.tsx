"use client"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { MoonStar, Sun, SunMoon } from "lucide-react"
import { useTheme } from "next-themes"

interface ThemeSwitcherProps {
    forMenu?: boolean
}

export function ThemeSwitcher({ forMenu }: ThemeSwitcherProps) {
    const { theme, setTheme } = useTheme();

    return (
        <Select defaultValue={theme} onValueChange={(value: string) => setTheme(value)}>
            <SelectTrigger className={`${forMenu ? "w-fit gap-x-4 border p-2" : "w-full"}`}>
                <SelectValue placeholder="Theme" className="flex" />
            </SelectTrigger>
            <SelectContent side="top">
                <SelectItem value="light">
                    <div className="flex items-center">
                        <Sun size={18}></Sun>
                        <span className="ms-4"> Light </span>
                    </div>
                </SelectItem>
                <SelectItem value="dark">
                    <div className="flex items-center">
                        <MoonStar size={18} />
                        <span className="ms-4"> Dark </span>
                    </div>
                </SelectItem>
                <SelectItem value="system">
                    <div className="flex items-center">
                        <SunMoon size={18} />
                        <span className="ms-4"> System </span>
                    </div>
                </SelectItem>
            </SelectContent>
        </Select>
    )
}
