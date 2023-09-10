import { IsString, IsUUID } from 'class-validator';

export class EventRequestDTO {
  @IsUUID()
  public id: string;

  @IsString()
  public name: string;

  @IsString()
  public body: string;

  @IsString()
  public timestamp: string;
}
