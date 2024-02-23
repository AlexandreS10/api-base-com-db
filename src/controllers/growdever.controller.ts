import { Request, Response } from "express";
import { Carro, CreateCarro, UpdateCarro } from "../models/growdever.model";
import { prisma } from "../prisma";

export class GrowdeverController {
  async create(request: Request<any, CreateCarro>, response: Response) {
    const carroData = request.body;
    const newCarro = new Carro(
      carroData.marca,
      carroData.modelo,
      carroData.ano,
      carroData.cor
    );
    await prisma.carros.create({
      data: {
        marca: carroData.marca,
        modelo: carroData.modelo,
        ano: Number(carroData.ano),
        cor: carroData.cor,
      },
    });
    try {
      if (newCarro) {
        return response.status(201).json({
          ok: true,
          message: "Car succesfully created",
          data: newCarro,
        });
      }
    } catch (error: any) {
      return response.status(500).json({
        ok: false,
        message: "Error when create Car",
      });
    }
  }

  async list(request: Request<any, Carro>, response: Response) {
    const data = await prisma.carros.findMany({});
    if (data) {
      return response.status(201).json({
        ok: true,
        message: " List of Cars",
        data: {
          data,
        },
      });
    }
  }

  async getByUid(request: Request, response: Response) {
    const id = request.params;
    const parseId = Number(id);
    const carro = await prisma.carros.findUnique({
      where: {
        id: parseId,
      },
    });
    if (carro) {
      return response.status(200).json({
        ok: true,
        message: " Car listed succesfully",
        data: {
          id: carro.id,
          marca: carro.marca,
          modelo: carro.modelo,
          ano: Number(carro.ano),
          cor: carro.cor,
        },
      });
    }

    return response.status(404).json({
      ok: false,
      message: " Car not found",
    });
  }

  async remove(request: Request, response: Response) {
    const id = request.params;
    const parseId = Number(id);
    const carro = await prisma.carros.findUnique({
      where: {
        id: parseId,
      },
    });
    if (!carro) {
      return response.status(404).json({
        ok: false,
        message: " Car not found",
      });
    }

    await prisma.carros.delete({
      where: {
        id: parseId,
      },
    });
    return response.status(204).json({
      ok: true,
      message: "Car deleted succesfully",
    });
  }

  async update(request: Request<any, UpdateCarro>, response: Response) {
    const id = request.params;
    const CarroData = request.body;
    const parseId = Number(id);
    const carro = await prisma.carros.findUnique({
      where: {
        id: parseId,
      },
    });
    if (!carro) {
      return response.status(404).json({
        ok: false,
        message: " Car not found",
      });
    }
    const updatedCarro = await prisma.carros.update({
      where: {
        id: parseId,
      },
      data: {
        marca: CarroData.marca,
        modelo: CarroData.modelo,
        ano: Number(CarroData.ano),
        cor: CarroData.cor,
      },
    });

    return response.status(200).json({
      ok: true,
      message: " Car succesfully updated",
      data: updatedCarro,
    });
  }
}
