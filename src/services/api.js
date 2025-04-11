const BASE_URL = "https://birthday-db.onrender.com/api";

export const api = {
  // Admin Authentication
  async registerAdmin(adminData) {
    const response = await fetch(`${BASE_URL}/admin/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(adminData),
    });
    return response.json();
  },

  async loginAdmin(credentials) {
    const response = await fetch(`${BASE_URL}/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    return response.json();
  },

  // Birthday Configuration
  async getConfig(uniqueRoute) {
    const response = await fetch(`${BASE_URL}/config/${uniqueRoute}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.json();
  },

  async updateConfig(uniqueRoute, config) {
    const response = await fetch(`${BASE_URL}/config/${uniqueRoute}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(config),
    });
    return response.json();
  },

  // Birthday Wishes
  async getWishes(uniqueRoute) {
    const response = await fetch(`${BASE_URL}/wishes/${uniqueRoute}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.json();
  },

  async submitWish(uniqueRoute, wishData) {
    try {
      // Transform the wish data to match API expectations
      const transformedData = {
        sender_name: wishData.name || "Anonymous",
        message: wishData.message,
      };

      const response = await fetch(`${BASE_URL}/wishes/${uniqueRoute}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(transformedData),
      });

      const responseData = await response.json();

      // Check if the response indicates success
      if (response.ok || responseData.status === "success") {
        return responseData;
      }

      // Only throw error if the response is not ok and doesn't indicate success
      console.error("API Error:", {
        status: response.status,
        statusText: response.statusText,
        error: responseData,
      });
      throw new Error(responseData.message || "Failed to submit wish");
    } catch (error) {
      console.error("Submit Wish Error:", error);
      throw error;
    }
  },

  async deleteWish(uniqueRoute, wishId) {
    const response = await fetch(
      `${BASE_URL}/wishes/${uniqueRoute}/${wishId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.json();
  },

  async updateWish(uniqueRoute, wishId, wishData) {
    const response = await fetch(
      `${BASE_URL}/wishes/${uniqueRoute}/${wishId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(wishData),
      }
    );
    return response.json();
  },
};
