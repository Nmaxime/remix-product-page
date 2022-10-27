import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Button from "~/components/Button";
import artworkStyles from "~/styles/artwork.css";
import sliderStyles from "~/styles/slider.css";
import { capitalizeFirstLetter } from "~/utils/capitalizeFirstLetter";

import { PropsWithChildren } from "react";
import swiperCss from "swiper/swiper-bundle.min.css";
import ArtworkAccordion from "~/components/ArtworkAccordion";
import Slider from "~/components/Slider";

export interface ISliderProps extends PropsWithChildren<{}> {
  imageUrls: string[];
}

export const loader: LoaderFunction = async ({ params: { artworkId } }) => {
  if (!artworkId || !["0", "1"].includes(artworkId)) {
    console.log("Artwork id is invalid");
    return;
  }

  const res = await fetch(
    `https://storage.googleapis.com/ya-misc/interviews/front/examples/${artworkId}.json`
  );
  const artwork = await res.json();

  if (!artwork) {
    console.log("No artwork fetched");
    return;
  }

  const { depth, height, width } = artwork.dimensions;
  const dimensionsText = `${width} W x ${height} H x ${depth} D in`;

  return json({
    title: artwork.title,
    category: capitalizeFirstLetter(artwork.category),
    styles: artwork.styles,
    mediums: artwork.mediums,
    materials: artwork.materials,
    subjects: artwork.subjects,
    description: artwork.description,
    dimensionsText,
    creationYear: artwork.creationYear,
    imageUrl: artwork.imageUrl,
    priceEuros: `${artwork.price} €`,
    artistFullName: artwork.artistShort.fullname,
    artistCountry: capitalizeFirstLetter(
      artwork.artistShort.country || "france"
    ),
    otherArtworkImages: artwork.otherArtworkImages,
  });
};

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: artworkStyles,
    },
    {
      rel: "stylesheet",
      href: sliderStyles,
    },
    {
      rel: "stylesheet",
      href: swiperCss,
    },
  ];
};

export default function Artwork() {
  const {
    title,
    category,
    styles,
    mediums,
    materials,
    subjects,
    description,
    dimensionsText,
    creationYear,
    imageUrl,
    priceEuros,
    artistFullName,
    artistCountry,
    otherArtworkImages,
  }: Artworks.ProcessedArtwork = useLoaderData();

  return (
    <div className="artwork">
      <div className="artwork_layout">
        <div className="artwork_presentation">
          <img className="artwork_image" src={imageUrl} alt="Artwork image" />
          <ArtworkAccordion
            description={description}
            styles={styles}
            mediums={mediums}
            materials={materials}
            subjects={subjects}
          />
        </div>

        <div className="artwork_info-side-panel">
          <div className="artwork_title">{title}</div>
          <div className="artwork_artist">
            <div className="artwork_artist-full-name">{artistFullName}</div>
            <div className="artwork_artist-country">{artistCountry}</div>
          </div>

          <div className="artwork_creation">
            <div className="">{`${category}. ${creationYear}`}</div>
            <div className="">{dimensionsText}</div>
          </div>

          <div className="artwork_price">{priceEuros}</div>
          <div className="artwork_buy-actions">
            <Button mode="black">Acquire</Button>
            <Button mode="white">Make an offer</Button>
          </div>
        </div>
      </div>

      <div className="artwork_recommandations">
        <Slider imageUrls={otherArtworkImages} />
      </div>
    </div>
  );
}
