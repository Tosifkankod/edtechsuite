import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

const PAGE_SIZES = [5, 10, 15, 20, 25]

type LimitDropdownProps = {
    value: number
    onChange: (value: number) => void
}
export default function LimitDropdown({ value, onChange }: LimitDropdownProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative inline-block text-sm">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center justify-between gap-2 w-20 px-3 py-2 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
                <span className="text-gray-500 font-medium">{value}</span>
                {open ? (
                    <ChevronUp size={16} className="text-gray-500" />
                ) : (
                    <ChevronDown size={16} className="text-gray-500" />
                )}
            </button>
            {
                open && (
                    <div
                        className="absolute z-10 w-20 rounded-lg bg-white p-2 shadow-lg mt-1 py-1"
                    >
                        {PAGE_SIZES.map((size) => (
                            <button
                                key={size}
                                onClick={() => {
                                    onChange(size)
                                    setOpen(false)
                                }}
                                className={`w-full text-left text-gray-400 px-4 py-2 rounded-md
                ${value === size
                                        ? "bg-gray-100 font-medium"
                                        : "hover:bg-gray-50"
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                )
            }
        </div>
    );
}
