const BASE_URL = "http://localhost:8000"; // Make sure this matches your backend port

export async function validateJSON(data) {
    // Ensure data is an array
    const invoiceArray = Array.isArray(data) ? data : [data];

    try {
        const res = await fetch(`${BASE_URL}/validate-json`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(invoiceArray),
        });

        if (!res.ok) {
            throw new Error(`API error: ${res.status} ${res.statusText}`);
        }

        return res.json();
    } catch (error) {
        console.error("Validation error:", error);
        throw error;
    }
}

export async function extractAndValidate(formData) {
    try {
        const res = await fetch(`${BASE_URL}/extract-and-validate-pdfs`, {
            method: "POST",
            body: formData,
        });

        if (!res.ok) {
            throw new Error(`API error: ${res.status} ${res.statusText}`);
        }

        return res.json();
    } catch (error) {
        console.error("Upload error:", error);
        throw error;
    }
}