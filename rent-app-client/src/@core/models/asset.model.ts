import { DefaultModel } from "./default.model";

export class AssetModel extends DefaultModel {
  id_assetModel: string;
  identifier: string;
  name: string;
  is_available: boolean;
  id_asset_category: number
}