import type { ImageAsset } from "@/lib/types";

/**
 * PLACEHOLDER PHOTOGRAPHY
 * All imagery is referenced from this one file. Stock photos from Unsplash
 * stand in until the client's own photography is supplied — replace each
 * `src` with a path such as "/images/kyoto-hero.jpg" (placed in /public)
 * or a CMS asset URL.
 */
const u = (id: string) => `https://images.unsplash.com/photo-${id}`;

const img = (id: string, alt: string, focal?: string): ImageAsset => ({
  src: u(id),
  alt,
  focal,
});

export const media = {
  // General / brand
  heroMountains: img("1506905925346-21bda4d32df4", "Mountain ridges rising above a sea of cloud at first light"),
  valleyLight: img("1469474968028-56623f02e42e", "Sunlight breaking over a quiet valley"),
  alpineLake: img("1501785888041-af3ef285b470", "A still lake held between mountains"),
  summit: img("1464822759023-fed622ff2c3b", "A snow-covered summit against a clear sky"),
  nightSky: img("1519681393784-d120267933ba", "Stars over a snowy mountain range"),
  traveller: img("1503220317375-aaad61436b1b", "A traveller looking out across mountains", "50% 40%"),
  walkers: img("1551632811-561732d1e306", "Two walkers on a mountain path"),
  retreat: img("1566073771259-6a8506099945", "A calm pool terrace at a small hotel"),

  // Japan
  kyotoPagoda: img("1493976040374-85c8e12f0c0e", "A pagoda rising above Kyoto's rooftops", "50% 60%"),
  kyotoStreet: img("1545569341-9eb8b30979d9", "A quiet street in Kyoto"),
  japanDetail: img("1528360983277-13d401cdc186", "A traditional scene in Japan"),
  tokyo: img("1540959733332-eab4deabeeaf", "Tokyo at dusk"),

  // Italy
  dolomiteLake: img("1476514525535-07fb3b4ae5f1", "A wooden boat on a mountain lake in northern Italy"),
  venice: img("1523906834658-6e24ef2386f9", "Gondolas and palazzi along a Venetian canal"),
  cinqueTerre: img("1516483638261-f4dbaf036963", "Coloured houses stacked above the sea on the Ligurian coast"),

  // India
  tajMahal: img("1524492412937-b28074a5d7da", "The Taj Mahal in soft morning light"),
  jaipur: img("1477587458883-47145ed94245", "Rose-coloured architecture in Rajasthan"),

  // Kenya
  savannah: img("1516426122078-c23e76319801", "Wildlife on the open savannah"),
  safariPlains: img("1547471080-7cc2caa01a7e", "Grasslands of East Africa at golden hour"),
  safariWildlife: img("1535941339077-2dd1c7963098", "An animal encounter on safari"),

  // Iceland
  aurora: img("1531366936337-7c912a4589a7", "Northern lights over a dark landscape"),
  icelandCoast: img("1476610182048-b716b8518aae", "A dramatic northern landscape"),
  icelandLand: img("1504829857797-ddff29c27927", "Mist over a wild northern landscape"),

  // Guest portraits (placeholders)
  portraitA: img("1438761681033-6461ffad8d80", "Portrait of a guest", "50% 30%"),
  portraitB: img("1500648767791-00dcc994a43e", "Portrait of a guest", "50% 30%"),
  portraitC: img("1494790108377-be9c29b29330", "Portrait of a guest", "50% 30%"),
  portraitD: img("1507003211169-0a1dd7228f2d", "Portrait of a guest", "50% 30%"),
  portraitE: img("1544005313-94ddf0286df2", "Portrait of a guest", "50% 30%"),
} satisfies Record<string, ImageAsset>;
