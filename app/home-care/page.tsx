import SectionPage from "@/components/SectionPage";

export default function HomeCarePage() {
  return (
    <SectionPage
      eyebrow="Safety & Hygiene Support"
      title="Home Care & Hygiene"
      intro="Adult diapers, anti-slip bathroom mats, daily-living aids, comfort pillows, and safety essentials for elderly care."
      categorySlug="home-care"
      subGroups={["Adult Incontinence", "Bathroom Safety", "Comfort & Sleep", "Disinfection & Cleanliness"]}
    />
  );
}
