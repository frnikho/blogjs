import React from "react";

interface HideProps {
    hide: boolean
}

const Hide: React.FC<HideProps> = ({hide, children}) => {
    if (hide)
        return null;
    return (
        <div className={"showed"}>
            {children}
        </div>
    );
}

export default Hide;
