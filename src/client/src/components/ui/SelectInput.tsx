import clsx from "clsx";
import { twMerge } from "tailwind-merge"

type SelectOption = {
    label: string;
    value: string | number;
    disabled?: boolean;
};

type SelectInputChildProps = {
    name: string,
    label?: string,
    required?: boolean,
    className?: string,
    labelClassName?: string,
    option: SelectOption[]
}

const SelectInput: React.FC<SelectInputChildProps> = ({ name, label, required, className, labelClassName, option }) => {
    const mergedInputClass = twMerge(
        clsx(
            "bg-neutral-secondary-medium border border-gray-200 bg-gray-50 text-heading rounded-md focus:ring-brand focus:border-brand block text-sm w-full px-3 py-2 my-1  placeholder:text-body",
            className
        )
    )

    return (
        <div className="w-full">
            {label &&
                <label
                    className={twMerge("text-sm font-medium", labelClassName)}
                >
                    {label}
                </label>
            }
            <select id="countries" name={name} required={required} className={mergedInputClass}>
                {
                    option && option.map((item) => {
                        return <option value={item.value} >{item.label}</option>
                    })
                }
            </select>
        </div>
    )
}

export default SelectInput