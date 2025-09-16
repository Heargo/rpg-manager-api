import { AttributeDto } from '../dto/attribute.dto';
import { Attribute } from '../entity/attribute.entity';

export class AttributeMapper {
  static toAttributeDto(attribute: Attribute): AttributeDto {
    return {
      ...attribute,
    };
  }

  static toAttributeDtoArray(attributes: Attribute[]): AttributeDto[] {
    return attributes.map((attribute) => this.toAttributeDto(attribute));
  }

  static dtoToAttribute(attributeDto: AttributeDto): Partial<Attribute> {
    return {
      ...attributeDto,
    };
  }
}
