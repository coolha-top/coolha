export default function PosMusic({type,src}) {
    return (
        <div>
            <audio controls className={`sm:w-[400px] `}>
                <source
                    type={type}
                    src={src}
                />
            </audio>

        </div>
    )
}