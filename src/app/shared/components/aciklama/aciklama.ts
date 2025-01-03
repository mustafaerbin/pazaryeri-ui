export class Aciklama {
  id: number;
  aciklama: string;
  kisaAciklama: string;
  dil: number;


  public static update(model: any): Aciklama {
    const aciklama = new Aciklama();
    aciklama.id = model.id;
    aciklama.aciklama = model.aciklama !== undefined ? model.aciklama : model._aciklama;
    aciklama.kisaAciklama = model.kisaAciklama !== undefined ? model.kisaAciklama : model._kisaAciklama;
    aciklama.dil = model.dil !== undefined ? model.dil : model._dil;
    return aciklama;
  }
}
