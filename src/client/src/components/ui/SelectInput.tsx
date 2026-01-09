import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

type SelectOption = {
    label: string;
    value: string | number;
    disabled?: boolean;
};

type SelectInputProps = {
    name: string;
    label?: string;
    required?: boolean;
    className?: string;
    labelClassName?: string;
    option: SelectOption[];
    value?: string | number;
    onChange?: (value: string | number) => void;
};

const SelectInput: React.FC<SelectInputProps> = ({
    name,
    label,
    required,
    className,
    labelClassName,
    option,
    value,
    onChange,
}) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const selectedOption = option.find((o) => o.value === value);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const triggerClass = twMerge(
        clsx(
            "flex items-center justify-between rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm cursor-pointer",
            "focus:outline-none focus:ring-2 focus:ring-brand",
            className
        )
    );

    return (
        <div className="w-full relative" ref={ref}>
            {
                label && (
                    <label
                        className={twMerge("text-sm font-medium mb-1 block", labelClassName)}
                    >
                        {label} {required && <span className="text-red-500">*</span>}
                    </label>
                )}

            <div
                className={triggerClass}
                onClick={() => setOpen((prev) => !prev)}
            >
                <span className={selectedOption ? "text-heading" : "text-gray-400"}>{selectedOption?.label || "Select option"}</span>

                <svg
                    className={clsx(
                        "h-4 w-4 transition-transform",
                        open && "rotate-180"
                    )}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
            {
                open && (
                    <ul className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white shadow-lg">
                        {
                            option.map((item) => (
                                <li
                                    key={item.value}
                                    onClick={() => {
                                        if (item.disabled) return;
                                        onChange?.(item.value);
                                        setOpen(false);
                                    }}
                                    className={clsx("px-3 py-2 hover:bg-gray-100 text-sm cursor-pointer", item.disabled ? "text-gray-400 cursor-not-allowed" : "hover:bg-brand/10", item.value === value && "bg-brand/10 font-medium"
                                    )}
                                >
                                    {item.label}
                                </li>
                            ))}
                    </ul>
                )}
            <input type="hidden" name={name} value={value ?? ""} />
        </div>
    );
};

export default SelectInput;
