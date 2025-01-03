export class Hedef {
  id: number;
  adi: string;
  aciklama: string
  durum: number;

  public static update(hedef: Hedef, updatedHedef: Hedef):Hedef {
    console.log("hedef",hedef);
    if(hedef.id == null) {
      hedef = new Hedef();
    }

    hedef.adi = updatedHedef.adi !== undefined ? updatedHedef.adi : hedef.adi;
    hedef.aciklama = updatedHedef.aciklama !== undefined ? updatedHedef.aciklama : hedef.aciklama;
    hedef.durum = updatedHedef.durum !== undefined ? updatedHedef.durum : hedef.durum;

  return hedef;
  }

}
