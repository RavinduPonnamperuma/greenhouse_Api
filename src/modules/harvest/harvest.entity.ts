export class CreateHarvestDto {
  harvestDate: string;
  sellingPrice: number;
  quantity: number;
  variety: string;
  plantId?: number;
}
export class UpdateHarvestDto extends CreateHarvestDto{}