import type { StructureResolver } from "sanity/structure";

/**
 * Custom Studio sidebar: content types a client cares about, with Site
 * Settings pinned as a singleton (one document, opened directly — never a
 * list to add more from).
 */
export const structure: StructureResolver = (S) =>
    S.list()
        .title("Content")
        .items([
            S.listItem()
                .title("Itineraries")
                .schemaType("itinerary")
                .child(S.documentTypeList("itinerary").title("Itineraries")),
            S.listItem()
                .title("Guest Stories")
                .schemaType("guestStory")
                .child(S.documentTypeList("guestStory").title("Guest Stories")),
            S.listItem()
                .title("Destinations")
                .schemaType("destination")
                .child(S.documentTypeList("destination").title("Destinations")),
            S.divider(),
            S.listItem()
                .title("Site Settings")
                .schemaType("siteSettings")
                .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            S.divider(),
            S.listItem()
                .title("Enquiries")
                .schemaType("enquiry")
                .child(
                    S.documentTypeList("enquiry")
                        .title("Enquiries")
                        .defaultOrdering([{ field: "submittedAt", direction: "desc" }]),
                ),
            S.listItem()
                .title("Newsletter subscribers")
                .schemaType("subscriber")
                .child(
                    S.documentTypeList("subscriber")
                        .title("Newsletter subscribers")
                        .defaultOrdering([{ field: "subscribedAt", direction: "desc" }]),
                ),
        ]);
