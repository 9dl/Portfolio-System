import { Button, Divider, Image, Link, Tooltip } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import Tilt from "react-parallax-tilt";
import DisplayRole from "@/components/ui/Role";
import { motion } from "framer-motion";

const ProfileCard = ({ profile }) => {
    const addSocialMediaView = () => {
        fetch(`api/increaseSocialViews?profileID=${profile.profileid}`);
    };

    const renderSocialMediaButton = (mediaType, iconName, iconColor) => {
        if (profile[mediaType] && profile[mediaType] !== "no") {
            return (
                <Tooltip content={mediaType.charAt(0).toUpperCase() + mediaType.slice(1)} placement={"bottom"} showArrow>
                    <Button
                        isIconOnly
                        color="default"
                        variant="flat"
                        aria-label={mediaType}
                        as={Link}
                        onClick={addSocialMediaView}
                        href={profile[mediaType]}
                        isExternal={profile.openinnewtab}
                    >
                        <Icon icon={iconName} width={32} color={iconColor || undefined} />
                    </Button>
                </Tooltip>
            );
        }
        return null;
    };

    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
            <div className="min-h-screen flex flex-col items-center justify-center">
                <Tilt
                    tiltMaxAngleX={4.5}
                    tiltMaxAngleY={8}
                    tiltAngleYInitial={0}
                    className="flex rounded"
                >
                    <div className="max-w-sm backdrop-blur-2xl shadow-xl rounded-2xl">
                        <div className="rounded-t-lg h-32 overflow-hidden rounded-b-2xl">
                            <Image src={profile.bannersrc} alt="Banner" width={500} height={500}/>
                        </div>
                        <div className="flex flex-row justify-between mx-2">
                            <div></div>
                            <div className="mx-auto w-32 h-32 relative -mt-16 rounded-full border-opacity-30">
                                <Image className={`rounded-full`} src={profile.avatarsrc} alt={"Avatar"} width={128}
                                       height={128}/>
                            </div>
                            <div className={`absolute p-1`}><DisplayRole roleName={profile.role}/></div>
                        </div>
                        <div className="text-center my-2">
                            <h2 className="font-semibold text-2xl text-white textShadow">{profile.username}</h2>
                            <p className="text-white/50">{profile.description}</p>
                        </div>
                        <Divider className="w-72 mx-auto"/>
                        <div className="flex flex-row gap-2 my-3 items-center justify-center">
                            {renderSocialMediaButton('github', 'mdi:github')}
                            {renderSocialMediaButton('discord', 'ic:baseline-discord', '#5864f3')}
                            {renderSocialMediaButton('telegram', 'ic:baseline-telegram', '#1d9fdb')}
                            {renderSocialMediaButton('instagram', 'skill-icons:instagram')}
                            {renderSocialMediaButton('epicgames', 'simple-icons:epicgames')}
                            {renderSocialMediaButton('youtube', 'entypo-social:youtube', '#ff0000')}
                            {renderSocialMediaButton('twitch', 'logos:twitch', '#5a3e85')}
                            {renderSocialMediaButton('twitter', 'skill-icons:twitter', '#1d9bf0')}
                            {renderSocialMediaButton('steam', 'mdi:steam')}
                            {renderSocialMediaButton('customlink', 'ph:link-duotone')}
                        </div>
                    </div>
                </Tilt>
                {profile.signature && <p className="text-sm text-default-500">{profile.signature}</p>}
            </div>
        </motion.div>
    );
};

export default ProfileCard;
