'use client'
import { RiMoonLine, RiSunLine,RiMoonClearLine  } from "react-icons/ri";
import { useTheme } from "next-themes"

export default function ThemeSwap() {
    const { theme, setTheme } = useTheme();
    return (
        <>
            <aside className="items-center grid-flow-col ">
                <label className="swap swap-rotate justify-center ">
                    <input type="checkbox" className="theme-controller" value="synthwave" />

                    <RiSunLine className="swap-on fill-current w-6 h-6" onClick={() => setTheme('dark')} />

                    <RiMoonClearLine  className="swap-off fill-current w-6 h-6" onClick={() => setTheme('light')} />

                </label>
            </aside>
        </>
    )
}