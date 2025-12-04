export interface Pet {
  _id?: string;
  nome: string;
  idade: number;
  cidade: string;
  descricao: string;
  peso: number;
  vacinado: boolean;
  castrado: boolean;
  raca: string;
  imageUrl?: string;
  imageId?: string;
}
