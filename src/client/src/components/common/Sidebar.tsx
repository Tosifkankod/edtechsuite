import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { sidebarItems } from "../../constants/sideBarItem.constant";
import type { SidebarItem } from "../../types/sideBarItem.type";


type ChildProps = {
    item: SidebarItem,
    openDropdown: string | null,
    toggleDropdown: (title: string) => void
}


const Sidebar = () => {
    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (title: any) => {
        setOpenDropdown(openDropdown === title ? null : title);
    };

    return (
        <div className="w-20 group hover:w-56 transition-all duration-500 rounded-md h-full border border-gray-200 shadow-sm flex flex-col">

            {/* LOGO AREA */}
            <div className="w-[80%] text-center pt-4 mx-auto flex text-lg">
                <p className="font-medium group-hover:w-0 overflow-hidden group-hover:opacity-0">
                    EXS
                </p>

                <p className="
                    max-w-0 opacity-0 overflow-hidden 
                    group-hover:max-w-[200px] 
                    group-hover:opacity-100 
                    transition-all duration-500 font-medium
                ">
                    EdtechXSuite
                </p>
            </div>

            <hr className="my-3 w-[90%] mx-auto text-gray-300" />

            {/* PROFILE SECTION */}
            <ul className="cursor-pointer">
                <li className="py-2 rounded-md w-[90%] mx-auto p-1">
                    <a className="hover:bg-gray-200 transition-bg duration-300 rounded-md w-full mx-auto p-1 py-2 flex items-center gap-2">
                        <div className="min-w-8 h-8 rounded-full overflow-hidden">
                            <img
                                className="w-full h-full object-fill"
                                src="https://demos.creative-tim.com/material-dashboard-pro-react/static/media/team-3.0ef0be95e6850814c79e.jpg"
                                alt=""
                            />
                        </div>
                        <p className="text-xs opacity-0 w-0 group-hover:opacity-100 group-hover:w-auto transition-all duration-500 overflow-hidden">
                            Brooklyn Alice
                        </p>
                        <ChevronDown className="w-0 opacity-0 group-hover:opacity-100 group-hover:w-4 duration-500 ml-auto" />
                    </a>
                </li>
            </ul>

            <hr className="my-3 w-[90%] mx-auto text-gray-300" />
            <p className="w-[90%] mx-auto text-sm px-3 font-medium mb-2">PAGES</p>

            {/* SIDEBAR ITEMS */}
            <ul className="cursor-pointer flex flex-col gap-1">
                {sidebarItems.map((item) => {
                    return (
                        <SideBarItem item={item} openDropdown={openDropdown} toggleDropdown={toggleDropdown} />
                    );
                })}
            </ul>
        </div>
    );
};


const SideBarItem: React.FC<ChildProps> = ({ item, openDropdown, toggleDropdown }) => {
    return (
        <li key={item.title} className="w-[90%] mx-auto">
            {/* MAIN LINK */}
            <div
                onClick={() => item.dropdown && toggleDropdown(item.title)}
                className=" hover:bg-gray-200  flex items-center gap-3 py-2 px-2 rounded-md transition-all duration-300" >
                {<item.icon className="min-w-4 h-4" />}

                <p className="text-sm opacity-0 w-0 group-hover:opacity-100 group-hover:w-auto transition-all duration-500 overflow-hidden">
                    {item.title}
                </p>

                {/* DROPDOWN ICON */}
                {item.dropdown && (
                    <ChevronDown
                        className={`ml-auto transition-transform duration-300 ${openDropdown === item.title ? "rotate-180" : ""} opacity-0 w-0 group-hover:opacity-100 group-hover:w-4 `}
                    />
                )}
            </div>

            {item.dropdown && (
                <ul
                    className={`px-2 flex flex-col gap-1 overflow-hidden transition-all duration-300 ${openDropdown === item.title ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
                >
                    {item.dropdown.map((sub) => (
                        <li className=" hover:bg-gray-200  flex items-center gap-3 py-2 px-2  rounded-md transition-all duration-300 " >
                            {sub.title[0]}
                            <p className="text-sm opacity-0 w-0 group-hover:opacity-100  group-hover:w-auto transition-all duration-500 overflow-hidden">

                                {item.title}
                            </p>
                        </li>
                    ))}
                </ul>
            )}

        </li>
    )

}

export default Sidebar;