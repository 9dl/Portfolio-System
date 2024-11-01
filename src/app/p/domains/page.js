import { Navigation } from "@/components/ui/Navigation";

export default function Page() {
    return (
        <>
            <Navigation/>
            <div
                className="absolute inset-0 -z-10 bg-[image:radial-gradient(80%_50%_at_50%_-20%,hsl(var(--secondary)),rgba(255,255,255,0))]"/>
            <div className="flex flex-col p-6">
                <section>
                    <h2 className="font-bold text-lg">Domains</h2>
                </section>

                <div className={`p-3`}>
                    <section>
                        <p>Terrorist.wiki</p>
                        <p>SecureByte.dev</p>
                        <p>eGirlsFinder.online</p>
                    </section>
                    <section>
                        <h2 className="font-bold text-lg">Donated Domains</h2>
                        <p>None yet...</p>
                    </section>
                </div>
            </div>
        </>
    );
}
