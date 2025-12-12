import clsx from "clsx"
import type React from "react"
import { twMerge } from "tailwind-merge"

type InputChildProps<T = string> = {
    type: string,
    name: string,
    value: T,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    placeholder: string,
    label?: string,
    required?: boolean,
    disable?: boolean,
    className?: string,
}

const Input: React.FC<InputChildProps> = ({ type = "text", name, value, onChange, placeholder, label, required = false, disable = false, className }) => {

    const mergedInputClass = twMerge(
        clsx(
            "bg-neutral-secondary-medium border border-gray-200 bg-gray-50 text-heading  rounded-md focus:ring-brand focus:border-brand block text-sm w-full px-3 py-2 my-1 shadow-xs placeholder:text-body",
            className
        )
    )

    return (
        <div className="w-full">
            {
                label &&
                <label
                    className="text-sm font-medium"
                >
                    {label}
                </label>

            }
            <input
                type={type}
                value={value}
                onChange={onChange}
                name={name}
                // className="bg-neutral-secondary-medium border border-gray-200 bg-gray-50 border-default-medium text-heading  rounded-md focus:ring-brand focus:border-brand block text-sm w-full px-3 py-2 my-1 shadow-xs placeholder:text-body"
                className={mergedInputClass}
                placeholder={placeholder}
                required={required}
                disabled={disable}
            />
        </div>
    )
}

export default Input