export default function Avatar({src,alt}) {
    return (
        <div className="py-[4px] ">
            <img className="w-10 h-10 rounded-full border border-base-content" src={src} alt={alt}/>
        </div>
    )
}