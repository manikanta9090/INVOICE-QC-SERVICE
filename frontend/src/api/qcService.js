const BASE_URL = "http://localhost:8000"; // Make sure this matches your backend port

export async function validateJSON(data) {
    const res = await fetch(`${BASE_URL}/validate-json`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function extractAndValidate(formData) {
    const res = await fetch(`${BASE_URL}/extract-and-validate-pdfs`, {
        method: "POST",
        body: formData,
    });
    return res.json();
}