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
  // Double cell: the wall's strongest photograph opens it.
  {
    dir: "01-plaza-esmeralda-puerto-escondido",
    base: "02-terraza-anochecer-planta-jardinera",
  },
  // Singles.
  { dir: "06-capilla-el-tule", base: "02-cornisa-cantera-contrapicado" },
  { dir: "09-casa-santa-rosa", base: "02-fachada-blanca-macetas-patios" },
  // Double cell: the client-confirmed project.
  { dir: "02-el-bicho", base: "02-fachada-palapas-alberca-palmeras" },
  // Singles.
  { dir: "07-casa-tarrastro", base: "02-terraza-celosia-madera-encino" },
  { dir: "05-cafe-malagua", base: "02-barra-central-lamparas-encendidas" },
  // Double cell: the storm-lit gate.
  { dir: "03-casa-blake-tlalixtac", base: "02-porton-negro-pilares-ladrillo" },
  // Singles.
  { dir: "11-columnas-c1-c2", base: "02-columna-suspendida-plataforma" },
  { dir: "08-rbnb-palmarito", base: "02-cielo-palapa-barra-mar" },
  // Double cell: replaces the rusted door with the project's bright street frame.
  {
    dir: "04-casa-melchor-ocampo",
    base: "01-calle-pendiente-fachada-colonial",
  },
  // Singles.
  { dir: "10-obra-punta-zicatela", base: "02-banqueta-concreto-camino-grava" },
  { dir: "12-vilas-cavan", base: "02-fachada-chimenea-tabique-teja" },
];
