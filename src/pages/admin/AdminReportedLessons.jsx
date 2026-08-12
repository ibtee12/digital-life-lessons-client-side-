import React, { useState } from 'react';
import { Flag, Eye, Trash2, CheckCircle, AlertTriangle, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminReportedLessons = () => {
  const { lessons, reports, deleteLesson, ignoreReports } = useAuth();
  const [selectedReportId, setSelectedReportId] = useState(null);

  // Group reports by lessonId
  const reportedMap = reports.reduce((acc, rep) => {
    if (!acc[rep.lessonId]) {
      acc[rep.lessonId] = [];
    }
    acc[rep.lessonId].push(rep);
    return acc;
  }, {});

  const reportedLessonIds = Object.keys(reportedMap);

  const selectedReasons = selectedReportId ? reportedMap[selectedReportId] : [];

  return (
    <div className="space-y-6">
      
      <div className="pb-4 border-b border-stone-200 dark:border-stone-800">
        <h2 className="text-2xl font-extrabold text-stone-900 dark:text-stone-100">
          Reported Content Moderation ({reportedLessonIds.length})
        </h2>
        <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
          Review community flags, inspect user-submitted report reasons, and take action.
        </p>
      </div>

      <div className="bg-white dark:bg-[#292524] rounded-3xl border border-stone-200 dark:border-stone-700/80 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-100 dark:bg-stone-800/80 text-[11px] font-extrabold uppercase tracking-wider text-stone-600 dark:text-stone-400 border-b border-stone-200 dark:border-stone-700">
                <th className="py-4 px-6">Reported Lesson Title</th>
                <th className="py-4 px-4">Report Count</th>
                <th className="py-4 px-4">Reasons Modal</th>
                <th className="py-4 px-6 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800 text-sm">
              {reportedLessonIds.length > 0 ? (
                reportedLessonIds.map((lId) => {
                  const lessonObj = lessons.find((l) => l.id === lId) || { title: `Lesson ${lId}` };
                  const repList = reportedMap[lId];

                  return (
                    <tr key={lId} className="hover:bg-stone-50/60 dark:hover:bg-stone-800/40 transition">
                      <td className="py-4 px-6 font-bold text-stone-900 dark:text-stone-100">
                        {lessonObj.title}
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300">
                          <Flag className="w-3.5 h-3.5 mr-1" />
                          {repList.length} Reports
                        </span>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <button
                          onClick={() => setSelectedReportId(lId)}
                          className="px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
                        >
                          View Reasons Modal
                        </button>
                      </td>

                      <td className="py-4 px-6 whitespace-nowrap text-right space-x-2">
                        <button
                          onClick={() => ignoreReports(lId)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-[#059669] font-bold text-xs hover:bg-emerald-100 transition"
                        >
                          Ignore & Clear
                        </button>
                        <button
                          onClick={() => deleteLesson(lId)}
                          className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition"
                        >
                          Delete Lesson
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" className="py-12 text-center text-stone-400 text-sm">
                    🎉 Clear! There are no reported lessons awaiting moderation.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reasons Modal Popup */}
      {selectedReportId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#292524] rounded-2xl p-6 max-w-md w-full border border-stone-200 dark:border-stone-700 shadow-2xl relative">
            <button
              onClick={() => setSelectedReportId(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                <Flag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">Report Reasons Log</h3>
                <p className="text-xs text-stone-400">Submitted by platform users</p>
              </div>
            </div>

            <div className="space-y-3 max-h-60 overflow-y-auto mb-6">
              {selectedReasons.map((rep, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200/60 dark:border-stone-700 text-xs space-y-1">
                  <p className="font-bold text-red-600 dark:text-red-400">Reason: {rep.reason}</p>
                  <p className="text-stone-500">Reporter: {rep.reportedUserEmail || rep.reporterUserId}</p>
                  <p className="text-[10px] text-stone-400">{new Date(rep.timestamp).toLocaleString()}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedReportId(null)}
                className="px-4 py-2 rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-bold text-xs"
              >
                Close Modal
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
