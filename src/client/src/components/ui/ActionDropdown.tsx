import { Pencil, Trash2 } from "lucide-react";

interface ActionDropdownProps<TData extends { id: number }> {
    data: TData;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    api: string;
}

export default function ActionDropdown<TData extends { id: number; },>({ data, isOpen, onOpenChange, api }: ActionDropdownProps<TData>) {
    const handleOnEdit = (id: number) => {
        switch (api) {
            case '/course':
                break;
            default: ''
        }
        onOpenChange(false);
    }

    const handleOnDelete = (id: number) => {
        onOpenChange(false);
    }



    return (
        <div className="relative inline-block text-left">
            <button
                type="button"
                className="p-2 rounded-md hover:bg-gray-100"
                onClick={() => onOpenChange(!isOpen)}
            >⋮</button>
            {
                isOpen && (
                    <div
                        className="absolute left-0 z-20 mt-1 w-25 rounded-md bg-white shadow-md"
                        onBlur={(e) => {
                            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                                onOpenChange(false);
                            }
                        }}
                        tabIndex={-1}
                    >
                        <div className="py-1">
                            <button
                                className="flex items-center gap-2 w-full px-2 py-2 text-left text-xs text-gray-700 hover:bg-gray-100"
                                onClick={() => handleOnEdit(data.id)}
                            >
                                <Pencil size={14} />
                                Edit
                            </button>

                            <button
                                className="flex gap-2 items-center w-full px-2 py-2 text-left text-xs text-red-700 hover:bg-gray-100"
                                onClick={() => handleOnDelete(data.id)}
                            >
                                <Trash2 size={14} />
                                Delete
                            </button>
                        </div>
                    </div>
                )}
        </div>
    );
}