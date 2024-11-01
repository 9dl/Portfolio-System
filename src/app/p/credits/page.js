import { Navigation } from "@/components/ui/Navigation";

export default function Page() {
    return (
        <>
            <div
                className="absolute inset-0 -z-10 bg-[image:radial-gradient(80%_50%_at_50%_-20%,hsl(var(--secondary)),rgba(255,255,255,0))]"/>
            <Navigation/>
            <div className="flex flex-col p-6">
                <section>
                    <h2 className="font-bold text-lg">Credits</h2>
                </section>

                <div className={`p-3`}>
                    <section>
                        <h2 className="font-bold text-lg">Developer(s)</h2>
                        <p>SecureByte</p>
                    </section>

                    <section>
                        <h2 className="font-bold text-lg">Contributor(s)</h2>
                        <p>ReverseLabs (originally giving this idea)</p>
                        <p>mUSksUS (providing some cool ideas for the profile page)</p>
                    </section>
                </div>
            </div>
        </>
    );
}
