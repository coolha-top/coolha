'use client'

export default function ChatPage() {
    const chatData = [
        { name: 'John', message: 'Hello! How are you?' },
        { name: 'You', message: 'I am fine, thank you!' },
        { name: 'John', message: 'That`s great to hear.' },
    ];

    return (
        <>
            {chatData.map((chat, index) => (
                <div key={index} className="flex p-4  bg-base-100 hover:bg-[--link-hover-background]">

                    <div className="flex-none w-14">
                        <img src="https://via.placeholder.com/50" alt={chat.name} />
                    </div>

                    <div className="flex-auto">
                        <p className="font-bold">{chat.name}:</p>
                        <p className="text-[--navlink-color] truncate ...">{chat.message}</p>
                    </div>

                    <div className="truncate ... text-sm text-gray-500">
                        <p>23:00</p>
                    </div>

                </div>
            ))}
        </>
    );
}