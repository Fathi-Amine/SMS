import React, {useEffect, useState} from 'react';
import {AiOutlineLogout, AiOutlineMenu} from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line} from "react-icons/ri";
import { MdKeyboardArrowDown} from "react-icons/md";
import { TooltipComponent} from "@syncfusion/ej2-react-popups";
import avatar from "../data/avatar.jpg";
import { Cart, Chat, Notification, UserProfile } from './index';
import {useDispatch, useSelector} from "react-redux";
import {
    toggleCart,
    toggleChat,
    toggleMenu,
    toggleNotification,
    toggleUserProfile,
    setScreenSize
} from "../redux/interactivitySlices.js";
import Logout from "./Logout.jsx";

const NavButton = ({title, customFunc, icon, color, dotColor}) => (
    <TooltipComponent content={title} position={"BottomCenter"}>
        <button type={"button"} onClick={customFunc} style={{color}} className={"relative text-xl rounded-full p-3 hover:bg-gray-light"}>
            <span style={{ background: dotColor}}
                  className={"absolute inline-flex rounded-full h-2 w-2 right-2 top-2"}
            ></span>
            {icon}
        </button>
    </TooltipComponent>
)
const Navbar = () => {
    const {userInfo} = useSelector((state)=>state.auth)

    const screenSize = useSelector(state => state.interactivity.screenSize);
    const menu = useSelector(state => state.interactivity.menu);
    const activeComponent = useSelector((state) => state.interactivity.activeComponent);

    const dispatch = useDispatch()
    const handleCartClick = () => {
        dispatch(toggleCart());
    };

    const handleChatClick = () => {
        dispatch(toggleChat());
    };

    useEffect(() => {
        const handleResize = () => {
            dispatch(setScreenSize(window.innerWidth));
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, [dispatch]);
    useEffect(() => {
        if (screenSize <= 900 && menu) {
            dispatch(toggleMenu());
        }else if (screenSize > 900 && !menu) {
            dispatch(toggleMenu());
        }
    }, [screenSize, dispatch]);
    return (
        <div className={"flex justify-between p-2 md:mx-6 relative"}>
            <NavButton
                title={"Menu"}
                customFunc={()=> dispatch(toggleMenu())}
                color={"blue"}
                icon={<AiOutlineMenu />}
            />

            <div className={"flex"}>
                <Logout />
                <NavButton
                    title={"Chat"}
                    dotColor={"#03C9D7"}
                    customFunc={() => handleChatClick()}
                    color={"blue"}
                    icon={<BsChatLeft />}
                />
                <NavButton
                    title={"Notification"}
                    dotColor={"#03C9D7"}
                    color={"blue"}
                    customFunc={()=> dispatch(toggleNotification())}
                    icon={<RiNotification3Line />}
                />
                <TooltipComponent
                    content={"Profile"}
                    position={"BottomCenter"}
                >
                    <div className={"flex items-center gap-2 cursor-pointer p-1 hover:bg-gray-light rounded-lg"}
                         onClick={() => dispatch(toggleUserProfile())}
                    >
                        <img src={avatar} alt={"avatar"} className={"w-8 h-8 rounded-full"} />
                        <p>
                            {userInfo ? (
                                <span className={"text-gray-400 text-14"}>Hi,{userInfo.data?.name}</span>
                            ) : (
                                <span className={"text-gray-400 text-14"}>Welcome</span>

                            )}
                           {/* <span className={"text-gray-400 text-14"}>Hi,</span>
                            <span className={"text-gray-400 font-bold ml-1 text-14"}>Amine</span>*/}
                        </p>
                        <MdKeyboardArrowDown className={"text-gray-400 text-14"}/>
                    </div>
                    {/*<NavButton
                        title={"User Profile"}
                        color={"blue"}
                        customFunc={()=> dispatch(toggleUserProfile())}
                        icon={<MdKeyboardArrowDown />}
                    />*/}
                </TooltipComponent>
                {activeComponent === 'cart' && <Cart />}
                {activeComponent === 'chat' && <Chat />}
                {activeComponent === 'notification' && <Notification />}
                {activeComponent === 'userProfile' && <UserProfile />}
            </div>
        </div>
    );
};

export default Navbar;