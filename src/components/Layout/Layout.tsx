import React from "react";
import LayoutAppBar from "./LayoutAppBar";
import LayoutFooter from "./LayoutFooter";

interface LayoutProps {
    title: string,
}

const Layout: React.FC<LayoutProps> = ({title, children}) => {
    return (
        <div className={"blogjs"}>
            <LayoutAppBar/>
                {children}
            <LayoutFooter/>
        </div>
    );
}

export default Layout;
