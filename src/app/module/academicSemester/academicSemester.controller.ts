import { AcademicSemester } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import {
  AcademicSemesterFilterableField,
  AcademicSemesterFilterableOptionsField,
} from './academicSemester.contants';
import { AcademicSemesterService } from './academicSemester.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicSemesterService.insertIntoDB(req.body);
  sendResponse<AcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester Created',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  // const filters = pick(req.query, ['searchTerm', 'code', 'startMonth', 'endMonth' ]);
  const filters = pick(req.query, AcademicSemesterFilterableField);
  // const options = pick(req.query, ['limit', 'page', 'shortBy', 'sortOrder']);
  const options = pick(req.query, AcademicSemesterFilterableOptionsField);

  const result = await AcademicSemesterService.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester Data fetched!!',
    meta: result.meta,
    data: result.data,
  });
});

const getDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicSemesterService.getDataById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester Data fetched!!',
    // meta: result.meta,
    data: result,
  });
});

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await AcademicSemesterService.updateIntoDB(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester Data updated!!',
    // meta: result.meta,
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicSemesterService.deleteFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester deleted successfully!!',
    // meta: result.meta,
    data: result,
  });
});

export const AcademicSemesterController = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateIntoDB,
  deleteFromDB,
};
