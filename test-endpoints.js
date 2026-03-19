async function runTests() {
    console.log("=========================================");
    console.log("🚀 STARTING BACKEND REST API TESTS");
    console.log("=========================================\n");

    try {
        // TEST 1: Razorpay Order Creation
        console.log("=== TEST 1: create-razorpay-order ===");
        const rzpPayload = { amount: 799, service_name: "SEO Blog Writing", order_id: "test-001" };
        console.log("Sending:", JSON.stringify(rzpPayload));
        
        const rzpReq = await fetch('https://zsevqsmpvgoipwlhzjoy.supabase.co/functions/v1/create-razorpay-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(rzpPayload)
        });
        const rzpRes = await rzpReq.text();
        console.log(`[Status: ${rzpReq.status}]`);
        console.log(`Response: ${rzpRes}\n`);

        // TEST 2: Contact Form
        console.log("=== TEST 2: contact-form ===");
        const contactPayload = { name: "Test QA User", email: "test@test.com", message: "Automated test message for SAGE DO QA." };
        console.log("Sending:", JSON.stringify(contactPayload));
        
        const contactReq = await fetch('https://zsevqsmpvgoipwlhzjoy.supabase.co/functions/v1/contact-form', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(contactPayload)
        });
        const contactRes = await contactReq.text();
        console.log(`[Status: ${contactReq.status}]`);
        console.log(`Response: ${contactRes}\n`);

        // TEST 3: Homepage Load
        console.log("=== TEST 3: sagedo.in GET ===");
        const homeReq = await fetch('https://sagedo.in');
        const homeHTML = await homeReq.text();
        console.log(`[Status: ${homeReq.status}]`);
        console.log(`Response Preview: ${homeHTML.substring(0, 150)}... (truncated)\n`);

    } catch (err) {
        console.error("FAIL: Error executing tests:", err);
    }
}

runTests();
