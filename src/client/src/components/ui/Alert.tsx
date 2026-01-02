import { X } from "lucide-react";
import { createContext, useContext, useState, type ReactNode } from "react";

type ToastType = "success" | "error" | "info";

interface Toast {
    id: number,
    message: string,
    type: ToastType
}

interface ToastContextType {
    toast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const toast = (message: string, type: ToastType = "error") => {
        const id = Date.now();

        setToasts(prev => [...prev, { id, message, type }]);

        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 2000);
    };

    return (
        <ToastContext.Provider value={{ toast }}>
            {children}

            <div className="fixed w-1/2 top-4 left-1/2 -translate-x-1/2 p-2 z-50 space-y-3">
                {toasts.map(t => (
                    <div key={t.id} className={`px-4 py-2 border items-center flex rounded-lg shadow-lg text-white text-lg animate-slide-in
                        ${t.type === "success" && "bg-success"}
                        ${t.type === "error" && "bg-error"}
                        ${t.type === "info" && "bg-dark-angled"}
                    `}
                    >
                        <p className=" w-full ">{t.message}</p>
                        <button
                            onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))}
                            className="ml-3 text-white/70 hover:text-white"
                        >
                            <X width={'15px'} fontWeight={900} />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider >
    );
}

export const useToast = () => {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error("useToast must be used inside ToastProvider");
    return ctx;
};

















