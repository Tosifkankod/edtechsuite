import { Pencil, Trash2 } from "lucide-react";
import { useDeleteCourse } from "../../modules/course/hooks/queryHook";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteStudent } from "../../modules/student/hooks/queryHooks";
import { useDeleteTrainer } from "../../modules/trainers/hooks/queryHooks";

interface ActionDropdownProps<TData extends { id: number }> {
    data: TData;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    api: string;
}

type DeleteHandler = (id: number) => void;

export default function ActionDropdown<TData extends { id: number; },>({ data, isOpen, onOpenChange, api }: ActionDropdownProps<TData>) {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const deleteHandlers: Record<string, DeleteHandler> = {
        '/course': useDeleteCourse().mutate,
        '/student': useDeleteStudent().mutate,
        '/trainer': useDeleteTrainer().mutate
    }

    const handleOnEdit = (id: number) => {
        navigate(`${api}/edit/${id}`)
    }

    const handleOnDelete = (id: number) => {
        const delteFn = deleteHandlers[api];
        delteFn(id);
        onOpenChange(false);
    }

    useEffect(() => {
        if (!isOpen) return;
    }, [])

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