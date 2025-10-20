import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// Excluindo explicitamente o campo id do DTO de atualização
export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['id'] as const),
) {}
