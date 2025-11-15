import { Router } from "express";

export const appRouter = Router();

// Import other route modules
import { scholarYearRouter } from "@/routers/scholar-year.router";
import { evaluationSystemRouter } from "@/routers/evaluation-system.router";
import { scholarYearPeriodRouter } from "@/routers/scholar-year-period.router";
import { courseRouter } from "@/routers/course.router";
import { teacherRouter } from "@/routers/teacher.router";
import { noteRouter } from "@/routers/note.router";
import { studentRouter } from "@/routers/student.router";
import { studentNoteRouter } from "@/routers/student-note.router";
import { qualitativeLabelRouter } from "@/routers/qualitative-label.router";

appRouter.use("/api/scholar-years", scholarYearRouter);
appRouter.use("/api/evaluation-systems", evaluationSystemRouter);
appRouter.use("/api/scholar-year-periods", scholarYearPeriodRouter);
appRouter.use("/api/courses", courseRouter);
appRouter.use("/api/teachers", teacherRouter);
appRouter.use("/api/notes", noteRouter);
appRouter.use("/api/students", studentRouter);
appRouter.use("/api/student-notes", studentNoteRouter);
appRouter.use("/api/qualitative-labels", qualitativeLabelRouter);
