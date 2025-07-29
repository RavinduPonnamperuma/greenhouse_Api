export class CreateDeviceDto {
    status: string;
    code: string;
    polytunnelId?: number;


}
export class UpdateDeviceDto extends CreateDeviceDto{}