import { AcademicSemester, Prisma, PrismaClient } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { AcademicSemesterSearchAbleFields } from './academicSemester.contants';
import { IAcademicSemesterFilterRequest } from './academicSemester.interface';

const prisma = new PrismaClient();

const insertIntoDB = async (
  data: AcademicSemester
): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.create({
    data,
  });
  return result;
};

const getAllFromDB = async (
  filters: IAcademicSemesterFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicSemester>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      // OR: ['title', 'code', 'startMonth', 'endMonth'].map(f => ({
      OR: AcademicSemesterSearchAbleFields.map(f => ({
        [f]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.AcademicSemesterWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.academicSemester.findMany({
    // where: addConditions
    where: whereConditions,

    // where: {
    //   OR: [
    //     {
    //       title: {
    //         contains: searchTerm,
    //         mode: 'insensitive',
    //       },

    //       code: {
    //         contains: searchTerm,
    //         mode: 'insensitive',
    //       },
    //     },
    //   ],
    // },
    skip,
    take: limit,
  });

  const total = await prisma.academicSemester.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

export const AcademicSemesterService = { insertIntoDB, getAllFromDB };
