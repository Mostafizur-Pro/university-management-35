import express from 'express';
import { AcademicSemesterRoutes } from '../module/academicSemester/academicSemester.routes.';
import { buildingRoutes } from '../module/building/building.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/buildings',
    route: buildingRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
