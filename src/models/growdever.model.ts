export interface CreateCarro {
  marca: string;
  modelo: string;
  ano: number;
  cor: string;
}
export interface UpdateCarro {
  id: number;
  marca?: string;
  modelo?: string;
  ano?: number;
  cor?: string;
}

export class Carro {
  private _id: number;
  constructor(
    private _marca: string,
    private _modelo: string,
    private _ano: number,
    private _cor: string
  ) {
    this._id = 0;
  }
  get id() {
    return this._id;
  }
  get marca() {
    return this._marca;
  }
  get modelo() {
    return this._modelo;
  }
  get ano() {
    return this._ano;
  }
  get cor() {
    return this._cor;
  }
}
