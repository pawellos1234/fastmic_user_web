"use client";

import { useState } from "react";
import {
  Mic,
  ArrowLeft,
  Globe,
  Users,
  Clock,
  Save,
  Eye,
  Copy,
  QrCode,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

export default function CreateEvent() {
  const [language, setLanguage] = useState("pl");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    organizerName: "",
    organizerEmail: "",
    eventLanguage: "pl",
    maxParticipants: 100,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdEvent, setCreatedEvent] = useState(null);

  const translations = {
    pl: {
      title: "Utwórz Nowe Wydarzenie",
      subtitle: "Skonfiguruj swoje wydarzenie na żywo",
      eventDetails: "Szczegóły Wydarzenia",
      eventTitle: "Nazwa Wydarzenia",
      eventTitlePlaceholder: "np. Konferencja AI w Biznesie 2025",
      eventDescription: "Opis Wydarzenia",
      eventDescriptionPlaceholder: "Opisz o czym będzie twoje wydarzenie...",
      organizerInfo: "Informacje Organizatora",
      organizerName: "Imię i Nazwisko",
      organizerNamePlaceholder: "np. Jan Kowalski",
      organizerEmail: "Email",
      organizerEmailPlaceholder: "jan@example.com",
      eventSettings: "Ustawienia Wydarzenia",
      eventLanguage: "Język Wydarzenia",
      maxParticipants: "Maksymalna Liczba Uczestników",
      backToDashboard: "Powrót do Panelu",
      createEvent: "Utwórz Wydarzenie",
      preview: "Podgląd",
      eventCreated: "Wydarzenie Utworzone!",
      eventCode: "Kod Wydarzenia",
      shareEvent: "Udostępnij Wydarzenie",
      copyCode: "Skopiuj Kod",
      goToEvent: "Przejdź do Wydarzenia",
      manageEvent: "Zarządzaj Wydarzeniem",
      successMessage: "Twoje wydarzenie zostało pomyślnie utworzone!",
      codeGenerated: "Kod został wygenerowany automatycznie",
      shareInstructions:
        "Udostępnij ten kod uczestnikom aby mogli dołączyć do wydarzenia",
    },
    en: {
      title: "Create New Event",
      subtitle: "Configure your live event",
      eventDetails: "Event Details",
      eventTitle: "Event Title",
      eventTitlePlaceholder: "e.g. AI in Business Conference 2025",
      eventDescription: "Event Description",
      eventDescriptionPlaceholder: "Describe what your event is about...",
      organizerInfo: "Organizer Information",
      organizerName: "Full Name",
      organizerNamePlaceholder: "e.g. John Doe",
      organizerEmail: "Email",
      organizerEmailPlaceholder: "john@example.com",
      eventSettings: "Event Settings",
      eventLanguage: "Event Language",
      maxParticipants: "Maximum Participants",
      backToDashboard: "Back to Dashboard",
      createEvent: "Create Event",
      preview: "Preview",
      eventCreated: "Event Created!",
      eventCode: "Event Code",
      shareEvent: "Share Event",
      copyCode: "Copy Code",
      goToEvent: "Go to Event",
      manageEvent: "Manage Event",
      successMessage: "Your event has been created successfully!",
      codeGenerated: "Code generated automatically",
      shareInstructions:
        "Share this code with participants so they can join the event",
    },
  };

  const t = translations[language];

  const generateEventCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Walidacja
    if (
      !formData.title ||
      !formData.organizerName ||
      !formData.organizerEmail
    ) {
      toast.error(
        language === "pl"
          ? "Proszę wypełnić wszystkie wymagane pola"
          : "Please fill in all required fields",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // Symulacja opóźnienia API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const eventCode = generateEventCode();

      const newEvent = {
        id: Date.now(),
        code: eventCode,
        title: formData.title,
        description: formData.description,
        organizerName: formData.organizerName,
        organizerEmail: formData.organizerEmail,
        language: formData.eventLanguage,
        maxParticipants: formData.maxParticipants,
        status: "active",
        createdAt: new Date().toISOString(),
        participants: 0,
        questions: 0,
        isLive: false,
      };

      // W rzeczywistej implementacji tutaj byłby POST request:
      /*
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      */

      setCreatedEvent(newEvent);
      toast.success(t.successMessage);
    } catch (error) {
      toast.error(
        language === "pl"
          ? "Wystąpił błąd podczas tworzenia wydarzenia"
          : "An error occurred while creating the event",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const copyEventCode = () => {
    if (createdEvent) {
      navigator.clipboard.writeText(createdEvent.code);
      toast.success(language === "pl" ? "Kod skopiowany!" : "Code copied!");
    }
  };

  const goToEvent = () => {
    if (createdEvent) {
      window.open(`/listen?code=${createdEvent.code}`, "_blank");
    }
  };

  const goToDashboard = () => {
    window.location.href = "/organizer/dashboard";
  };

  if (createdEvent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 text-center">
          <div className="mb-6">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t.eventCreated}
            </h1>
            <p className="text-gray-600">{t.successMessage}</p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {createdEvent.title}
            </h2>
            <p className="text-gray-600 mb-4">{createdEvent.description}</p>

            <div className="bg-white rounded-xl p-4 mb-4">
              <p className="text-sm text-gray-600 mb-2">{t.eventCode}</p>
              <div className="flex items-center justify-center space-x-3">
                <div className="bg-blue-50 px-6 py-3 rounded-lg">
                  <span className="text-2xl font-bold text-blue-600">
                    {createdEvent.code}
                  </span>
                </div>
                <button
                  onClick={copyEventCode}
                  className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Copy className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-500">{t.shareInstructions}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={goToEvent}
              className="flex items-center justify-center space-x-2 p-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
            >
              <Eye className="h-5 w-5" />
              <span>{t.goToEvent}</span>
            </button>

            <button
              onClick={goToDashboard}
              className="flex items-center justify-center space-x-2 p-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>{t.manageEvent}</span>
            </button>
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
                onClick={() => window.history.back()}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="hidden md:inline">{t.backToDashboard}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t.title}</h1>
          <p className="text-gray-600 mt-2">{t.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Event Details */}
          <div className="bg-white rounded-2xl shadow-sm border border-white/50 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <QrCode className="h-6 w-6 text-blue-600" />
              <span>{t.eventDetails}</span>
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.eventTitle} *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder={t.eventTitlePlaceholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.eventDescription}
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder={t.eventDescriptionPlaceholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                />
              </div>
            </div>
          </div>

          {/* Organizer Info */}
          <div className="bg-white rounded-2xl shadow-sm border border-white/50 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <Users className="h-6 w-6 text-purple-600" />
              <span>{t.organizerInfo}</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.organizerName} *
                </label>
                <input
                  type="text"
                  value={formData.organizerName}
                  onChange={(e) =>
                    handleInputChange("organizerName", e.target.value)
                  }
                  placeholder={t.organizerNamePlaceholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.organizerEmail} *
                </label>
                <input
                  type="email"
                  value={formData.organizerEmail}
                  onChange={(e) =>
                    handleInputChange("organizerEmail", e.target.value)
                  }
                  placeholder={t.organizerEmailPlaceholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  required
                />
              </div>
            </div>
          </div>

          {/* Event Settings */}
          <div className="bg-white rounded-2xl shadow-sm border border-white/50 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <Clock className="h-6 w-6 text-green-600" />
              <span>{t.eventSettings}</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.eventLanguage}
                </label>
                <select
                  value={formData.eventLanguage}
                  onChange={(e) =>
                    handleInputChange("eventLanguage", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                >
                  <option value="pl">Polski</option>
                  <option value="en">English</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.maxParticipants}
                </label>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={formData.maxParticipants}
                  onChange={(e) =>
                    handleInputChange(
                      "maxParticipants",
                      parseInt(e.target.value),
                    )
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-8 py-3 text-gray-600 hover:text-gray-800 transition-colors font-medium"
            >
              {t.backToDashboard}
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-md"
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
              ) : (
                <Save className="h-5 w-5" />
              )}
              <span>
                {isSubmitting
                  ? language === "pl"
                    ? "Tworzenie..."
                    : "Creating..."
                  : t.createEvent}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
