import {Image, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/react";

export function Navigation() {
    return (
        <Navbar isBlurred isBordered shouldHideOnScroll height={`3.5rem`} >
            <NavbarBrand>
                <Image height={36} width={36} isBlurred src={"/rose.svg"} />
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <CustomLink href={"/"} label={"Home"} />
                <CustomLink href={"/p/domains"} label={"Domains"} />
                <CustomLink href={"/p/badges"} label={"Badges"} />
                <CustomLink href={"/p/leaderboard"} label={"Top Profiles"} />
                <CustomLink href={"/p/credits"} label={"Credits"} />
                <CustomLink href={"/p/tos"} label={"ToS"} />
            </NavbarContent>
            <NavbarContent justify="end">
                <Image height={36} width={36} isBlurred src={"/rose.svg"} />
            </NavbarContent>
        </Navbar>
    )
}
function CustomLink({href, label}) {
    return (
        <NavbarItem>
            <Link color="foreground" href={href}>
                {label}
            </Link>
        </NavbarItem>
    )
}