const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const api = {
  // User Sync & Management
  async syncUser(userData) {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/sync`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
      });
      return await res.json();
    } catch (err) {
      console.warn("MongoDB user sync error:", err);
      return null;
    }
  },

  async updateUserRole(uid, role) {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/users/${uid}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role })
      });
      return await res.json();
    } catch (err) {
      console.warn("MongoDB role update error:", err);
      return null;
    }
  },

  async upgradeUserPremium(uid) {
    try {
      const res = await fetch(`${API_BASE_URL}/payment/upgrade-premium`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid })
      });
      return await res.json();
    } catch (err) {
      console.warn("MongoDB premium upgrade error:", err);
      return null;
    }
  },

  // Lessons API
  async getLessons(params = {}) {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE_URL}/lessons?${query}`);
      return await res.json();
    } catch (err) {
      console.warn("MongoDB get lessons error:", err);
      return null;
    }
  },

  async createLesson(lessonData) {
    try {
      const res = await fetch(`${API_BASE_URL}/lessons`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lessonData)
      });
      return await res.json();
    } catch (err) {
      console.warn("MongoDB create lesson error:", err);
      return null;
    }
  },

  async deleteLesson(lessonId) {
    try {
      const res = await fetch(`${API_BASE_URL}/lessons/${lessonId}`, {
        method: "DELETE"
      });
      return await res.json();
    } catch (err) {
      console.warn("MongoDB delete lesson error:", err);
      return null;
    }
  }
};
