import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import type { ProcessStep } from "@/types/content";

interface ProcessBandProps {
  steps?: ProcessStep[];
  id?: string;
}

export function ProcessBand({ id = "proceso" }: ProcessBandProps) {
  // Editorial synthesis of the 4 primary stages requested in the client brief
  const editorialSteps = [
    {
      num: "01",
      title: "Escuchamos",
      description:
        "Primera reunión para conocer sus necesidades, el terreno y las ideas del cliente.",
    },
    {
      num: "02",
      title: "Proyectamos",
      description:
        "Estudios, planos, arquitectura e ingenierías para definir una propuesta integral.",
    },
    {
      num: "03",
      title: "Construimos",
      description:
        "Ejecución y supervisión con seguimiento del programa de obra y de control de calidad.",
    },
    {
      num: "04",
      title: "Entregamos",
      description:
        "Entrega formal, documentación y garantía por escrito según el tipo de proyecto.",
    },
  ];

  return (
    <section id={id} className="bg-ink py-20 text-concha-nacar md:py-28">
      <Container>
        <div className="mb-14">
          <p className="eyebrow !text-concha-nacar/70 mb-2">Nuestro proceso</p>
          <Heading
            voice="serif"
            as="h2"
            sizeClassName="text-3xl md:text-5xl text-concha-nacar max-w-2xl"
          >
            De la primera conversación a la obra terminada.
          </Heading>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {editorialSteps.map((step) => (
            <div
              key={step.title}
              className="flex flex-col pt-2"
            >
              <h3 className="voice text-xl font-normal text-concha-nacar md:text-2xl">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-concha-nacar/75">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
