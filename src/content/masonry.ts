import type { MasonrySlot } from "@/types/content";

/**
 * The landing's masonry, in display order.
 *
 * Authored, not computed. The wall's double cells sit at fixed positions --
 * index 0, 3, 6 and 9 of this list -- so the order is what decides which
 * photographs get the four largest cells. It leads with the strongest, most
 * legible landscapes so the big cells carry them, and closes with the
 * construction-footage frames.
 *
 * Every slot names a project and one of that project's manifest photographs by
 * its `base` slug; `masonryPhotos()` in src/lib/content/photos.ts resolves it
 * and drops any slot whose photograph scores below the portfolio floor.
 *
 * The list length is part of the contract: MasonryGallery's pattern repeats
 * every three items, so the grid tiles its rectangle exactly only while this
 * length is a multiple of three. Keep it so.
 */
export const masonrySlots: MasonrySlot[] = [
  // Double cell: Casa Charco Seco terracotta perspective against open sky (Score 5)
  {
    dir: "15-casa-charco-seco",
    base: "08-perspectiva-fachada-terracota-vegetacion-cielo",
  },
  // Singles: Tropical chukum facade and bioclimatic pool terrace (Score 5)
  {
    dir: "17-el-tomatal",
    base: "02-fachada-principal-chukum-celosia-ladrillo-palmeras",
  },
  {
    dir: "arquitectura-sostenible",
    base: "01-asoleadero-alberca-ventilacion-cruzada-arquitectura-tierra",
  },
  // Double cell: El Bicho iconic illuminated evening pool and palapas (Score 5)
  {
    dir: "02-el-bicho",
    base: "54-fachada-nocturna-alberca-iluminada-palapas",
  },
  // Singles: Parota wood outdoor dining and illuminated reading lounge (Score 5)
  {
    dir: "arquitectura-que-perdura",
    base: "01-comedor-exterior-madera-bajo-palapa-lamparas-tejidas",
  },
  {
    dir: "15-casa-charco-seco",
    base: "01-sillon-lectura-bajo-escalera-celosia-iluminada",
  },
  // Double cell: Plaza Esmeralda evening wood terrace and city overlook
  {
    dir: "01-plaza-esmeralda-puerto-escondido",
    base: "07-terraza-madera-cristal-ciudad",
  },
  // Singles: Monolithic stone kitchen island and monumental bridge hoist (Score 5)
  {
    dir: "arquitectura-interiores",
    base: "01-isla-cocina-piedra-parrilla-horno-muro-terracota",
  },
  {
    dir: "obra-civil",
    base: "04-izado-cabezal-columna-puente-grua-cielo-azul",
  },
  // Double cell: El Bicho iconic daytime three-palapas and black pool (Score 5)
  {
    dir: "02-el-bicho",
    base: "01-fachada-tres-palapas-alberca",
  },
  // Singles: Overhead pool patio with clay lattice and contemporary white villa (Score 5)
  {
    dir: "15-casa-charco-seco",
    base: "05-vista-cenital-patio-alberca-muro-celosia-barro",
  },
  {
    dir: "remodelacion",
    base: "02-fachada-remodelada-blanca-dos-niveles-balcones-cristal",
  },
];
