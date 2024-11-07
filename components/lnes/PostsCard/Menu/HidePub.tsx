'use client'
import { AnyPublication, useHidePublication } from '@lens-protocol/react-web';
import { RiDeleteBin7Fill, RiDeleteBin7Line } from 'react-icons/ri';

export default function HidePublicationButton({ publication }: { publication: AnyPublication }) {
    const { execute: hide, loading } = useHidePublication();

    if (publication.isHidden) return <div><RiDeleteBin7Fill className="size-6 " /><span >帖子已隐藏</span></div>;

    return (
        <button onClick={() => hide({ publication })} disabled={loading}>
            <RiDeleteBin7Line className="size-6 text-red-600" /> <span className="text-red-600">隐藏帖子</span>
        </button>
    );
}