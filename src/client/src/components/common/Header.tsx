import { useRef } from "react";
import { motion } from "framer-motion";
import { Menu, User, Settings } from "lucide-react";
import useScrollState from "../../hooks/useScrollAnimation";

type ChildProps = {
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}


const Header: React.FC<ChildProps> = ({ setSidebarOpen }) => {
    const ref = useRef(null);
    const { isAtTop } = useScrollState(ref);

    return (
        <motion.header
            ref={ref}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`
        sticky top-0 z-40 w-full flex items-center scroll-smooth justify-between p-2 rounded-xl backdrop-blur-xl transition-all duration-700
        ${isAtTop ? "bg-[#F5F5F5]/90 shadow-none" : "bg-[rgba(255,255,255,0.8)] shadow-[inset_0_0_0.0625rem_0.0625rem_rgba(255,255,255,0.9),0_1.25rem_1.6875rem_0_rgba(0,0,0,0.05)]"}
      `}
        >
            <div className="left text-sm flex items-center">
                <Menu onClick={() => setSidebarOpen(prev => !prev)} className="w-4 font-extrabold mr-3 stroke-2" />
                <p><span className="text-gray-500">Dashboard</span> / <b>Analytics</b></p>
            </div>

            <div className="right flex items-center gap-3">
                <input type="text" placeholder="Search" className="outline-0 p-2 placeholder:text-gray-500 border-gray-300 border rounded-md text-sm py-3" />
                <User className="w-4 text-gray-500 cursor-pointer" />
                <Settings className="w-4 text-gray-500 cursor-pointer" />
            </div>
        </motion.header>
    );
}


export default Header;