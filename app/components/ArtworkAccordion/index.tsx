import * as Accordion from "@radix-ui/react-accordion";
import { AccordionContent, AccordionTrigger } from "@radix-ui/react-accordion";

export interface IArtworkAccordionProps {
  description: string;
  styles: string[];
  mediums: string[];
  materials: string[];
  subjects: string[];
}

enum AccordionItems {
  DESCRIPTION = "description",
  MEDIA = "media",
}

const ArtworkAccordion = ({
  description,
  styles,
  mediums,
  materials,
  subjects,
}: IArtworkAccordionProps) => {
  return (
    <Accordion.Root
      type="single"
      collapsible
      defaultValue={AccordionItems.DESCRIPTION}
      className="artwork_accordion"
    >
      <Accordion.Item value={AccordionItems.DESCRIPTION}>
        <AccordionTrigger className="artwork_accordion-trigger">
          DESCRIPTION
        </AccordionTrigger>

        <AccordionContent className="artwork_accordion-content">
          {description}
        </AccordionContent>
      </Accordion.Item>

      <Accordion.Item value={AccordionItems.MEDIA}>
        <AccordionTrigger className="artwork_accordion-trigger">
          SUBJECT, MEDIUM, STYLE, MATERIALS
        </AccordionTrigger>

        <AccordionContent className="artwork_accordion-content">
          Styles:
          <ul>
            {styles.map((style) => (
              <li>{style}</li>
            ))}
          </ul>
          Mediums:
          <ul>
            {mediums.map((medium) => (
              <li>{medium}</li>
            ))}
          </ul>
          Materials:
          <ul>
            {materials.map((material) => (
              <li>{material}</li>
            ))}
          </ul>
          Subects:
          <ul>
            {subjects.map((subject) => (
              <li>{subject}</li>
            ))}
          </ul>
        </AccordionContent>
      </Accordion.Item>
    </Accordion.Root>
  );
};

export default ArtworkAccordion;
