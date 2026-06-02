import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty({ message: 'Nome é obrigatório e deve ter no máximo 150 caracteres.' })
  @MaxLength(150, { message: 'Nome é obrigatório e deve ter no máximo 150 caracteres.' })
  name!: string;

  @IsNotEmpty({ message: 'CPF é obrigatório e deve conter exatamente 11 dígitos.' })
  @Length(11, 11, { message: 'CPF é obrigatório e deve conter exatamente 11 dígitos.' })
  cpf!: string;

  @IsNotEmpty({ message: 'E-mail é obrigatório e deve ser válido.' })
  @IsEmail({}, { message: 'E-mail é obrigatório e deve ser válido.' })
  @MaxLength(255, { message: 'E-mail é obrigatório e deve ser válido.' })
  email!: string;

  @IsNotEmpty({ message: 'Cor favorita é obrigatória e deve ter no máximo 30 caracteres.' })
  @MaxLength(30, { message: 'Cor favorita é obrigatória e deve ter no máximo 30 caracteres.' })
  favoriteColor!: string;

  @IsOptional()
  @IsString({ message: 'Observações devem ser um texto válido.' })
  observations?: string;
}