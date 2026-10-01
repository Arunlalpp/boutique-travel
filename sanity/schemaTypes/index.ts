import { seo } from "./objects/seo";
import { itineraryDay } from "./objects/itineraryDay";
import { itinerary } from "./itinerary";
import { guestStory } from "./guestStory";
import { destination } from "./destination";
import { siteSettings } from "./siteSettings";
import { enquiry } from "./enquiry";

export const schemaTypes = [
    // Objects
    seo,
    itineraryDay,
    // Documents
    itinerary,
    guestStory,
    destination,
    siteSettings,
    enquiry,
];
