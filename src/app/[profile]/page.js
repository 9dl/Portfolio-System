import { getUserData } from "@/app/[profile]/getprofile";
import { ProfileLayout } from "@/components/Layout";
import {Button, Link} from "@nextui-org/react";
export const revalidate = 0;
const fetchData = async (str) => {
    try {
        let data = await getUserData(str);
        return data[0];
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
};

export default async function Page({ params }) {
    try {
        let userData = await fetchData(params.profile);

        if (!userData) {
            return (
                <div className="flex flex-col text-center items-center justify-center min-h-screen bg-gradient-to-br from-primary p-8">
                    <p className="text-4xl text-white mb-8 font-bold">Page not found</p>
                    <Button as={Link} href="/" color="primary" variant="faded">Go to Homepage</Button>
                </div>
            )
        }

        return <ProfileLayout profile={userData} />;
    } catch (error) {
        return <div>An unexpected error occurred</div>;
    }
}
