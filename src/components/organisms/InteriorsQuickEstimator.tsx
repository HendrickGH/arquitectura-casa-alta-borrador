"use client";

import { useId, useMemo, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { Section } from "@/components/atoms/Section";
import { Text } from "@/components/atoms/Text";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import type { EstimatorConfig } from "@/types/content";

export interface InteriorsQuickEstimatorProps {
  estimator: EstimatorConfig;
  whatsappHref?: string;
}

/**
 * Layer 6: Pre-cotizador Interactivo en 3 Pasos & Asesoría sin Costo.
 *
 * Provides a low-friction architectural configurator that dismantles fear of cost
 * through transparency, structured scope selection, and guaranteed free
 * initial technical consultation.
 *
 * Adheres strictly to DESIGN.md:
 * - 0px orthogonal geometry (Section 1)
 * - Form selector chips with bg-brand-50 / bg-bone-100, zero border strokes (Section 5.3)
 * - Section tone="canvas"
 */
export function InteriorsQuickEstimator({
  estimator,
  whatsappHref = "https://wa.me/529514581395",
}: InteriorsQuickEstimatorProps) {
  const componentId = useId();
  const [selectedSpace, setSelectedSpace] = useState<string>("cocina");
  const [selectedStage, setSelectedStage] = useState<string>("planos");
  const [selectedLocation, setSelectedLocation] = useState<string>("costa");

  const steps = estimator.steps;
  const step1 = steps[0];
  const step2 = steps[1];
  const step3 = steps[2];

  const currentSpaceOption = step1?.options.find((o) => o.id === selectedSpace);
  const currentStageOption = step2?.options.find((o) => o.id === selectedStage);
  const currentLocationOption = step3?.options.find(
    (o) => o.id === selectedLocation,
  );

  const assembledWhatsappUrl = useMemo(() => {
    const spaceLabel = currentSpaceOption?.label ?? selectedSpace;
    const stageLabel = currentStageOption?.label ?? selectedStage;
    const locationLabel = currentLocationOption?.label ?? selectedLocation;

    const message = `Hola Casa Alta, realicé la estimación de mi espacio en su sitio web: Intervención en ${spaceLabel}, etapa ${stageLabel}, ubicación ${locationLabel}. Quisiera agendar la asesoría técnica inicial sin costo.`;

    const baseClean = whatsappHref.split("?")[0];
    return `${baseClean}?text=${encodeURIComponent(message)}`;
  }, [
    currentSpaceOption,
    currentStageOption,
    currentLocationOption,
    selectedSpace,
    selectedStage,
    selectedLocation,
    whatsappHref,
  ]);

  return (
    <Section tone="canvas" density="default">
      <Container>
        <SectionHeading
          eyebrow={estimator.eyebrow}
          heading={estimator.heading}
          body={estimator.subheadline}
        />

        {/* Free Consultation Guarantee Banner */}
        <div className="mt-10 bg-brand-50 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <span className="label text-brand-800 shrink-0 font-semibold">
              GARANTÍA CASA ALTA
            </span>
            <p className="text-xs sm:text-sm text-brand-900 leading-relaxed font-medium">
              {estimator.freeConsultationNote}
            </p>
          </div>
        </div>

        {/* 3-Step Configurator Grid */}
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Steps Column (8 cols) */}
          <div className="space-y-12 lg:col-span-8">
            {/* Step 1 */}
            {step1 ? (
              <fieldset className="space-y-4">
                <legend className="block">
                  <div className="flex items-center gap-3">
                    <span className="label text-brand-800 font-semibold tabular-nums">
                      01
                    </span>
                    <span className="text-base sm:text-lg font-medium text-ink">
                      {step1.question}
                    </span>
                  </div>
                  {step1.hint ? (
                    <p className="mt-1 text-xs text-ink-muted">
                      {step1.hint}
                    </p>
                  ) : null}
                </legend>

                <div
                  role="radiogroup"
                  aria-label={step1.question}
                  className="grid grid-cols-1 gap-3 sm:grid-cols-2"
                >
                  {step1.options.map((opt) => {
                    const isSelected = selectedSpace === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => setSelectedSpace(opt.id)}
                        className={`flex min-h-[56px] flex-col justify-center px-5 py-3.5 text-left transition-colors cursor-pointer ${
                          isSelected
                            ? "bg-brand-50 text-brand-900"
                            : "bg-bone-100 text-ink-muted hover:bg-bone-200 hover:text-ink"
                        }`}
                      >
                        <span className="text-xs sm:text-sm font-semibold text-ink">
                          {opt.label}
                        </span>
                        {opt.description ? (
                          <span className="mt-1 text-[0.75rem] text-ink-muted leading-tight">
                            {opt.description}
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            ) : null}

            {/* Step 2 */}
            {step2 ? (
              <fieldset className="space-y-4">
                <legend className="block">
                  <div className="flex items-center gap-3">
                    <span className="label text-brand-800 font-semibold tabular-nums">
                      02
                    </span>
                    <span className="text-base sm:text-lg font-medium text-ink">
                      {step2.question}
                    </span>
                  </div>
                  {step2.hint ? (
                    <p className="mt-1 text-xs text-ink-muted">
                      {step2.hint}
                    </p>
                  ) : null}
                </legend>

                <div
                  role="radiogroup"
                  aria-label={step2.question}
                  className="grid grid-cols-1 gap-3 sm:grid-cols-3"
                >
                  {step2.options.map((opt) => {
                    const isSelected = selectedStage === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => setSelectedStage(opt.id)}
                        className={`flex min-h-[56px] flex-col justify-center px-4 py-3.5 text-left transition-colors cursor-pointer ${
                          isSelected
                            ? "bg-brand-50 text-brand-900"
                            : "bg-bone-100 text-ink-muted hover:bg-bone-200 hover:text-ink"
                        }`}
                      >
                        <span className="text-xs sm:text-sm font-semibold text-ink leading-snug">
                          {opt.label}
                        </span>
                        {opt.description ? (
                          <span className="mt-1 text-[0.6875rem] text-ink-muted leading-tight">
                            {opt.description}
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            ) : null}

            {/* Step 3 */}
            {step3 ? (
              <fieldset className="space-y-4">
                <legend className="block">
                  <div className="flex items-center gap-3">
                    <span className="label text-brand-800 font-semibold tabular-nums">
                      03
                    </span>
                    <span className="text-base sm:text-lg font-medium text-ink">
                      {step3.question}
                    </span>
                  </div>
                  {step3.hint ? (
                    <p className="mt-1 text-xs text-ink-muted">
                      {step3.hint}
                    </p>
                  ) : null}
                </legend>

                <div
                  role="radiogroup"
                  aria-label={step3.question}
                  className="grid grid-cols-1 gap-3 sm:grid-cols-3"
                >
                  {step3.options.map((opt) => {
                    const isSelected = selectedLocation === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => setSelectedLocation(opt.id)}
                        className={`flex min-h-[56px] flex-col justify-center px-4 py-3.5 text-left transition-colors cursor-pointer ${
                          isSelected
                            ? "bg-brand-50 text-brand-900"
                            : "bg-bone-100 text-ink-muted hover:bg-bone-200 hover:text-ink"
                        }`}
                      >
                        <span className="text-xs sm:text-sm font-semibold text-ink leading-snug">
                          {opt.label}
                        </span>
                        {opt.description ? (
                          <span className="mt-1 text-[0.6875rem] text-ink-muted leading-tight">
                            {opt.description}
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            ) : null}
          </div>

          {/* Dynamic Summary & WhatsApp Handoff Panel (4 cols) */}
          <div className="lg:col-span-4">
            <aside
              aria-labelledby={`${componentId}-resumen`}
              className="sticky top-28 bg-bone-50 p-6 sm:p-8"
            >
              <span
                id={`${componentId}-resumen`}
                className="label text-brand-800 font-semibold"
              >
                RESUMEN DE ESTIMACIÓN
              </span>

              <Heading as="h4" voice="serif" className="mt-2 text-xl text-ink">
                Tu proyecto seleccionado
              </Heading>

              <div className="mt-6 space-y-4">
                <div className="space-y-1">
                  <span className="label text-[0.6875rem] text-ink-muted">
                    Espacio
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-ink">
                    {currentSpaceOption?.label ?? selectedSpace}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="label text-[0.6875rem] text-ink-muted">
                    Etapa de Ejecución
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-ink">
                    {currentStageOption?.label ?? selectedStage}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="label text-[0.6875rem] text-ink-muted">
                    Ubicación
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-ink">
                    {currentLocationOption?.label ?? selectedLocation}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <Button
                  variant="primary"
                  href={assembledWhatsappUrl}
                  external
                  arrow
                  className="w-full justify-center text-center"
                >
                  Solicitar asesoría sin costo
                </Button>
                <p className="mt-3 text-center text-[0.6875rem] text-ink-muted leading-relaxed">
                  Respuesta directa de nuestro equipo de arquitectura de interiores.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </Container>
    </Section>
  );
}
