import {Button, Image, Link, Tooltip} from "@nextui-org/react";
import {Icon} from "@iconify/react";
export default function DisplayRole({ roleName }) {
    const renderRole = (role) => {
        switch (role.toUpperCase()) {
            case 'CEO':
                return (
                    <Tooltip color={"default"} showArrow={true} content="CEO" placement={"bottom"} className={`text-sm uppercase font-bold text-white`}>
                        <Image src={"/ceo.svg"} width={32} height={32} isBlurred />
                    </Tooltip>
                );
            case 'ADMIN':
                return (
                    <Tooltip color={"default"} showArrow={true} content="Admin" placement={"bottom"} className={`text-sm uppercase font-bold text-white`}>
                        <Image src={"/admin.svg"} width={32} height={32} isBlurred />
                    </Tooltip>
                );
            case 'VIP':
                return (
                    <Tooltip color={"default"} showArrow={true} content="VIP" placement={"bottom"} className={`text-sm uppercase font-bold text-white`}>
                        <Image src={"/vip.svg"} width={32} height={32} isBlurred />
                    </Tooltip>
                );
            case 'OG':
                return (
                    <Tooltip color={"default"} showArrow={true} content="OG" placement={"bottom"} className={`text-sm uppercase font-bold text-white`}>
                        <Image src={"/og.svg"} width={32} height={32} isBlurred />
                    </Tooltip>
                );
            case 'RICH':
                return (
                    <Tooltip color={"default"} showArrow={true} content="$ RICH $" placement={"bottom"} className={`text-sm uppercase font-bold text-white`}>
                        <Image src={"/rich.svg"} width={32} height={32} isBlurred />
                    </Tooltip>
                );
            case 'BASIC':
                return null
            default:
                return null;
        }
    };

    return (
        <div className={`flex flex-row`}>
            {roleName.split(',').map((role) => (
                <div key={role}>
                    {renderRole(role.trim())}
                </div>
            ))}
        </div>
    );
}