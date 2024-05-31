export default function Avatar({src,alt}) {
    return (
        <div>
            <img className="w-10 h-10 rounded-full" src={src} alt={alt}/>
        </div>
    )
}