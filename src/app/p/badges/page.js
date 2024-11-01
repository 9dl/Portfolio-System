import { Navigation } from "@/components/ui/Navigation";

export default function Page() {
    return (
        <>
            <Navigation/>
            <div
                className="absolute inset-0 -z-10 bg-[image:radial-gradient(80%_50%_at_50%_-20%,hsl(var(--secondary)),rgba(255,255,255,0))]"/>
            <div className="flex flex-col p-6">
                <section>
                    <h2 className="font-bold text-lg">All Badges</h2>
                </section>

                <div className={`p-3`}>
                    <section>
                        <h2 className="font-bold text-lg">CEO</h2>
                        <p>obvious?</p>
                    </section>

                    <section>
                        <h2 className="font-bold text-lg">Admin</h2>
                        <p>obvious?</p>
                    </section>

                    <section>
                        <h2 className="font-bold text-lg">VIP</h2>
                        <p>Assignable by a Staff member</p>
                    </section>

                    <section>
                        <h2 className="font-bold text-lg">Rich</h2>
                        <p>Earned through monetary donations or domain contributions</p>
                    </section>

                    <section>
                        <h2 className="font-bold text-lg">OG</h2>
                        <p>Awarded for being among the first members</p>
                    </section>
                </div>
            </div>
        </>
    );
}
