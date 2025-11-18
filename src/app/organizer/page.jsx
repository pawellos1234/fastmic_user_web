"use client";

import { useEffect } from "react";
import { Mic } from "lucide-react";

export default function OrganizerPage() {
  useEffect(() => {
    // Automatyczne przekierowanie do dashboardu
    window.location.href = "/organizer/dashboard";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white rounded-3xl p-8 shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="animate-spin">
            <Mic className="h-8 w-8 text-blue-600" />
          </div>
          <span className="text-xl font-semibold text-gray-700">
            Przekierowywanie do panelu organizatora...
          </span>
        </div>
      </div>
    </div>
  );
}
