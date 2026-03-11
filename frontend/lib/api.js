export async function uploadFile(file, email) {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", email);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (response.ok) {
      return { success: true, message: data.message };
    }

    return { success: false, message: data.error };
  } catch (_err) {
    return {
      success: false,
      message: "Network error. Please check your connection and try again.",
    };
  }
}
