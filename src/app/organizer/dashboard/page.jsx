"use client";

import { useState, useEffect } from "react";
import {
  Mic,
  Users,
  MessageSquare,
  Settings,
  Play,
  Pause,
  Plus,
  Eye,
  Clock,
  Globe,
  Activity,
  BarChart3,
  Zap,
  QrCode,
} from "lucide-react";
import { toast } from "sonner";

export default function OrganizerDashboard() {
  const [activeEvents, setActiveEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState("pl");

  // Symulacja danych demo
  const demoEvents = [
    {
      id: 1,
      code: "2025",
      title: "AI w Biznesie - Konferencja Demo",
      participants: 42,
      questions: 8,
      status: "active",
      createdAt: "2025-11-15T10:00:00Z",
      language: "pl",
      isLive: true,
    },
    {
      id: 2,
      code: "TECH2025",
      title: "Technology Summit 2025",
      participants: 0,
      questions: 0,
      status: "paused",
      createdAt: "2025-11-15T14:00:00Z",
      language: "en",
      isLive: false,
    },
  ];

  useEffect(() => {
    // Symulacja ładowania danych
    setTimeout(() => {
      setActiveEvents(demoEvents);
      setSelectedEvent(demoEvents[0]);
      setLoading(false);
    }, 1000);
  }, []);

  const translations = {
    pl: {
      title: "Panel Organizatora",
      subtitle: "Zarządzaj wydarzeniami na żywo",
      createEvent: "Utwórz Wydarzenie",
      events: "Moje Wydarzenia",
      participants: "Uczestnicy",
      questions: "Pytania",
      live: "Na Żywo",
      paused: "Zatrzymane",
      inactive: "Nieaktywne",
      startEvent: "Rozpocznij",
      pauseEvent: "Zatrzymaj",
      viewEvent: "Zobacz",
      eventCode: "Kod Wydarzenia",
      totalParticipants: "Łączni Uczestnicy",
      pendingQuestions: "Oczekujące Pytania",
      liveEvents: "Wydarzenia Na Żywo",
      quickActions: "Szybkie Akcje",
      recentActivity: "Ostatnia Aktywność",
      analytics: "Analityka",
      joinedEvent: "dołączył do wydarzenia",
      submittedQuestion: "zadał pytanie",
      minutesAgo: "min temu",
    },
    en: {
      title: "Organizer Dashboard",
      subtitle: "Manage your live events",
      createEvent: "Create Event",
      events: "My Events",
      participants: "Participants",
      questions: "Questions",
      live: "Live",
      paused: "Paused",
      inactive: "Inactive",
      startEvent: "Start",
      pauseEvent: "Pause",
      viewEvent: "View",
      eventCode: "Event Code",
      totalParticipants: "Total Participants",
      pendingQuestions: "Pending Questions",
      liveEvents: "Live Events",
      quickActions: "Quick Actions",
      recentActivity: "Recent Activity",
      analytics: "Analytics",
      joinedEvent: "joined the event",
      submittedQuestion: "asked a question",
      minutesAgo: "min ago",
    },
  };

  const t = translations[language];

  const handleEventAction = (eventId, action) => {
    const event = activeEvents.find((e) => e.id === eventId);
    if (action === "start") {
      setActiveEvents(
        activeEvents.map((e) =>
          e.id === eventId ? { ...e, status: "active", isLive: true } : e,
        ),
      );
      toast.success(`Wydarzenie "${event.title}" zostało rozpoczęte!`);
    } else if (action === "pause") {
      setActiveEvents(
        activeEvents.map((e) =>
          e.id === eventId ? { ...e, status: "paused", isLive: false } : e,
        ),
      );
      toast.info(`Wydarzenie "${event.title}" zostało zatrzymane.`);
    } else if (action === "view") {
      window.open(`/listen?code=${event.code}`, "_blank");
    }
  };

  const handleCreateEvent = () => {
    window.location.href = "/organizer/create";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-8 shadow-xl">
          <div className="flex items-center space-x-3">
            <div className="animate-spin">
              <Mic className="h-8 w-8 text-blue-600" />
            </div>
            <span className="text-xl font-semibold text-gray-700">
              Ładowanie panelu...
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Mic className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">FastMic</span>
              <span className="text-sm text-gray-500 bg-blue-50 px-2 py-1 rounded-full">
                Organizator
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setLanguage(language === "pl" ? "en" : "pl")}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/50 hover:bg-white/70 transition-colors"
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {language.toUpperCase()}
                </span>
              </button>

              <button
                onClick={handleCreateEvent}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <Plus className="h-5 w-5" />
                <span>{t.createEvent}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t.title}</h1>
          <p className="text-gray-600 mt-2">{t.subtitle}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-white/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {t.totalParticipants}
                </p>
                <p className="text-3xl font-bold text-gray-900">42</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-xl">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-white/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {t.pendingQuestions}
                </p>
                <p className="text-3xl font-bold text-gray-900">8</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-xl">
                <MessageSquare className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-white/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {t.liveEvents}
                </p>
                <p className="text-3xl font-bold text-gray-900">1</p>
              </div>
              <div className="bg-green-100 p-3 rounded-xl">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-white/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {t.analytics}
                </p>
                <p className="text-3xl font-bold text-gray-900">95%</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-xl">
                <BarChart3 className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Events List */}
          <div className="bg-white rounded-2xl shadow-sm border border-white/50">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">{t.events}</h2>
            </div>
            <div className="p-6 space-y-4">
              {activeEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {event.title}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          event.isLive
                            ? "bg-green-100 text-green-800"
                            : event.status === "paused"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {event.isLive
                          ? t.live
                          : event.status === "paused"
                            ? t.paused
                            : t.inactive}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <QrCode className="h-4 w-4" />
                        <span>{event.code}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{event.participants}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{event.questions}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEventAction(event.id, "view");
                      }}
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Eye className="h-5 w-5" />
                    </button>

                    {event.isLive ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEventAction(event.id, "pause");
                        }}
                        className="p-2 text-gray-500 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                      >
                        <Pause className="h-5 w-5" />
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEventAction(event.id, "start");
                        }}
                        className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      >
                        <Play className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-sm border border-white/50">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">
                {t.recentActivity}
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">
                    <strong>Jan Kowalski</strong> {t.joinedEvent}
                  </p>
                  <p className="text-xs text-gray-500">2 {t.minutesAgo}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <MessageSquare className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">
                    <strong>Anna Nowak</strong> {t.submittedQuestion}
                  </p>
                  <p className="text-xs text-gray-500">5 {t.minutesAgo}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Activity className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">
                    <strong>Piotr Wiśniewski</strong> {t.joinedEvent}
                  </p>
                  <p className="text-xs text-gray-500">8 {t.minutesAgo}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <MessageSquare className="h-4 w-4 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">
                    <strong>Maria Zielińska</strong> {t.submittedQuestion}
                  </p>
                  <p className="text-xs text-gray-500">12 {t.minutesAgo}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        {selectedEvent && (
          <div className="mt-8 bg-white rounded-2xl shadow-sm border border-white/50 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {t.quickActions} - {selectedEvent.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <button
                onClick={() => handleEventAction(selectedEvent.id, "view")}
                className="flex items-center justify-center space-x-2 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors group"
              >
                <Eye className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform" />
                <span className="text-blue-600 font-medium">{t.viewEvent}</span>
              </button>

              <button className="flex items-center justify-center space-x-2 p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors group">
                <MessageSquare className="h-5 w-5 text-purple-600 group-hover:scale-110 transition-transform" />
                <span className="text-purple-600 font-medium">
                  {t.questions}
                </span>
              </button>

              <button className="flex items-center justify-center space-x-2 p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors group">
                <Users className="h-5 w-5 text-green-600 group-hover:scale-110 transition-transform" />
                <span className="text-green-600 font-medium">
                  {t.participants}
                </span>
              </button>

              <button className="flex items-center justify-center space-x-2 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group">
                <Settings className="h-5 w-5 text-gray-600 group-hover:scale-110 transition-transform" />
                <span className="text-gray-600 font-medium">Ustawienia</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
