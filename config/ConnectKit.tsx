'use client'
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { useTheme } from "next-themes";

export default function ConnectKit({ children }) {
    const { theme } = useTheme();

    return (
        <ConnectKitProvider
            options={{
                language: "zh-CN",
            }}
            mode={theme === 'dark' ? 'dark' : 'light'}
            customTheme={{
                "--ck-accent-color": "#C0E218",
                "--ck-body-color-muted-hover": "#C0E218",
                "--ck-connectbutton-hover-background": "#C0E218",

                //这些是您在打开 ConnectKit 时看到的第一个按钮。
                "--ck-primary-button-hover-color": "#000000",
                "--ck-primary-button-hover-background": "#C0E218",

                //这些是你在打开 ConnectKit 时会看到的第二个按钮，主要用于链接到外部源。
                "--ck-secondary-button-color": "#C0E218",
                "--ck-secondary-button-box-shadow": "0 0 0 1px #000",
                "--ck-secondary-button-hover-color": "#C0E218",
                "--ck-secondary-button-hover-backgroundd": "#C0E218",
                "--ck-secondary-button-hover-box-shadow": "#C0E218",

                //在某些情况下，ConnectKit 需要第三种按钮样式，例如移动设备上的某些按钮。默认情况下，这将继承与 Secondary Button 相同的样式。
                "--ck-tertiary-button-color": "#C0E218",
                "--ck-tertiary-button-box-shadow": "0 0 0 1px #000",
                "--ck-tertiary-button-hover-background": "#C0E218",

                "--ck-primary-button-border-radius": "999",
                "--ck-border-radius": 42,
            }}
        >
            {children}
        </ConnectKitProvider>
    )
}