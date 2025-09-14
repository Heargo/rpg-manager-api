// Attribute service for managing game attributes
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attribute } from '../entity/attribute.entity';

@Injectable()
export class AttributeService {
  constructor(
    @InjectRepository(Attribute)
    private attributeRepository: Repository<Attribute>,
  ) {}

  // CRUD operations for Attribute entity can be added here
  async create(attribute: Attribute): Promise<Attribute> {
    return this.attributeRepository.save(attribute);
  }

  async findAll(): Promise<Attribute[]> {
    return this.attributeRepository.find();
  }

  async findOne(id: string): Promise<Attribute> {
    return this.attributeRepository.findOne({ where: { id } });
  }

  async update(id: string, attribute: Attribute): Promise<Attribute> {
    await this.attributeRepository.update(id, attribute);
    return this.attributeRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.attributeRepository.delete(id);
  }
}
