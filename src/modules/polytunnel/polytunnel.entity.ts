import { PartialType } from "@nestjs/mapped-types";

export class PolytunnelDTO {
  code: string;
  status: string;
  location: string;
  size: string;
  length: number;
  width: number;
  numberOfPlants: string;
  userId?: number;
  deviceId?: number;
}

export class CreatePolytunnelDTO extends PolytunnelDTO {}
export class UpdatePolytunnelDTO extends PartialType(PolytunnelDTO) {}
