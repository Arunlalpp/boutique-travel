import { HeroReel } from "@/components/ledger/HeroReel";
import { Manifesto } from "@/components/ledger/Manifesto";
import { StorySection } from "@/components/ledger/StorySection";
import { LedgerIndex } from "@/components/ledger/LedgerIndex";
import { HowItWorks } from "@/components/ledger/HowItWorks";
import { GuestLedger } from "@/components/ledger/GuestLedger";
import { FramesAndHosts } from "@/components/ledger/FramesAndHosts";
import { WhyTravel } from "@/components/ledger/WhyTravel";
import { EnquirySection } from "@/components/ledger/EnquirySection";
import { site } from "@/lib/site";

export default async function HomePage() {
    const settings = site;

    return (
        <>
            <HeroReel />
            <Manifesto />
            <StorySection />
            <LedgerIndex />
            <HowItWorks />
            <GuestLedger />
            <FramesAndHosts />
            <WhyTravel />
            <EnquirySection whatsapp={settings.whatsapp || settings.phone} email={settings.email} />
        </>
    );
}
