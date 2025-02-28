export interface PlantInfoType {
  plantPopularName: string;
  plantOfficialName: string | null;
  plantFamily: string | null;
  possessed: boolean;
  featureShadeTolerance: number | null;
  featureDryingTolerance: number | null;
  featureColdTolerance: number | null;
  featureHeatTolerance: number | null;
  price: number | null;
  purchaseDate: Date | null;
  buyer: string | null;
}
