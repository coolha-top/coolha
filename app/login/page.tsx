import { WelcomeToLens } from "./WelcomeToLens";
import Image from 'next/image'
export default function page() {
    return (
        <div className="flex justify-center items-center mx-auto max-w-4xl">


            <div className="card card-compact bg-base-100 shadow-xl sm:max-w-2xl  h-dvh w-dvw">


                <figure> <img src="/lens/Cover04-Text.png" alt="Cover04-Text.png" /></figure>
                <div className="p-4">
                <h2 className="card-title">连接 Lens 登入界面</h2>
                <p>Lens Protocol</p>
                </div>
                <div className="card-body">
                    <WelcomeToLens />
                </div>

            </div>


        </div>
    )
}
