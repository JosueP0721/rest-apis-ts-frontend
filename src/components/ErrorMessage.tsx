import { PropsWithChildren } from "react";

export default function ErrorMessage({children} : PropsWithChildren) {
    return (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 my-4">
            <p>{children}</p>
        </div>
    )
}