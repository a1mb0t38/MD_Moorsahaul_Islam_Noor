"use server";

export async function submitContactForm(formData: FormData) {
  const accessKey = process.env.FORM_SEC;

  if (!accessKey) {
    return { success: false, error: "Server configuration error: Missing Access Key." };
  }

  // Add the access key to the form data
  formData.append("access_key", accessKey);

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return { success: false, error: "Failed to connect to the email service." };
  }
}
